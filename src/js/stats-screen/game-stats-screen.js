import GameStatsView from './game-stats-view.js';
import HeaderView from '../util-views/header-view';
import GreetingScreen from '../greeting-screen/greeting-screen.js';
import changeView from '../change-view.js';

export default class GameStatsScreen {
  constructor(model) {
    this.header = new HeaderView(`headerShort`);
    this.header.onBtnBackPress = () => {
      const greeting = new GreetingScreen();
      changeView(greeting.element);
    };

    this.content = new GameStatsView(model);

    this.root = document.createElement(`div`);
    this.root.append(this.header.element);
    this.root.append(this.content.element);

  }
  get element() {
    return this.root;
  }


}
