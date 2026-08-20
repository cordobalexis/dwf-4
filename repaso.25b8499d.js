function t(t){return t&&t.__esModule?t.default:t}var e={};e=import.meta.resolve("6Mtdp");var i={};i=import.meta.resolve("e62rP");var s={};s=import.meta.resolve("lpsSE");let n={piedra:t(e),papel:t(i),tijera:t(s)};var a={};a=import.meta.resolve("ifmUf");var o={};o=import.meta.resolve("hfQLS");let r={win:t(a),lose:t(o),draw:t(o)},l={win:"Ganaste",lose:"Perdiste",draw:"Empate"},c={data:{currentGame:{computerPlay:null,myPlay:null},history:[]},listeners:[],getState(){return this.data},setState(t){for(let e of(this.data=t,this.listeners))e(this.data)},subscribe(t){let e=()=>{t(this.data)};this.listeners.push(e)},setMove(t){let e=this.getState();e.currentGame.myPlay=t,this.setState(e)},setComputerMove(t){let e=this.getState();e.currentGame.computerPlay=t,this.setState(e)},pushToHistory(t){let e=this.getState();e.history.push(t),this.setState(e)},getScore(){let t=0,e=0;for(let i of this.data.history)if(i.myPlay&&i.computerPlay){let s=this.whoWins(i.myPlay,i.computerPlay);"win"===s&&t++,"lose"===s&&e++}return{playerScore:t,computerScore:e}},getResult(){let t=this.getScore();return t.playerScore>t.computerScore?"win":"lose"},whoWins(t,e){let i=["papel"==t&&"piedra"==e,"piedra"==t&&"tijera"==e,"tijera"==t&&"papel"==e].includes(!0);return t===e?"draw":i?"win":"lose"}},d=[{path:/^\/$/,component:t=>{let e=document.createElement("welcome-page");return e.goTo=t.goTo,e}},{path:/\/instruction/,component:t=>{let e=document.createElement("instructions-page");return e.goTo=t.goTo,e}},{path:/\/game/,component:t=>{let e=document.createElement("game-page");return e.goTo=t.goTo,e}},{path:/\/result/,component:t=>{let e=document.createElement("result-page");return e.goTo=t.goTo,e}}];class p extends HTMLElement{constructor(){super();let t=this.attachShadow({mode:"open"}),e=this.getAttribute("type")||"piedra",i=n[e];t.innerHTML=`
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
            <img src="${i}" alt="${e}"/>
            `;let s=t.querySelector("img");s?.addEventListener("click",()=>{this.dispatchEvent(new CustomEvent("hand-click",{detail:{type:e},bubbles:!0,composed:!0}))})}}customElements.define("hand-option",p);class h extends HTMLElement{constructor(){super();let t=this.attachShadow({mode:"open"}),e=Number(this.getAttribute("seconds"))||3;t.innerHTML=`
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
                <text x="50" y="55" text-anchor="middle" font-size="20" fill="#000">${e}</text>
            </svg>
            `;let i=t.getElementById("progress"),s=t.querySelector("text"),n=2*Math.PI*45,a=n/e,o=e,r=setInterval(()=>{--o>=0?(s.textContent=o.toString(),i?.setAttribute("stroke-dashoffset",(n-a*(e-o)).toString())):(clearInterval(r),this.dispatchEvent(new CustomEvent("countdown-finished",{bubbles:!0,composed:!0})))},1e3)}}customElements.define("countdown-circle",h);class u extends HTMLElement{constructor(){super();let t=this.attachShadow({mode:"open"}),e=this.getAttribute("type")||"button";t.innerHTML=`
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

            <button type="${e}">
              <slot></slot>
            </button>
            `}}customElements.define("custom-button",u);class m extends HTMLElement{constructor(){super();let t=this.attachShadow({mode:"open"}),e=this.getAttribute("variant")||"paragraph",i="p";switch(e){case"title":i="h1";break;case"subtitle":i="h2";break;case"txt":i="h3";break;default:i="p"}t.innerHTML=`
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

            <${i} class=${e}>
            <slot></slot>
            </${i}>
            `}}customElements.define("game-title",m);class g extends HTMLElement{constructor(){super();let t=this.attachShadow({mode:"open"}),e=this.getAttribute("result")||"draw",i=r[e]||r.draw,s=l[e]||l.draw;t.innerHTML=`
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
                    <img src="${i}" alt="${e}" />
                    <game-title variant="subtitle">${s}</game-title>
                </div>
            `}}customElements.define("result-star",g);class y extends HTMLElement{constructor(){super();let t=this.attachShadow({mode:"open"}),e=this.getAttribute("player-score")||"0",i=this.getAttribute("computer-score")||"0";t.innerHTML=`
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
                    <game-title variant="subtitle">Vos: ${e}</game-title>
                    <game-title variant="subtitle">M\xe1quina: ${i}</game-title>
                </div>
            </div>
            `}}customElements.define("score-board",y);class f extends HTMLElement{constructor(){super(),this.phase="choosing",this.round=1}connectedCallback(){this.render(),this.addEventListener("countdown-finished",()=>{let t=["piedra","papel","tijera"],e=Math.floor(Math.random()*t.length),i=t[e];c.setComputerMove(i),this.phase="showing-plays",this.render(),setTimeout(()=>{let t=c.getState();c.pushToHistory({myPlay:t.currentGame.myPlay,computerPlay:t.currentGame.computerPlay}),this.round<3?(this.round++,this.phase="choosing",this.render()):this.goTo("/result")},2e3)}),this.addEventListener("hand-click",t=>{let e=t.detail.type;for(let t of(c.setMove(e),this.querySelectorAll("hand-option")))t.getAttribute("type")===e?t.classList.add("selected"):t.classList.add("not-selected");this.phase="selected"})}render(){let t=c.getState(),e=t.currentGame?.myPlay,i=t.currentGame?.computerPlay;"showing-plays"===this.phase&&e&&i?this.innerHTML=`
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
                hand-option {
                    width: 103px;
                    height: 235px;
                }
                </style>

                <div class="game-page">
                    <hand-option class="computer-play" type="${i}"></hand-option>
                    <hand-option class="my-play" type="${e}"></hand-option>
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
                countdown-circle{
                    margin-top: 150px;
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
                        <hand-option type="tijera"></hand-option>
                        <hand-option type="piedra"></hand-option>
                        <hand-option type="papel"></hand-option>
                    </div>
                </div>
                `:"selected"===this.phase&&e&&(this.innerHTML=`
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
                        <hand-option class="${"tijera"===e?"selected":"not-selected"}" type="tijera"></hand-option>
                        <hand-option class="${"piedra"===e?"selected":"not-selected"}" type="piedra"></hand-option>
                        <hand-option class="${"papel"===e?"selected":"not-selected"}" type="papel"></hand-option>
                    </div>
                </div>
                `)}}customElements.define("game-page",f);class x extends HTMLElement{constructor(){super()}connectedCallback(){this.render();let t=this.querySelector("custom-button");t?.addEventListener("click",()=>{this.goTo("/game")})}render(){this.innerHTML=`
            <style>
                .instruction-page{
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: space-between;
                    width: 100%;
                    min-height: 100vh;
                    background:
                    radial-gradient(circle at 20% 20%, rgba(0, 144, 72, 0.18), transparent 30%),
                    radial-gradient(circle at 80% 80%, rgba(0, 108, 252, 0.15), transparent 30%),
                    #101010;
                }
                .scc{
                    width: 100%;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 20px;
                    margin-top: 100px;
                }
                game-title{
                text-align: center;
                padding: 20px;
                }
                custom-button{
                padding: 20px;
                }
                .hand-options{
                    display: flex;
                    flex-direction: row;
                    justify-content: space-around;
                    width: 100%;
                }
            </style>

            <div class="instruction-page">
                <div class="scc">
                    <game-title varian="subtitle">Presion\xe1 jugar
                    y eleg\xed: piedra, papel o tijera antes de que pasen los 3 segundos.
                    </game-title>

                    <custom-button>\xa1Jugar!</custom-button>
                </div>

                <div class="hand-options">
                    <hand-option type="tijera"></hand-option>
                    <hand-option type="piedra"></hand-option>
                    <hand-option type="papel"></hand-option>
                </div>
            
            </div>
            `}}customElements.define("instructions-page",x);class b extends HTMLElement{constructor(){super(),this.result="lose"}connectedCallback(){this.render();let t=this.querySelector("custom-button");t?.addEventListener("click",()=>{this.goTo("/game")})}render(){let t=c.getScore(),e=t?.playerScore,i=t?.computerScore,s=c.getResult();this.result=s,"win"===this.result?this.innerHTML=`
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

                        <score-board player-score="${e}" computer-score="${i}"></score-board>

                        <custom-button type="submit">Volver a Jugar</custom-button>
                    
                    </div>

                `:"lose"===this.result&&(this.innerHTML=`
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

                        <score-board player-score="${e}" computer-score="${i}"></score-board>

                        <custom-button type="submit">Volver a Jugar</custom-button>
                    
                    </div>
                `)}}customElements.define("result-page",b);class w extends HTMLElement{constructor(){super()}connectedCallback(){this.render();let t=this.querySelector("custom-button");t?.addEventListener("click",()=>{this.goTo("/instructions")})}render(){this.innerHTML=`
        <style>
            .welcome-page{
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: space-between;
                width: 100%;
                min-height: 100vh;
                background:
                radial-gradient(circle at 20% 20%, rgba(0, 144, 72, 0.18), transparent 30%),
                radial-gradient(circle at 80% 80%, rgba(0, 108, 252, 0.15), transparent 30%),
                #101010;
            }
            .scc{
                width: 100%;
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 50px;
                margin-top: 200px;
            }
            
            .hand-options{
                display: flex;
                flex-direction: row;
                justify-content: space-around;
                width: 100%;
                align-items: flex-end;
            }
            hand-option {
                width: 56px;
                height: 128px;
            }
        </style>

        <div class="welcome-page">

            <div class="scc">
                <game-title variant="title">Piedra, Papel \xf3 Tijera
                </game-title>

                <custom-button>Empezar</custom-button>
            </div>

            <div class="hand-options">
                <hand-option type="tijera"></hand-option>
                <hand-option type="piedra"></hand-option>
                <hand-option type="papel"></hand-option>
            </div>
        </div>
        `}}customElements.define("welcome-page",w),function(t){function e(t){history.pushState({},"",t),i(t)}function i(i){for(let s of d)if(s.path.test(i)){let i=s.component({goTo:e});t.firstChild&&t.firstChild.remove(),t.appendChild(i)}}i(location.pathname),window.onpopstate=()=>{i(location.pathname)}}(document.querySelector("#root"));
//# sourceMappingURL=repaso.25b8499d.js.map
