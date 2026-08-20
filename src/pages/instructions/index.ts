export function initInstructionsPage(){
    class InstructionsPage extends HTMLElement{
        goTo!: (path: string) => void;
        constructor(){
            super();
        }
        connectedCallback(){
            this.render();
            const button = this.querySelector("custom-button");
            button?.addEventListener("click", ()=>{
            this.goTo("/game")
        });
        }
        render(){
            this.innerHTML = `
            <style>
                .instruction-page{
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
                    gap: 20px;
                    margin-top: 100px;
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
            </style>

            <div class="instruction-page">
                <div class="scc">
                    <game-title varian="subtitle">Presioná jugar
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