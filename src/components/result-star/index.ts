import star1 from "url:../../../assets/star1.png";
import star2 from "url:../../../assets/star2.png";

const stars: any = {
    win: star1,
    lose: star2,
    draw: star2,
};

const text: any = {
    win: "Ganaste",
    lose: "Perdiste",
    draw: "Empate",
}

export function initResultStar(){
    class ResultStar extends HTMLElement {
        constructor(){
            super();
            const shadow = this.attachShadow({mode:"open"});
            const result = this.getAttribute("result") || "draw";
            const star = stars[result] || stars["draw"];
            const textResult = text[result] || text["draw"];

            shadow.innerHTML = `
                <style>
                    .result-star{
                        position: relative;
                        display: flex;
                        justify-content: center;
                        flex-direction: column;
                        align-items: center;
                        width: 255px;
                        height: 260px;
                    }
                    img{
                        width: 100%;
                        height: 100%;
                    }
                    game-title{
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                        z-index: 2;
                    }
                </style>

                <div class="result-star">
                    <img src="${star}" alt="${result}" />
                    <game-title variant="subtitle">${textResult}</game-title>
                </div>
            `;
        }
    }
    customElements.define("result-star", ResultStar);
}