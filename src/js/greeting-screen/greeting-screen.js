import GreetingView from './greeting-view.js';
import RulesScreen from '../rules-screen/rules-screen.js';
import changeView from './../change-view.js';


export default class GreetingScreen {
  constructor() {
    this.content = new GreetingView();

    this.content.onBtnGreetingContinuePress = () => {
      const rules = new RulesScreen();
      changeView(rules.element);
    };
    this.root = document.createElement(`div`);
    this.root.append(this.content.element);
  }
  get element() {
    return this.root;
  }

}
