import {initHandOption} from "./components/hand-option/index";
import {initCountdownCircle} from "./components/countdown-circle/index";
import {initCustomButton} from "./components/custom-button/index";
import {initGameTitle} from "./components/game-title/index";
import {initResultStar} from "./components/result-star/index";
import {initScoreBoard} from "./components/score-board/index";

import {initGamePage} from "./pages/game/index";
import {initInstructionsPage} from "./pages/instructions/index";
import {initResultPage} from "./pages/result/index";
import {initWelcomePage} from "./pages/welcome/index";

import {initRouter} from "./router";

initHandOption();
initCountdownCircle();
initCustomButton();
initGameTitle();
initResultStar();
initScoreBoard();

initGamePage();
initInstructionsPage();
initResultPage();
initWelcomePage();

const container = document.querySelector("#root") as HTMLElement;
initRouter(container);