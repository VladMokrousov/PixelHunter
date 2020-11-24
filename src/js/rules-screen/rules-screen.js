import GreetingScreen from '../greeting-screen/greeting-screen.js';
import RulesView from './rules-view.js';
import HeaderView from '../util-views/header-view';
import changeView from '../change-view.js';
import Application from '../application.js';

export default class RulesScreen {
  constructor() {
    this.header = new HeaderView(`headerShort`);
    this.header.onBtnBackPress = () => {
      const greeting = new GreetingScreen();
      changeView(greeting.element);
    };
    this.content = new RulesView();

    this.content.onNameInputChange = () => {
      const submitBtn = document.querySelector(`.rules__button`);
      const nameInput = document.querySelector(`.rules__input`);

      if (nameInput.value != ``) {
        submitBtn.removeAttribute(`disabled`);
      } else {
        submitBtn.setAttribute(`disabled`, `disabled`);
      }
    };
    this.content.onsubmitBtnPress = (evt) => {
      evt.preventDefault();

      Application.showGame(document.querySelector(`.rules__input`).value);

    };

    this.root = document.createElement(`div`);
    this.root.append(this.header.element);
    this.root.append(this.content.element);
  }

  get element() {
    return this.root;
  }
}
