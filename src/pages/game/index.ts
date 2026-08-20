import {state, Jugada} from "../../state";

export function initGamePage(){
    class GamePage extends HTMLElement{
        goTo!: (path: string) => void;
        phase: "choosing" | "selected" | "showing-plays" = "choosing";
        round: number = 1;
        constructor(){
            super();
        }
        connectedCallback(){
            this.render();
            this.addEventListener("countdown-finished", ()=>{
                const plays: Jugada[] = ["piedra", "papel", "tijera"];
                const randomIndex = Math.floor(Math.random() * plays.length);
                const computerPlay = plays[randomIndex];
                state.setComputerMove(computerPlay);

                this.phase = "showing-plays";
                this.render();

                setTimeout(()=>{
                    const currentState = state.getState();
                    state.pushToHistory({
                        myPlay: currentState.currentGame.myPlay!,
                        computerPlay: currentState.currentGame.computerPlay!
                    });
                    if(this.round < 3){
                        this.round++;
                        this.phase = "choosing";
                        this.render();
                    } else{
                        this.goTo("/result");
                    }
                }, 2000);
            });
            this.addEventListener("hand-click", (event: any)=>{
                const customEvent = event as CustomEvent;
                const handType = customEvent.detail.type;
                state.setMove(handType);

                const hands = this.querySelectorAll("hand-option");
                for (const hand of hands) {
                    const type = hand.getAttribute("type");

                    if (type === handType) {
                        hand.classList.add("selected");
                    } else {
                        hand.classList.add("not-selected");
                     }
                }   

                this.phase = "selected";
            })
        }
        render(){
            const currentState = state.getState();
            const myPlay = currentState.currentGame?.myPlay;
            const computerPlay = currentState.currentGame?.computerPlay;

            if(this.phase === "showing-plays" && myPlay && computerPlay){
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
                .computer-play{
                    transform: rotate(180deg);
                }
                hand-option {
                    width: 103px;
                    height: 235px;
                }
                </style>

                <div class="game-page">
                    <hand-option class="computer-play" type="${computerPlay}"></hand-option>
                    <hand-option class="my-play" type="${myPlay}"></hand-option>
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
                    transform: scale(1);
                    opacity: 1;
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
                    transform: scale(1);
                    opacity: 1;
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