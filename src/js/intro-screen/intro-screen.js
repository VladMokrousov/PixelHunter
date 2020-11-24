import IntroView from './intro-view.js';
import GreetingScreen from '../greeting-screen/greeting-screen.js';
import changeView from '../change-view.js';

export default class IntroScreen {
  constructor() {
    this.content = new IntroView();

    this.content.onBtnStarPress = () => {
      const greeting = new GreetingScreen();
      changeView(greeting.element);

    };
    this.root = document.createElement(`div`);
    this.root.append(this.content.element);
  }

  get element() {
    return this.root;
  }

}
