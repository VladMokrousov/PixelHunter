import AbstractView from './../abstract-class.js';
import imgResize from './../img-resize.js';
import debug from './../debug.js';

export default class GameOneView extends AbstractView {
  constructor(data) {
    super();
    this.data = data;

  }
  get template() {
    const imgSize = {
      'width': this.data.answers[0].image.width,
      'height': this.data.answers[0].image.height
    };

    const containerSize = {
      'width': 705,
      'height': 455
    };
    return `

    <section class="game">
    <p class="game__task">${this.data.question}</p>
    <form class="game__content  game__content--wide">
      <div class="game__option">
        <img src=${this.data.answers[0].image.url} alt="Option 1" width="${imgResize(containerSize, imgSize).width}" height="${imgResize(containerSize, imgSize).height}">
        <label class="game__answer  game__answer--photo">
          <input class="visually-hidden" name="question1" type="radio" value="photo">
          <span ${debug.isPhoto(this.data.answers[0].type)}>Фото</span>
        </label>
        <label class="game__answer  game__answer--paint">
          <input class="visually-hidden" name="question1" type="radio" value="paint">
          <span ${debug.isPaint(this.data.answers[0].type)}>Рисунок</span>
        </label>
      </div>
    </form>

    </section>
    `;


  }
  bind(element) {
    const inputForPic = element.querySelectorAll(`[name=question1]`);
    inputForPic.forEach((item) => {
      item.addEventListener(`click`, this.onInputForPicPress);
    });
  }
  onInputForPicPress(evt) {


  }


}
