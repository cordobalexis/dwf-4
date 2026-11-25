import {state} from "../../state";

export function initCodePage(){
    class CodePage extends HTMLElement {
        goTo!: (path: string) => void;
        constructor(){
            super();
        }

        connectedCallback(){

            this.render();
            const buttonNewGame = this.querySelector(".btn_room");
            buttonNewGame?.addEventListener("click", ()=>{
                this.goTo("/instruction")
            });
        }

        render(){
            const currentState = state.getState();

            const room = currentState.room;
            
            if (!room) return;

            const scoreRows = Object.values(room.players).map((player) => `
            <game-title>${player.name}: ${room.score[player.id] ?? 0}</game-title>`).join("");

            const roomCode = room.code;

            this.innerHTML = `
            <style>

            .code-page{
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
                margin-block: auto;
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

            <div class="code-page">

                <header class="header">

                    <game-title>
                        ${scoreRows}
                    </game-title>

                    <game-title>Sala:<br>${roomCode}</game-title>

                </header>

                <div class="scc">

                    <game-title variant="subtitle">Compartí el código:
                    </game-title>

                    <game-title variant="title">${roomCode}
                    </game-title>

                    <game-title variant="subtitle">con tu contrincante
                    </game-title>

                    <custom-button class="btn_room">Continuar</custom-button>

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
    customElements.define("code-page", CodePage);
}