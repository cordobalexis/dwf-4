import {state, Jugada} from "../../state";

export function initGamePage(){
    class GamePage extends HTMLElement{
        goTo!: (path: string) => void;
        phase: "choosing" | "selected" | "showing-plays" = "choosing";
        round: number = 1;
        roundTimerStarted = false;
        waitingForNextRound = false;

        constructor(){
            super();
        }

        connectedCallback() {
            this.render();

            state.subscribe(() => {
                this.onRoomUpdate();
            });

            this.addEventListener("hand-click", async (event: Event) => {
                const customEvent = event as CustomEvent<{ type: Jugada }>;
                const handType = customEvent.detail.type;

                const saved = await this.sendChoice(handType);

                if (!saved) return;

                const hands = this.querySelectorAll("hand-option");

                for (const hand of hands) {

                    if (hand.getAttribute("type") === handType) {
                            hand.classList.add("selected");
                        } else {
                            hand.classList.add("not-selected");
                        }
                }

                this.phase = "selected";

            });

            this.addEventListener("countdown-finished", async () => {
                const currentState = state.getState();
                const playerId = currentState.playerId;

                if (!playerId) return;

                const player = currentState.room.players[playerId];

                if (!player) return;

                if (!player.choice) {

                    const plays: Jugada[] = ["piedra", "papel", "tijera"];
                    const randomIndex = Math.floor(Math.random() * plays.length);
                    const automaticChoice = plays[randomIndex];

                    const saved = await this.sendChoice(automaticChoice);

                    if (!saved) return;

                }

                this.phase = "showing-plays";
                this.render();

                this.checkAndScheduleRoundEnd();
            });
        }

        async sendChoice(choice: Jugada): Promise<boolean> {

            const currentState = state.getState();
            const playerId = currentState.playerId;
            const roomCode = currentState.room.code;

            if (!playerId || !roomCode) {
                console.error("Falta la sala o el jugador en el state");
                return false;
            }

            const response = await fetch(`http://localhost:3000/api/rooms/${roomCode}/players/${playerId}/choice`,
                {
                 method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ choice }),
                },
            );

            const data = await response.json();

            if (!response.ok) {
                alert(data.error || "No se pudo guardar la jugada");
                return false;
            }

            const updatedState = state.getState();
            updatedState.room = data.room;
            state.setState(updatedState);

            return true;
        }

        onRoomUpdate() {

            const currentState = state.getState();
            const players = Object.values(currentState.room.players || {});

            const roomWasReset =
                players.length === 2 &&
                players.every((player) => player.choice == null && !player.start);

            if (this.waitingForNextRound && roomWasReset) {
                this.waitingForNextRound = false;
                this.round++;
                this.phase = "choosing";
                this.render();
                return;
            }

            const bothPlayersChose =
                players.length === 2 &&
                players.every((player) => player.choice != null);

            if (bothPlayersChose && this.phase !== "showing-plays") {
                this.phase = "showing-plays";
                this.render();
            }

            this.checkAndScheduleRoundEnd();
            
        }


        checkAndScheduleRoundEnd() {

            if (this.phase !== "showing-plays" || this.roundTimerStarted) return;

            const currentState = state.getState();
            const players = Object.values(currentState.room.players);

            const bothPlayersChose = players.length === 2 && players.every((player) => player.choice != null);

            if (!bothPlayersChose) return;

            this.roundTimerStarted = true;
            this.render();

            setTimeout(() => {
                this.finishRound();
            }, 2000);

        }

        async finishRound() {

            const currentState = state.getState();
            const playerId = currentState.playerId;

            if (!playerId) return;

            const myPlayer = currentState.room.players[playerId];
            const opponent = Object.values(currentState.room.players).find((player) => player.id !== playerId);

            if (!myPlayer?.choice || !opponent?.choice) {
                this.roundTimerStarted = false;
                return;
            }

            state.pushToHistory({
                myPlay: myPlayer.choice,
                opponentPlay: opponent.choice,
            });

            if (this.round === 3) {
                this.goTo("/result");
                return;
            }

            this.waitingForNextRound = true;
            this.roundTimerStarted = false;

            const playerIds = Object.keys(currentState.room.players);
            const firstPlayerId = playerIds[0];

            if (playerId !== firstPlayerId) return;

            const response = await fetch(`http://localhost:3000/api/rooms/${currentState.room.code}/games`,
                { method: "POST" },
            );

            const data = await response.json();

            if (!response.ok) {

                this.waitingForNextRound = false;
                alert(data.error || "No se pudo iniciar la siguiente ronda");
                return;

            }

            const updatedState = state.getState();
            updatedState.room = data.room;
            state.setState(updatedState);
        }

        render(){
            const currentState = state.getState();
            const playerId = currentState.playerId;
            const opponentId = Object.values(currentState.room.players).find((player) => player.id !== playerId)?.id;
            const myPlay = currentState.room.players[playerId!].choice;
            const opponentPlay = currentState.room.players[opponentId!].choice;

            if(this.phase === "showing-plays" && myPlay && opponentPlay){

                this.innerHTML = `
                <style>
                .game-page{

                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: space-between;
                    width: 100%;
                    height: 100vh;
                    background:
                    radial-gradient(circle at 20% 20%, rgba(0, 144, 72, 0.18), transparent 30%),
                    radial-gradient(circle at 80% 80%, rgba(0, 108, 252, 0.15), transparent 30%),
                    #101010;

                }

                .opponent-play{

                    transform: rotate(180deg);

                }

                hand-option {

                    width: 103px;
                    height: 235px;

                }

                </style>

                <div class="game-page">

                    <hand-option class="opponent-play" type="${opponentPlay}"></hand-option>
                    <hand-option class="my-play" type="${myPlay}"></hand-option>

                </div>
                `;

            } else if (this.phase === "showing-plays") {

                this.innerHTML = `
                    <style>
                    .game-page {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                        width: 100%;
                        height: 100vh;
                        background: #101010;
                    }
                    </style>

                    <div class="game-page">
                    <game-title variant="txt">Esperando al otro jugador...</game-title>
                    </div>
                `;

            } else if(this.phase === "choosing") {

                this.innerHTML = `
                <style>
                    .game-page{

                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: space-between;
                        width: 100%;
                        height: 100vh;
                        background:
                        radial-gradient(circle at 20% 20%, rgba(0, 144, 72, 0.18), transparent 30%),
                        radial-gradient(circle at 80% 80%, rgba(0, 108, 252, 0.15), transparent 30%),
                        #101010;

                    }

                    countdown-circle{

                        margin-top: 150px;

                    }

                    .hand-options{

                        display: flex;
                        flex-direction: row;
                        justify-content: space-around;
                        width: 100%;

                    }

                    hand-option {

                        width: 103px;
                        height: 235px;
                        transition: transform 0.3s, opacity 0.3s;

                    }

                    hand-option.not-selected {

                        transform: scale(0.7);
                        opacity: 0.4;

                    }

                    hand-option.selected {

                        transform: scale(1.15);
                        opacity: 1;
                        z-index: 1;

                    }

                </style>

                <div class="game-page">

                    <countdown-circle></countdown-circle>

                    <div class="hand-options">
                        <hand-option type="tijera"></hand-option>
                        <hand-option type="piedra"></hand-option>
                        <hand-option type="papel"></hand-option>
                    </div>

                </div>
                `;
            } else if(this.phase === "selected" && myPlay){

                const piedraClass = myPlay === "piedra" ? "selected" : "not-selected";
                const papelClass = myPlay === "papel" ? "selected" : "not-selected";
                const tijeraClass = myPlay === "tijera" ? "selected" : "not-selected";

                this.innerHTML = `
                <style>
                    .game-page{

                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: space-between;
                        width: 100%;
                        height: 100vh;
                        background:
                        radial-gradient(circle at 20% 20%, rgba(0, 144, 72, 0.18), transparent 30%),
                        radial-gradient(circle at 80% 80%, rgba(0, 108, 252, 0.15), transparent 30%),
                        #101010;

                    }

                    .hand-options{

                        display: flex;
                        flex-direction: row;
                        justify-content: space-around;
                        width: 100%;

                    }

                    hand-option {

                        transition: transform 0.3s, opacity 0.3s;

                    }

                    hand-option.not-selected {

                        transform: scale(0.7);
                        opacity: 0.4;

                    }

                    hand-option.selected {

                        transform: scale(1.15);
                        opacity: 1;
                        z-index: 1;

                    }

                </style>

                <div class="game-page">

                    <countdown-circle></countdown-circle>

                    <div class="hand-options">
                        <hand-option class="${tijeraClass}" type="tijera"></hand-option>
                        <hand-option class="${piedraClass}" type="piedra"></hand-option>
                        <hand-option class="${papelClass}" type="papel"></hand-option>
                    </div>

                </div>
                `;
            }
        }
    }

    customElements.define("game-page", GamePage);
}