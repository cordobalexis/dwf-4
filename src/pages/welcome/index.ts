export function initWelcomePage(){
class WelcomePage extends HTMLElement{
    goTo!: (path: string) => void;
    constructor(){
        super();
    }
    connectedCallback(){
        this.render();
        const buttonNewGame = this.querySelector(".btn_new-game");
        buttonNewGame?.addEventListener("click", ()=>{
            this.goTo("/name")
        });

        const buttonExistingRoom = this.querySelector(".btn_room");
        buttonExistingRoom?.addEventListener("click", ()=>{
            this.goTo("/sala")
        });
    }
    render(){
        this.innerHTML = `
        <style>

            body { margin: 0; }

            .welcome-page{
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 20px;
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
                margin-top: 150px;
            }

            .scc custom-input {
                width: 100%;
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

        <div class="welcome-page">

            <div class="scc">
                <game-title variant="title">Piedra, Papel ó Tijera
                </game-title>

                <custom-button class="btn_new-game">Nuevo Juego</custom-button>

                <custom-button class="btn_room">Ingresar a una sala</custom-button>

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
    customElements.define('welcome-page', WelcomePage);
}