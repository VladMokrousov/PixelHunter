import IntroScreen from './intro-screen/intro-screen.js';
import changeView from './change-view.js';
import GameModel from './data/game-model.js';
import GameScreen from './game-screen/game-screen.js';
import StatsScreen from './stats-screen/stats-screen.js';
import {loadGames, loadPastStats, postCurrentStats} from './backend.js';

export default class Application {

  static showIntro() {
    const intro = new IntroScreen();
    changeView(intro.element);
  }


  static showGame(userName) {
    const model = new GameModel(userName);

    loadGames()
      .then((games) => {
        let gameScreen = new GameScreen(games, model);
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
