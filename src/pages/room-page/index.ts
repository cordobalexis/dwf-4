import {state} from "../../state";

export function initRoomPage(){
    class RoomPage extends HTMLElement{
        goTo!: (path: string) => void;

        constructor(){
            super();
        }

        connectedCallback(){
            this.render();
            
            const buttonStart = this.querySelector(".btn_start");
            buttonStart?.addEventListener("click", async () => {
                const codeInput = this.querySelector(".input_code") as HTMLElement & { value: string };
                const code = codeInput.value.trim().toUpperCase();

                if(!code){
                    alert("Por favor, ingrese un código válido");
                    return;
                }

                const currentState = state.getState();
                currentState.roomCodeToJoin = code;
                state.setState(currentState);

                this.goTo("/name");

            })
        }

        render(){
        this.innerHTML = `
        <style>
            .room-page{
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

                game-title{
                    width: 308px;
                    height: 219px;
                }

                .scc{
                    width: 336px;
                    margin-top: 60px;
                    margin: auto;
                }

                .hand-options{
                    width: 336px;
                }
            }

        </style>

        <div class="room-page">

            <div class="scc">
                <game-title variant="title">Piedra, Papel ó Tijera
                </game-title>

                <custom-input class="input_code" placeholder="código"></custom-input>

                <custom-button class="btn_start">Ingresar a la sala</custom-button>

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
    customElements.define("room-page", RoomPage);
}