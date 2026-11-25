import express from "express";
import {randomBytes, randomUUID} from "node:crypto";
import {applicationDefault, initializeApp, cert} from "firebase-admin/app";
import {getDatabase} from "firebase-admin/database";
import "dotenv/config";
import cors from "cors";

type Jugada = "piedra" | "papel" | "tijera";

const app = express();
const port = Number(process.env.PORT) || 3000;

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

const firebaseURL = process.env.FIREBASE_DATABASE_URL;
const serviceAccountJson = process.env.FIREBASE_SERVICE_ACCOUNT;
const credential = serviceAccountJson ? cert(JSON.parse(serviceAccountJson)): applicationDefault();

if(!firebaseURL){
   throw new Error("No se encontró un valor para la URL")
}
const firebaseApp = initializeApp({credential, databaseURL: firebaseURL})


const db = getDatabase(firebaseApp);

export type Player = {
    id: string;
    name: string;
    choice: Jugada | null;
    online: boolean;
    start: boolean;
    ready: boolean;
}

type Room = {
    code: string;
    players: Record<string, Player>;
    score: Record<string, number>;
}

type RoundResult = "player1" | "player2" | "drawn";

function getRoundResult(firstChoice: Jugada, secondChoice: Jugada): RoundResult{
    if(firstChoice === secondChoice){
        return "drawn";
    }

    const firstPlayerWins =
        (firstChoice === "piedra" && secondChoice === "tijera") ||
        (firstChoice === "papel" && secondChoice === "piedra") ||
        (firstChoice === "tijera" && secondChoice === "papel");

    return firstPlayerWins ? "player1" : "player2";
}

app.use(express.json());

app.get("/api/health", (req, res) => {
    res.status(200).json({status: "ok"});
});

app.post("/api/rooms", async (req, res) => {
    const name = req.body.name;

    if(typeof name !== "string" || name.trim() === ""){
        return res.status(400).json({error: "El nombre es obligatorio y debe ser una cadena de texto no vacía."});
    }

    const code = randomBytes(3).toString("hex").toUpperCase();
    const playerId = randomUUID();

    const player: Player = {
        id: playerId,
        name: name.trim(),
        choice: null,
        online: true,
        start: false,
        ready: false,
    };

    const room: Room = {
        code,
        players: {[playerId]: player},
        score: {[playerId]: 0},
    };


    await db.ref(`rooms/${code}`).set(room);

    return res.status(201).json({roomCode: code, playerId, room})
});

app.post("/api/rooms/:code/players", async (req, res) => {
  const code = req.params.code.toUpperCase();
  const name = req.body?.name;

  if (typeof name !== "string" || name.trim() === "") {
    return res.status(400).json({ error: "El nombre es obligatorio y debe ser una cadena de texto no vacía." });
  }

  const ref = db.ref(`rooms/${code}`);
  const playerId = randomUUID();
  let errorStatus: number | null = null;
  let errorMessage = "";

  const existingSnapshot = await ref.get();
  const existingRoom = existingSnapshot.val() as Room | null;

    if (!existingRoom) {
    return res.status(404).json({ error: "La sala no existe" });
    }

  try {
    const result = await ref.transaction((roomValue: Room | null) => {
      let room = roomValue;
      
      if (room === null) {
        room = existingRoom;
       }

      
      room.players = room.players || {};
      room.score = room.score || {};

      
      for (const [id, player] of Object.entries(room.players)) {
        if (!player.online) {
          delete room.players[id];
        }
      }

      if (Object.keys(room.players).length >= 2) {
        errorStatus = 409;
        errorMessage = "La sala está llena";
        return; 
      }

      room.players[playerId] = {
        id: playerId,
        name: name.trim(),
        choice: null,
        online: true,
        start: false,
        ready: false,
      };
      room.score[playerId] = 0;

      return room;
    });

    if (!result.committed) {
      return res.status(errorStatus || 400).json({ error: errorMessage || "No se pudo unir a la sala" });
    }

    return res.status(201).json({ playerId, room: result.snapshot.val() });
  } catch (error) {
    return res.status(500).json({ error: "Error interno del servidor" });
  }
});


