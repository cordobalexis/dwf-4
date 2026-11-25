export function initScoreBoard(){
    class ScoreBoard extends HTMLElement{
        constructor(){
            super();
            const shadow = this.attachShadow({mode: "open"});
            const playerScore = this.getAttribute("player-score") || "0";
            const computerScore = this.getAttribute("computer-score") || "0";
            shadow.innerHTML = `
            <style>
            .score-board{
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                width: 259px;
                height: 217px;
                background-color: white;
                border-radius: 10px;
                border: 10px solid #000000;
            }
            .score{
                display:flex;
                flex-direction: column;
                align-items: flex-end;
                padding: 20px;
            }
            </style>

            <div class="score-board">
                <game-title variant="title">Score</game-title>
                <div class="score">
                    <game-title variant="subtitle">Vos: ${playerScore}</game-title>
                    <game-title variant="subtitle">Oponente: ${computerScore}</game-title>
                </div>
            </div>
            `;

        }
    }
    customElements.define("score-board", ScoreBoard);
}