export function initCustomInput(){
    class CustomInput extends HTMLElement{
        constructor(){
            super();
            const shadow = this.attachShadow({mode: "open"});
            shadow.innerHTML = `
            <style>
            label{
                font-family: "Odibee Sans", sans-serif;
                font-size: 45px;
                font-weight: 400;
                color: #cccbcb;
                display: block;
                width: 100%;
                text-align: center;
            }

            :host {
                display: block;
                width: 100%;
            }

            input{
                width: 100%;
                height: 84px;
                border: 10px solid #182460;
                border-radius: 10px;
                box-sizing: border-box;
                font-family: "Odibee Sans", sans-serif;
                font-size: 45px;
                font-weight: 400;
                text-align: center;
                color: #c2bfbf;
            }

            </style>

            <label for="input"> <slot></slot> </label>
            <input type="text" id="input" />
            `;
        };

        get value(){
            const inputEl = this.shadowRoot?.querySelector("#input") as HTMLInputElement;
            return inputEl?.value ?? "";
        }
    }
    customElements.define("custom-input", CustomInput);
}