app.put("/api/rooms/:code/players/:playerId/choice", async (req, res) => {
  const code = req.params.code.toUpperCase();
  const playerId = req.params.playerId;

  const validChoices: Jugada[] = ["piedra", "papel", "tijera"];
  const choice = req.body?.choice;

  if (typeof choice !== "string" || !validChoices.includes(choice as Jugada)) {
    return res.status(400).json({
      error: "La jugada debe ser piedra, papel o tijera",
    });
  }

  const ref = db.ref(`rooms/${code}`);

  try {
    const existingSnapshot = await ref.get();
    const existingRoom = existingSnapshot.val() as Room | null;

    if (!existingRoom) {
      return res.status(404).json({ error: "La sala no existe" });
    }

    let errorStatus: number | null = null;
    let errorMessage = "";

    const transaction = await ref.transaction((roomValue: Room | null) => {
      let room = roomValue ?? existingRoom;

      room.players = room.players || {};
      room.score = room.score || {};

      const player = room.players[playerId];

      if (!player) {
        errorStatus = 404;
        errorMessage = "El jugador no está en esta sala";
        return;
      }

      if (player.start) {
        errorStatus = 409;
        errorMessage = "Este jugador ya eligió en esta ronda";
        return;
      }

      player.choice = choice as Jugada;
      player.start = true;

      const players = Object.values(room.players);
      const bothPlayersChose =
        players.length === 2 &&
        players.every((player) => player.start && player.choice != null);

      if (bothPlayersChose) {
        const playerIds = Object.keys(room.players);
        const [firstId, secondId] = playerIds;

        const firstChoice = room.players[firstId].choice;
        const secondChoice = room.players[secondId].choice;

        if (firstChoice != null && secondChoice != null) {
          const roundResult = getRoundResult(firstChoice, secondChoice);

          if (roundResult === "player1") {
            room.score[firstId] = (room.score[firstId] ?? 0) + 1;
          } else if (roundResult === "player2") {
            room.score[secondId] = (room.score[secondId] ?? 0) + 1;
          }
        }
      }

      return room;
    });

    if (!transaction.committed) {
      return res
        .status(errorStatus ?? 409)
        .json({ error: errorMessage || "No se pudo guardar la jugada" });
    }

    const room = transaction.snapshot.val() as Room | null;

    if (!room) {
      return res.status(500).json({ error: "No se pudo obtener la sala actualizada" });
    }

    const players = Object.values(room.players);
    const bothPlayersChose =
      players.length === 2 &&
      players.every((player) => player.start && player.choice != null);

    if (!bothPlayersChose) {
      return res.status(200).json({ status: "waiting", room });
    }

    const playerIds = Object.keys(room.players);
    const [firstId, secondId] = playerIds;
    const firstChoice = room.players[firstId].choice;
    const secondChoice = room.players[secondId].choice;

    if (firstChoice == null || secondChoice == null) {
      return res.status(500).json({
        error: "Falta una jugada para resolver la ronda",
      });
    }

    const result = getRoundResult(firstChoice, secondChoice);
    let winnerId: string | null = null;

    if (result === "player1") {
      winnerId = firstId;
    } else if (result === "player2") {
      winnerId = secondId;
    }

    return res.status(200).json({
      status: "finished",
      result,
      winnerId,
      room,
    });
  } catch (error) {
    return res.status(500).json({ error: "Error interno del servidor" });
  }
});

app.put("/api/rooms/:code/players/:playerId/ready", async (req, res) => {
    const code = req.params.code.toUpperCase();
    const playerId = req.params.playerId;
    const ref = db.ref(`rooms/${code}`);
    
    const snapshot = await ref.get();

    const room: Room | null = snapshot.val() as Room | null;

    if(!room){
        return res.status(404).json({error: "La sala no existe"})
    }

    const player = room.players[playerId];

    if(!player){
        return res.status(404).json({error: "No se encontró el jugador"})
    }

    player.ready = true;
    await ref.set(room);

    const players = Object.values(room.players);
    const bothPlayersReady =
    players.length === 2 && players.every((player) => player.ready);

    const status = bothPlayersReady ? "ready" : "waiting";

    return res.status(200).json({status, room});
})

app.get("/api/rooms/:code", async (req, res) => {
  const code = req.params.code.toUpperCase();
  const ref = db.ref(`rooms/${code}`);
    
  const snapshot = await ref.get();

  const room: Room | null = snapshot.val() as Room | null;

  if (!room) {
    return res.status(404).json({ error: "La sala no existe." });
  }

  return res.status(200).json(room);
});

app.post("/api/rooms/:code/games", async (req, res) => {
  const code = req.params.code.toUpperCase();
  const ref = db.ref(`rooms/${code}`);
    
  const snapshot = await ref.get();

  const room: Room | null = snapshot.val() as Room | null;

  if (!room) {
    return res.status(404).json({ error: "La sala no existe." });
  }

  const players = Object.values(room.players);

  if (players.length !== 2) {
    return res.status(409).json({ error: "Se necesitan dos jugadores para empezar." });
  }

  const previousRoundFinished = players.every(
    (player) => player.start && player.choice !== null,
  );

  if (!previousRoundFinished) {
    return res.status(409).json({ error: "La ronda actual todavía no terminó." });
  }

  for (const player of players) {
    player.choice = null;
    player.start = false;
  }

  await ref.set(room);

  return res.status(201).json({ status: "started", room });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});