import StatsView from './stats-view.js';
import HeaderView from '../util-views/header-view';
import ModalConfirmView from '../util-views/modal-confirm-view';
import GreetingScreen from '../greeting-screen/greeting-screen.js';
import changeView from '../change-view.js';

export default class StatsScreen {
  constructor(model) {
    this.model = model;
    this.header = new HeaderView(`headerShort`);
    this.modalConfirm = new ModalConfirmView();

    this.header.onBtnBackPress = () => {

      this.modalConfirm.onBtnClosePress = (evt) => {
        evt.preventDefault();
        this.modalConfirm.element.remove();
      };
      this.modalConfirm.onBtnConfirmPress = (evt) => {
        evt.preventDefault();
        this.model.restart();
        const greeting = new GreetingScreen();
        changeView(greeting.element);
      };

      this.root.append(this.modalConfirm.element);

    };

    this.content = new StatsView(this.model);

    this.root = document.createElement(`div`);
    this.root.append(this.header.element);
    this.root.append(this.content.element);

  }
  get element() {
    return this.root;
  }


}
