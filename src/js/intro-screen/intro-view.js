import AbstractView from './../abstract-class.js';

export default class IntroView extends AbstractView {
  constructor() {
    super();
  }
  get template() {
    return `<section class="intro">
      <button class="intro__asterisk asterisk" type="button"><span class="visually-hidden">Продолжить</span>*</button>
      <p class="intro__motto"><sup>*</sup> Это не фото. Это рисунок маслом нидерландского художника-фотореалиста Tjalf Sparnaay.</p>
      </section>`;

  }
  bind(element) {
    const btnStar = element.querySelector(`.intro__asterisk`);
    btnStar.addEventListener(`click`, this.onBtnStarPress);
  }
  onBtnStarPress() {

  }

}
