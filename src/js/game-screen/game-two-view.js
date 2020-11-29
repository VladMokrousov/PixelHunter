import AbstractView from './../abstract-view.js';
import imgResize from './../img-resize.js';
import debug from './../debug.js';

export default class GameTwoView extends AbstractView {
  constructor(data) {
    super();
    this.data = data;


  }
  get _template() {
    const imgFirstSize = {
      'width': this.data.answers[0].image.width,
      'height': this.data.answers[0].image.height
    };
    const imgSecondSize = {
      'width': this.data.answers[1].image.width,
      'height': this.data.answers[1].image.height
    };

    const containerSize = {
      'width': 468,
      'height': 458
    };
    return `

      <section class="game">
        <p class="game__task">${this.data.question}</p>
        <form class="game__content">
          <div class="game__option">
            <img src=${this.data.answers[0].image.url} alt="Option 1" width="${imgResize(containerSize, imgFirstSize).width}" height="${imgResize(containerSize, imgFirstSize).height}">
            <label class="game__answer game__answer--photo">
              <input class="visually-hidden" name="question1" type="radio" value="photo">
              <span ${debug.isPhoto(this.data.answers[0].type)}>Фото</span>
            </label>
            <label class="game__answer game__answer--paint">
              <input class="visually-hidden" name="question1" type="radio" value="paint">
              <span ${debug.isPaint(this.data.answers[0].type)}>Рисунок</span>
            </label>
          </div>
          <div class="game__option">
            <img src=${this.data.answers[1].image.url} alt="Option 2" width="${imgResize(containerSize, imgSecondSize).width}" height="${imgResize(containerSize, imgSecondSize).height}">
            <label class="game__answer  game__answer--photo">
              <input class="visually-hidden" name="question2" type="radio" value="photo">
              <span ${debug.isPhoto(this.data.answers[1].type)}>Фото</span>
            </label>
            <label class="game__answer  game__answer--paint">
              <input class="visually-hidden" name="question2" type="radio" value="paint">
              <span ${debug.isPaint(this.data.answers[1].type)}>Рисунок</span>
            </label>
          </div>
        </form>
      
      </section>
    `;


  }
  _bind(element) {


    const inputForPic = element.querySelectorAll(`[type=radio]`);

    inputForPic.forEach((item) => {
      item.addEventListener(`click`, this.onInputForPicPress);
    });


  }
  onInputForPicPress(evt) {


  }


}
