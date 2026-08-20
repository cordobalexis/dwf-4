export function initGameTitle(){
    class GameTitle extends HTMLElement{
        constructor(){
            super();
            const shadow = this.attachShadow({mode: "open"});
            const variant = this.getAttribute("variant") || "paragraph";
            let tag = "p";
            switch (variant) {
                case "title":
                    tag = "h1";
                    break;

                case "subtitle":
                    tag = "h2";
                    break;

                case "txt":
                    tag = "h3";
                    break;

                default:
                    tag = "p";
            }

            shadow.innerHTML = `
            <style>
            .title{
                font-family: "Special Elite", system-ui;
                font-weight: 700;
                font-size: 80px;
                margin: 0;
                color: #009048;
                text-align: center;
            }
            .subtitle{
                font-family: "Special Elite", system-ui;
                font-weight: 600;
                font-size: 40px;
                margin: 0;
            }
            .paragraph{
                font-family: "Special Elite", system-ui;
                font-weight: 600;
                font-size: 55px;
                margin: 0;
                color: #FFFFFF; 
            }
            .txt{
                font-family: "Special Elite", system-ui;
                font-weight: 400;
                font-size: 45px;
                margin: 0;
            }
            </style>

            <${tag} class=${variant}>
            <slot></slot>
            </${tag}>
            `;
        }
    }
    customElements.define("game-title", GameTitle)
}