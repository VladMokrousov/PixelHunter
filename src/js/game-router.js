import GameTwoScreen from './game-two-screen/game-two-screen.js';
import GameOneScreen from './game-one-screen/game-one-screen.js';
import GameThreeScreen from './game-three-screen/game-three-screen.js';
import changeView from './change-view.js';

export default function (game, gameArr, model) {
  let gameScreen;
  if (game.type == `two-of-two`) {
    gameScreen = new GameTwoScreen(gameArr, model);
  } else if (game.type == `tinder-like`) {
    gameScreen = new GameOneScreen(gameArr, model);
  } else if (game.type == `one-of-three`) {
    gameScreen = new GameThreeScreen(gameArr, model);
  }

  changeView(gameScreen.element);
  gameScreen.startGame();
}
