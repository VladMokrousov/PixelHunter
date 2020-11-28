import AbstractView from './../abstract-view.js';


export default class ModalConfirmView extends AbstractView {
  constructor() {
    super();

  }
  get _template() {

    return `<section class="modal">
    <form class="modal__inner">
      <button class="modal__close" type="button">
        <span class="visually-hidden">Закрыть</span>
      </button>
      <h2 class="modal__title">Подтверждение</h2>
      <p class="modal__text">Вы уверены что хотите начать игру заново?</p>
      <div class="modal__button-wrapper">
        <button class="modal__btn">Ок</button>
        <button class="modal__btn">Отмена</button>
      </div>
    </form>
  </section>`;
  }

  _bind(element) {
    const btnClose = element.querySelector(`.modal__close`);
    const btnConfirm = element.querySelectorAll(`.modal__btn`)[0];
    const btnCancel = element.querySelectorAll(`.modal__btn`)[1];

    btnClose.addEventListener(`click`, this.onBtnClosePress);
    btnConfirm.addEventListener(`click`, this.onBtnConfirmPress);
    btnCancel.addEventListener(`click`, this.onBtnClosePress);
  }

  onBtnClosePress(evt) {

  }

  onBtnConfirmPress(evt) {

  }


}
