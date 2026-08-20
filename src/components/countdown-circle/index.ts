export function initCountdownCircle(){
    class CountdownCircle extends HTMLElement {
        constructor() {
            super();
            const shadow = this.attachShadow({mode: "open"});
            const seconds = Number(this.getAttribute("seconds")) || 3;

            shadow.innerHTML = `
            <style>
                :host {
                    display: block;
                    width: 200px;
                    height: 200px;
                }

                svg {
                    width: 100%;
                    height: 100%;
                }
            </style>
            <svg viewBox="0 0 100 100" >
                <circle cx="50" cy="50" r="45" stroke="#ccc" stroke-width="10" fill="none"/>
                <circle id="progress" cx="50" cy="50" r="45" stroke="#00f" stroke-width="10" fill="none"
                stroke-dasharray="282.743" stroke-dashoffset="282.743"/>
                <text x="50" y="55" text-anchor="middle" font-size="20" fill="#000">${seconds}</text>
            </svg>
            `;

            const progressCircle = shadow.getElementById("progress");
            const textElement = shadow.querySelector("text") as SVGTextElement;
            const circumference = 2 * Math.PI * 45;
            const step = circumference / seconds;

            let currentSecond = seconds;
            const timer = setInterval(() => {
                currentSecond--;
                if (currentSecond >= 0) {
                    textElement.textContent = currentSecond.toString();
                    progressCircle?.setAttribute("stroke-dashoffset", (circumference - step * (seconds - currentSecond)).toString());
                } else{
                    clearInterval(timer);
                    this.dispatchEvent(new CustomEvent("countdown-finished", { bubbles: true, composed: true}));
                }
            }, 1000);
        }
    }
    customElements.define('countdown-circle', CountdownCircle);
}