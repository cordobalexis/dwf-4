import {initHandOption} from "./components/hand-option/index";
import {initCountdownCircle} from "./components/countdown-circle/index";
import {initCustomButton} from "./components/custom-button/index";
import {initGameTitle} from "./components/game-title/index";
import {initResultStar} from "./components/result-star/index";
import {initScoreBoard} from "./components/score-board/index";
import {initCustomInput} from "./components/custom-input/index";

import {initGamePage} from "./pages/game/index";
import {initInstructionsPage} from "./pages/instructions/index";
import {initResultPage} from "./pages/result/index";
import {initWelcomePage} from "./pages/welcome/index";
import {initRoomPage} from "./pages/room-page/index";
import {initUserNamePage} from "./pages/user-name/index";
import {initWaitingPage} from "./pages/waiting-page/index";
import {initCodePage} from "./pages/code-page";

import {initRouter} from "./router";

initHandOption();
initCountdownCircle();
initCustomButton();
initGameTitle();
initResultStar();
initScoreBoard();
initCustomInput();

initGamePage();
initInstructionsPage();
initResultPage();
initWelcomePage();
initRoomPage();
initUserNamePage();
initWaitingPage();
initCodePage();

const container = document.querySelector("#root") as HTMLElement;
initRouter(container);