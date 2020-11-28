import IntroScreen from './intro-screen/intro-screen.js';
import changeView from './change-view.js';
import GameModel from './data/game-model.js';
import GameTwoScreen from './game-two-screen/game-two-screen.js';
import GameOneScreen from './game-one-screen/game-one-screen.js';
import GameThreeScreen from './game-three-screen/game-three-screen.js';
import StatsScreen from './stats-screen/stats-screen.js';
import {loadGames, loadPastStats, postCurrentStats} from './backend.js';

export default class Application {

  static showIntro() {

    const intro = new IntroScreen();
    changeView(intro.element);
  }


  static showGame(userName) {
    const model = new GameModel(userName);
    const gameIndex = model.state.currentGame;

    loadGames()
      .then((games) => {

        let gameScreen;
        if (games[gameIndex].type == `two-of-two`) {
          gameScreen = new GameTwoScreen(games, model);

        } else if (games[gameIndex].type == `tinder-like`) {
          gameScreen = new GameOneScreen(games, model);
        } else if (games[gameIndex].type == `one-of-three`) {
          gameScreen = new GameThreeScreen(games, model);

        }
        changeView(gameScreen.element);
        gameScreen.startGame();

      });


  }

  static showStats(model) {
    // Здесь нужно получить статистику, записанную на сервер
    loadPastStats()
      .then((data) => console.log(data));
    const statsScreen = new StatsScreen(model);
    changeView(statsScreen.element);
    // Здесь нужно отправить статистику на сервер
    postCurrentStats(model);
  }

}
