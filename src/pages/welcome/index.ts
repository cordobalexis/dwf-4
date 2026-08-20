export function initWelcomePage(){
class WelcomePage extends HTMLElement{
    goTo!: (path: string) => void;
    constructor(){
        super();
    }
    connectedCallback(){
        this.render();
        const button = this.querySelector("custom-button");
        button?.addEventListener("click", ()=>{
            this.goTo("/instructions")
        });
    }
    render(){
        this.innerHTML = `
        <style>
            .welcome-page{
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
                margin-top: 200px;
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
        </style>

        <div class="welcome-page">

            <div class="scc">
                <game-title variant="title">Piedra, Papel ó Tijera
                </game-title>

                <custom-button>Empezar</custom-button>
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