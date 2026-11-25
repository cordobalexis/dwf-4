import { snapshot } from "node:test";
import {database} from "./firebase";
import {ref, onValue, onDisconnect, set} from "firebase/database";

export type Jugada = "piedra" | "papel" | "tijera";

type Result = "win" | "lose" | "draw";

type Game = {
    opponentPlay: Jugada | null,
    myPlay: Jugada | null,
};

type Player = {
    id: string,
    name: string,
    choice: Jugada | null,
    online: boolean,
    start: boolean,
    ready: boolean
};

type Room = {
    code: string,
    players: Record<string, Player>,
    score: Record<string, number>
};


export const state = {
    data:{

        history:[] as Game[],

        room: {
        code: "",
        players: {} as Record<string, Player>,
        score: {} as Record<string, number>
        } as Room,

        playerId: null as string | null,

        roomCodeToJoin: null as string | null
    },

    listeners: [] as Array<(state: any) => void>,

    getState(){
        return this.data;
    },
    setState(newState:any){
        this.data = newState;
        for(const cb of this.listeners){
            cb(this.data);
        }
    },
    subscribe(callback: (state: any) => void){
        const onChange = () => {
            callback(this.data);
        };
        this.listeners.push(onChange);
    },
    pushToHistory(play:Game){
        const currentState = this.getState();
        currentState.history.push(play);
        this.setState(currentState);
    },
    setMove(move:Jugada){
        const currentState = this.getState();
        currentState.room.players[currentState.playerId!].choice = move;
        this.setState(currentState);
    },
    getScore(){
        let playerScore: number = 0;
        let opponentScore: number = 0;
        for(const game of this.data.history){
            if(game.myPlay && game.opponentPlay){
            const result = this.whoWins(game.myPlay, game.opponentPlay);
            if(result === "win"){
                playerScore++;
            }
            if(result === "lose"){
                opponentScore++;
            }
        }
    }
    return {
            playerScore,
            opponentScore
        };
    },

    getResult(){
        const score = this.getScore();
        if(score.playerScore > score.opponentScore){
            return "win";
        }
        return "lose";
    },

    whoWins(myPlay: Jugada,opponentPlay: Jugada): Result{
        const ganeConTijera = myPlay == "tijera" && opponentPlay == "papel";
        const ganeConPiedra = myPlay == "piedra" && opponentPlay == "tijera";
        const ganeConPapel = myPlay == "papel" && opponentPlay == "piedra";
        const gane = [ganeConPapel, ganeConPiedra, ganeConTijera].includes(true)

        if(myPlay === opponentPlay){
            return "draw"
        } 
        if(gane){
            return "win"
        }
        return "lose"
    },

    listenRoom(roomCode: string){

        const playerId = state.data.playerId;
        if(!playerId) return;

        const infoConnectedRef = ref(database, ".info/connected");

        const onlineRef = ref(database, `/rooms/${roomCode}/players/${playerId}/online`);

        onValue(infoConnectedRef, async (snapshot) => {
            
            const status = snapshot.val();
            if(status === true){
                await onDisconnect(onlineRef).set(false);
                await set(onlineRef, true);
            }
        })

        const gameRef = ref(database, `rooms/${roomCode}`);

        return onValue(gameRef, (snapshot) => {
            const room = snapshot.val();
            if(room){
               const currentState = this.getState();
               currentState.room = room;
               this.setState(currentState);
            }
        })
    }
}