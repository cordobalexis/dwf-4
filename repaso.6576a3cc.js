function e(e){return e&&e.__esModule?e.default:e}var t={};t=import.meta.resolve("6Mtdp");var i={};i=import.meta.resolve("e62rP");var s={};s=import.meta.resolve("lpsSE");let n={piedra:e(t),papel:e(i),tijera:e(s)};var a={};a=import.meta.resolve("ifmUf");var o={};o=import.meta.resolve("hfQLS");let r={win:e(a),lose:e(o),draw:e(o)},l={win:"Ganaste",lose:"Perdiste",draw:"Empate"},c={data:{currentGame:{computerPlay:null,myPlay:null},history:[]},listeners:[],getState(){return this.data},setState(e){for(let t of(this.data=e,this.listeners))t(this.data)},subscribe(e){let t=()=>{e(this.data)};this.listeners.push(t)},setMove(e){let t=this.getState();t.currentGame.myPlay=e,this.setState(t)},setComputerMove(e){let t=this.getState();t.currentGame.computerPlay=e,this.setState(t)},pushToHistory(e){let t=this.getState();t.history.push(e),this.setState(t)},getScore(){let e=0,t=0;for(let i of this.data.history)if(i.myPlay&&i.computerPlay){let s=this.whoWins(i.myPlay,i.computerPlay);"win"===s&&e++,"lose"===s&&t++}return{playerScore:e,computerScore:t}},getResult(){let e=this.getScore();return e.playerScore>e.computerScore?"win":"lose"},whoWins(e,t){let i=["papel"==e&&"piedra"==t,"piedra"==e&&"tijera"==t,"tijera"==e&&"papel"==t].includes(!0);return e===t?"draw":i?"win":"lose"}},d=[{path:/^\/$/,component:e=>{let t=document.createElement("welcome-page");return t.goTo=e.goTo,t}},{path:/\/instruction/,component:e=>{let t=document.createElement("instructions-page");return t.goTo=e.goTo,t}},{path:/\/game/,component:e=>{let t=document.createElement("game-page");return t.goTo=e.goTo,t}},{path:/\/result/,component:e=>{let t=document.createElement("result-page");return t.goTo=e.goTo,t}}];class p extends HTMLElement{constructor(){super();let e=this.attachShadow({mode:"open"}),t=this.getAttribute("type")||"piedra",i=n[t];e.innerHTML=`
            <style>
            img{
                width: 57px;
                height: 127px;
                cursor: pointer;
            }
            </style>
            <img src="${i}" alt="${t}"/>
            `;let s=e.querySelector("img");s?.addEventListener("click",()=>{this.dispatchEvent(new CustomEvent("hand-click",{detail:{type:t},bubbles:!0,composed:!0}))})}}customElements.define("hand-option",p);class h extends HTMLElement{constructor(){super();let e=this.attachShadow({mode:"open"}),t=Number(this.getAttribute("seconds"))||3;e.innerHTML=`
            <style></style>
            <svg viewBox="0 0 100 100" width="100" height="100">
                <circle cx="50" cy="50" r="45" stroke="#ccc" stroke-width="10" fill="none"/>
                <circle id="progress" cx="50" cy="50" r="45" stroke="#00f" stroke-width="10" fill="none"
                stroke-dasharray="282.743" stroke-dashoffset="282.743"/>
                <text x="50" y="55" text-anchor="middle" font-size="20" fill="#000">${t}</text>
            </svg>
            `;let i=e.getElementById("progress"),s=e.querySelector("text"),n=2*Math.PI*45,a=n/t,o=t,r=setInterval(()=>{--o>=0?(s.textContent=o.toString(),i?.setAttribute("stroke-dashoffset",(n-a*(t-o)).toString())):(clearInterval(r),this.dispatchEvent(new CustomEvent("countdown-finished",{bubbles:!0,composed:!0})))},1e3)}}customElements.define("countdown-circle",h);class u extends HTMLElement{constructor(){super();let e=this.attachShadow({mode:"open"}),t=this.getAttribute("type")||"button";e.innerHTML=`
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

            <button type="${t}">
              <slot></slot>
            </button>
            `}}customElements.define("custom-button",u);class m extends HTMLElement{constructor(){super();let e=this.attachShadow({mode:"open"}),t=this.getAttribute("variant")||"paragraph",i="p";switch(t){case"title":i="h1";break;case"subtitle":i="h2";break;case"txt":i="h3";break;default:i="p"}e.innerHTML=`
            <style>
            .title{
                font-family: "Special Elite", system-ui;
                font-weight: 700;
                font-size: 80px;
                margin: 0;
                color: #009048;
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

            <${i} class=${t}>
            <slot></slot>
            </${i}>
            `}}customElements.define("game-title",m);class g extends HTMLElement{constructor(){super();let e=this.attachShadow({mode:"open"}),t=this.getAttribute("result")||"draw",i=r[t]||r.draw,s=l[t]||l.draw;e.innerHTML=`
                <style>
                    .result-star{
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
                </style>

                <div class="result-star">
                    <img src="${i}" alt="${t}" />
                    <game-title variant="subtitle">${s}</game-title>
                </div>
            `}}customElements.define("result-star",g);class y extends HTMLElement{constructor(){super();let e=this.attachShadow({mode:"open"}),t=this.getAttribute("player-score")||"0",i=this.getAttribute("computer-score")||"0";e.innerHTML=`
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
                    <game-title variant="subtitle">Vos: ${t}</game-title>
                    <game-title variant="subtitle">M\xe1quina: ${i}</game-title>
                </div>
            </div>
            `}}customElements.define("score-board",y);class f extends HTMLElement{constructor(){super(),this.phase="choosing",this.round=1}connectedCallback(){this.render(),this.addEventListener("countdown-finished",()=>{let e=["piedra","papel","tijera"],t=Math.floor(Math.random()*e.length),i=e[t];c.setComputerMove(i),this.phase="showing-plays",this.render(),setTimeout(()=>{let e=c.getState();c.pushToHistory({myPlay:e.currentGame.myPlay,computerPlay:e.currentGame.computerPlay}),this.round<3?(this.round++,this.phase="choosing",this.render()):this.goTo("/result")},2e3)}),this.addEventListener("hand-click",e=>{let t=e.detail.type;c.setMove(t),this.phase="selected",this.render()})}render(){let e=c.getState(),t=e.currentGame?.myPlay,i=e.currentGame?.computerPlay;"showing-plays"===this.phase&&t&&i?this.innerHTML=`
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
                </style>

                <div class="game-page">
                    <hand-option class="computer-play" type="${i}"></hand-option>
                    <hand-option class="my-play" type="${t}"></hand-option>
                </div>
                `:"choosing"===this.phase?this.innerHTML=`
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
                    width: 103px;
                    height: 235px;
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
                `:"selected"===this.phase&&t&&(this.innerHTML=`
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
                        <hand-option class="${"tijera"===t?"selected":"not-selected"}" type="tijera"></hand-option>
                        <hand-option class="${"piedra"===t?"selected":"not-selected"}" type="piedra"></hand-option>
                        <hand-option class="${"papel"===t?"selected":"not-selected"}" type="papel"></hand-option>
                    </div>
                </div>
                `)}}customElements.define("game-page",f);class b extends HTMLElement{constructor(){super()}connectedCallback(){this.render();let e=this.querySelector("custom-button");e?.addEventListener("click",()=>{this.goTo("/game")})}render(){this.innerHTML=`
            <style>
                .instruction-page{
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
            </style>

            <div class="instruction-page">
                <game-title varian="subtitle">Presion\xe1 jugar
                y eleg\xed: piedra, papel o tijera antes de que pasen los 3 segundos.
                </game-title>

                <custom-button>\xa1Jugar!</custom-button>

                <div class="hand-options">
                    <hand-option type="tijera"></hand-option>
                    <hand-option type="piedra"></hand-option>
                    <hand-option type="papel"></hand-option>
                </div>
            
            </div>
            `}}customElements.define("instructions-page",b);class w extends HTMLElement{constructor(){super(),this.result="lose"}connectedCallback(){this.render();let e=this.querySelector("custom-button");e?.addEventListener("click",()=>{this.goTo("/game")})}render(){let e=c.getScore(),t=e?.playerScore,i=e?.computerScore,s=c.getResult();this.result=s,"win"===this.result?this.innerHTML=`
                    <style>
                        .win-result{
                            width: 100%;
                            height: 100vh;
                            background-color: #888949E5;
                            display: flex;
                            flex-direction: column;
                            justify-content: space-around;
                        }
                    </style>

                    <div class="win-result">

                        <result-star result="win"></result-star>

                        <score-board player-score="${t}" computer-score="${i}"></score-board>

                        <custom-button type="submit">Volver a Jugar</custom-button>
                    
                    </div>

                `:"lose"===this.result&&(this.innerHTML=`
                <style>
                        .win-result{
                            width: 100%;
                            height: 100vh;
                            background-color: #894949E5;
                            display: flex;
                            flex-direction: column;
                            justify-content: space-around;
                        }
                    </style>

                    <div class="win-result">

                        <result-star result="lose"></result-star>

                        <score-board player-score="${t}" computer-score="${i}"></score-board>

                        <custom-button type="submit">Volver a Jugar</custom-button>
                    
                    </div>
                `)}}customElements.define("result-page",w);class x extends HTMLElement{constructor(){super()}connectedCallback(){this.render();let e=this.querySelector("custom-button");e?.addEventListener("click",()=>{this.goTo("/instructions")})}render(){this.innerHTML=`
        <style>
            .welcome-page{
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
                width: 103px;
                height: 235px;
            }
        </style>

        <div class="welcome-page">
            <game-title variant="title">Piedra, Papel \xf3 Tijera
            </game-title>

            <custom-button>Empezar</custom-button>

            <div class="hand-options">
                <hand-option type="tijera"></hand-option>
                <hand-option type="piedra"></hand-option>
                <hand-option type="papel"></hand-option>
            </div>
        </div>
        `}}customElements.define("welcome-page",x),function(e){function t(e){history.pushState({},"",e),i(e)}function i(i){for(let s of d)if(s.path.test(i)){let i=s.component({goTo:t});e.firstChild&&e.firstChild.remove(),e.appendChild(i)}}i(location.pathname),window.onpopstate=()=>{i(location.pathname)}}(document.querySelector("#root"));
//# sourceMappingURL=repaso.6576a3cc.js.map
