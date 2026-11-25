export function initGameTitle(){
    class GameTitle extends HTMLElement{
        private shadow: ShadowRoot;

        constructor(){
            super();
            this.shadow = this.attachShadow({mode: "open"});
        }

        connectedCallback() {
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
            }
        
            this.shadow.innerHTML = `
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
                    color: #b8b6b6;
                    display: block;
                    width: 100%;
                    text-align: center;
                }
                .paragraph{
                    font-family: "Special Elite", system-ui;
                    font-weight: 400;
                    font-size: 24px;
                    margin: 0;
                    color: #FFFFFF; 
                    display: block;
                    width: 100%;
                    text-align: center;
                }
                .txt{
                    font-family: "Special Elite", system-ui;
                    font-weight: 400;
                    font-size: 35px;
                    margin: 0;
                    color: #D8FCFC;
                }
                </style>

                <${tag} class="${variant}">
                <slot></slot>
                </${tag}>
            `;
        }
    }
    customElements.define("game-title", GameTitle)
}