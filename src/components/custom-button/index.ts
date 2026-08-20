export function initCustomButton(){
    class CustomButton extends HTMLElement{
        constructor(){
            super();
            const shadow = this.attachShadow({mode: "open"});
            const type = this.getAttribute("type") || "button";
            shadow.innerHTML = `
            <style>
            button{
            background-color: #006CFC;
            width: 322px;
            height: 87px;
            border-radius: 10px;
            border: 10px solid #001997;
            font-family: "Odibee Sans", sans-serif;
            font-size: 45px;
            font-weight: 400;
            cursor: pointer;
            }
            </style>

            <button type="${type}">
              <slot></slot>
            </button>
            `;
        }
    }
    customElements.define("custom-button", CustomButton);
}