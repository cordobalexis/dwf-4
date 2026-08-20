import { state } from "../../state";

export function initResultPage(){
    class ResultPage extends HTMLElement{
        result: "win" | "lose" = "lose";
        goTo!: (path: string) => void;
        constructor(){
            super();
        }
        connectedCallback(){
            this.render();
            const button = this.querySelector("custom-button");
            button?.addEventListener("click", ()=>{
            this.goTo("/game");
        });
        }
        render(){
            const score = state.getScore();
            const playerScore = score?.playerScore;
            const computerScore = score?.computerScore;
            const result = state.getResult();
            this.result = result;
            if(this.result === "win"){
                this.innerHTML = `
                    <style>
                        .win-result{
                            width: 100%;
                            height: 100vh;
                            background-color: #888949E5;
                            display: flex;
                            flex-direction: column;
                            justify-content: space-around;
                            align-items: center;
                        }
                    </style>

                    <div class="win-result">

                        <result-star result="win"></result-star>

                        <score-board player-score="${playerScore}" computer-score="${computerScore}"></score-board>

                        <custom-button type="submit">Volver a Jugar</custom-button>
                    
                    </div>

                `;
            } else if(this.result === "lose"){
                this.innerHTML = `
                <style>
                        .lose-result{
                            width: 100%;
                            height: 100vh;
                            background-color: #894949E5;
                            display: flex;
                            flex-direction: column;
                            justify-content: space-around;
                            align-items: center;
                        }
                    </style>

                    <div class="lose-result">

                        <result-star result="lose"></result-star>

                        <score-board player-score="${playerScore}" computer-score="${computerScore}"></score-board>

                        <custom-button type="submit">Volver a Jugar</custom-button>
                    
                    </div>
                `;
            }
        }
    }
    customElements.define("result-page", ResultPage);
}