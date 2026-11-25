import {state} from "../../state";

export function initWaitingPage(){
    class WaitingPage extends HTMLElement{
        goTo!: (path: string) => void;

        hasNavigated: boolean = false;

        constructor(){
            super();
        }

        connectedCallback(){
            this.render();

            state.subscribe(() => {
                const room = state.getState().room;
                if(!room) return;

                const players = Object.values(room.players);
                const bothPlayersReady = players.length === 2 && players.every((player) => player.ready);

                if(bothPlayersReady){
                    if(!this.hasNavigated){
                        this.hasNavigated = true;
                        this.goTo("/game");
                    }
                    return;
                } 

                this.render();
            })
        }

        render(){
            const currentState = state.getState();

            const room = currentState.room;
            const playerId = currentState.playerId;

            if (!room || !playerId) return;

            const opponent = Object.values(room.players).find((player) => player.id !== playerId);

            const waitingText = opponent ? `Esperando a que ${opponent.name} presione ¡Jugar!...` : "Esperando a que se una un contrincante...";

            const scoreRows = Object.values(room.players).map((player) => {
                const colorClass = player.id === playerId ? "me" : "opponent";
                const score = room.score[player.id] ?? 0;

                return `<game-title class="${colorClass}">${player.name}: ${score}</game-title>`;
            }).join("");
            
            const roomCode = room.code;

            this.innerHTML = `
            <style>

            .waiting-page{

                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: space-between;
                width: 100%;
                min-height: 100vh;
                background:
                radial-gradient(circle at 20% 20%, rgba(0, 144, 72, 0.18), transparent 30%),
                radial-gradient(circle at 80% 80%, rgba(0, 108, 252, 0.15), transparent 30%),
                #101010;

            }
                
            .scc{

                width: 100%;
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 50px;

            }

            .me{

                font-family: "American Typewriter", sans-serif;
                font-size: 24px;
                font-weight: 600;
                color: #000;

            }

            .opponent{

                font-family: "American Typewriter", sans-serif;
                font-size: 24px;
                font-weight: 600;
                color: #FF6442;

            }

            .header{

                display: flex;
                flex-direction: row;
                justify-content: space-between;
                width: 100%;
                height: 90px;
                align-items: flex-start;
                padding: 12px 16px;
                box-sizing: border-box;

            }
            
            .hand-options{

                display: flex;
                flex-direction: row;
                justify-content: space-around;
                width: 100%;
                align-items: flex-end;

            }

            hand-option {

                width: 56px;
                height: 128px;

            }

                @media (min-width: 960px){

                    .scc{
                        width: 336px;
                        margin-top: 60px;
                    }
                        
                    .header{

                        width: 627px;
                        align-items: center;

                    }

                    .hand-options{
                        width: 336px;
                    }
                }

            </style>

            <div class="waiting-page">

            <header class="header">

                <game-title>
                    ${scoreRows}
                </game-title>

                <game-title>Sala:<br>${roomCode}</game-title>

            </header>

            <div class="scc">

                <game-title variant="subtitle">${waitingText}
                </game-title>

            </div>

            <div class="hand-options">
                <hand-option type="tijera"></hand-option>
                <hand-option type="piedra"></hand-option>
                <hand-option type="papel"></hand-option>
            </div>

            </div>
            `;
        }
        
    }
    customElements.define("waiting-page", WaitingPage);
}