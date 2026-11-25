import {state} from "../../state";
import { API_BASE_URL } from "../../api";

export function initInstructionsPage(){
    class InstructionsPage extends HTMLElement{
        goTo!: (path: string) => void;
        constructor(){
            super();
        }
        connectedCallback(){
            this.render();
            const button = this.querySelector("custom-button");
            button?.addEventListener("click", async ()=>{

                const currentState = state.getState();
                const room = currentState.room;
                const playerId = currentState.playerId;

                if (!room || !playerId) return;

                const response = await fetch(`${API_BASE_URL}/api/rooms/${room.code}/players/${playerId}/ready`, {method: "PUT"});

                const data = await response.json();

                if(!response.ok){
                    alert(data.error || "No se pudo marcar como listo");
                    return;
                }

                if (data.status === "waiting") {
                    this.goTo("/waiting");
                } else if (data.status === "ready") {
                    this.goTo("/game");
                }
        });
        }
        render(){

            const currentState = state.getState();

            const room = currentState.room;
            console.log(currentState.room)
            if (!room) return;

            const scoreRows = Object.values(room.players).map((player) => `
            <game-title>${player.name}: ${room.score[player.id] ?? 0}</game-title>`).join("");

            const roomCode = room.code;
            
            this.innerHTML = `
            <style>

                .instruction-page{
                    display: flex;
                    flex-direction: column;
                    gap: 20px;
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
                    width: min(calc(100% - 32px), 480px);
                    margin-inline: auto;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 50px;
                    margin-block: auto
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

                game-title{
                text-align: center;
                padding: 20px;
                }

                custom-button{
                    padding: 20px;
                }

                .hand-options{
                    display: flex;
                    flex-direction: row;
                    justify-content: space-around;
                    width: 100%;
                }

                @media (min-width: 960px){

                    .scc{
                        width: 404px;
                        margin: auto;
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

            <div class="instruction-page">

                <header class="header">

                    <game-title>
                        ${scoreRows}
                    </game-title>

                    <game-title>Sala:<br>${roomCode}</game-title>

                </header>

                <div class="scc">
                    <game-title variant="txt">Presioná jugar
                    y elegí: piedra, papel o tijera antes de que pasen los 3 segundos.
                    </game-title>

                    <custom-button>¡Jugar!</custom-button>
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
    customElements.define("instructions-page", InstructionsPage);
}