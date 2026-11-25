import {state} from "../../state";
import { API_BASE_URL } from "../../api";

export function initUserNamePage(){
class UserNamePage extends HTMLElement{
    
    goTo!: (path: string) => void;

    constructor(){
        super();
    }

    connectedCallback(){
        this.render();
        const buttonStart = this.querySelector(".btn_start");
        buttonStart?.addEventListener("click", async ()=>{

            const nameInput = this.querySelector(".input_name",) as HTMLElement & { value: string };

            const name = nameInput.value.trim();

            const currentState = state.getState();

            const roomCode = currentState.roomCodeToJoin;

            if (!name) {
                alert("Por favor, ingresa tu nombre");
                return;
            }
            console.log("Código guardado para unirme:", roomCode);

            if(roomCode){
                const response = await fetch(`${API_BASE_URL}/api/rooms/${roomCode}/players`, {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify({name})
                });

                const data = await response.json();

                if(!response.ok){
                    alert(data.error || "Error al unirse a la sala");
                    return;
                }

                currentState.room = data.room;
                currentState.playerId = data.playerId;
                currentState.roomCodeToJoin = null;
                state.setState(currentState);

                state.listenRoom(data.room.code);

                this.goTo("/instruction");

                return;
            }

            const response = await fetch(`${API_BASE_URL}/api/rooms`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({name})
            });

            const data = await response.json();

            if(!response.ok){
                alert(data.error || "Error al crear la sala");
                return;
            }

            currentState.room = data.room;
            currentState.playerId = data.playerId;
            state.setState(currentState);

            state.listenRoom(data.roomCode);

            this.goTo("/codigo")
        });
    }

    render(){
        this.innerHTML = `
        <style>

            body { margin: 0; }

            .name-page{
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
                    margin: auto;
                }

                .hand-options{
                    width: 336px;
                }
            }

        </style>

        <div class="name-page">

            <div class="scc">
                <game-title variant="title">Piedra, Papel ó Tijera
                </game-title>

                <custom-input class="input_name" placeholder="Ingresa tu nombre">Tu nombre: </custom-input>

                <custom-button class="btn_start">Empezar</custom-button>

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
    customElements.define('user-name-page', UserNamePage);
}