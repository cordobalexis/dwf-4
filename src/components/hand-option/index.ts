import piedra from "url:../../../assets/piedra.png";
import papel from "url:../../../assets/papel.png";
import tijera from "url:../../../assets/tijera.png";

const hands: any = {
    piedra,
    papel,
    tijera
};

export function initHandOption() {
    class HandOption extends HTMLElement{
        constructor(){
            super();
            const shadow = this.attachShadow({mode: "open"});
            const type = this.getAttribute("type") || "piedra";
            const image = hands[type];
            shadow.innerHTML = `
            <style>
            :host {
                 display: block;
            }
            img{
                width: 100%;
                height: 100%;
                object-fit: fill;
                cursor: pointer;
            }
            </style>
            <img src="${image}" alt="${type}"/>
            `;
            const imgEl = shadow.querySelector("img") as HTMLImageElement;
            imgEl?.addEventListener("click", () => {
                this.dispatchEvent(new CustomEvent("hand-click", {
                    detail: {type},
                    bubbles: true,
                    composed: true,
                }))
            })
        }
    }
    customElements.define("hand-option", HandOption);
}