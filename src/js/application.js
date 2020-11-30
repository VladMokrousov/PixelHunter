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

  static async showGame(userName) {
    const model = new GameModel(userName);
    try {
      const games = await loadGames();
      let gameScreen = new GameScreen(games, model);
      changeView(gameScreen.element);
      gameScreen.startGame();
    }
    catch(err) {
      console.log('Что-то пошло не так');
    }
  }

  static async showStats(model) {
    // Здесь нужно получить статистику, записанную на сервер
    try {
      const dataPreviousStats = await loadPastStats();
      if (dataPreviousStats) {
        console.log(dataPreviousStats)
      } else {
        throw new Error('Не удалось загрузить статистику предыдущих игр');
      }
    }
    catch(err) {
      console.log(err.message);
    }
  
    const statsScreen = new StatsScreen(model);
    changeView(statsScreen.element);

    // Здесь нужно отправить статистику на сервер
    postCurrentStats(model);
  }

}
