import AbstractView from './../abstract-class.js';
import imgResize from './../img-resize.js';
import debug from './../debug.js';

export default class GameThreeView extends AbstractView {
  constructor(data) {
    super();
    this.data = data;

  }
  get template() {
    let rightAnswer;
    if (this.data.question == `Найдите фото среди изображений`) {
      rightAnswer = `photo`;
    } else {
      rightAnswer = `painting`;
    }
    const imgFirstSize = {
      'width': this.data.answers[0].image.width,
      'height': this.data.answers[0].image.height
    };
    const imgSecondSize = {
      'width': this.data.answers[1].image.width,
      'height': this.data.answers[1].image.height
    };
    const imgThirdSize = {
      'width': this.data.answers[2].image.width,
      'height': this.data.answers[2].image.height
    };
    const containerSize = {
      'width': 304,
      'height': 455
    };
    return `

    <section class="game">
    <p class="game__task">${this.data.question}</p>
    <form class="game__content  game__content--triple">
      <div class="game__option" ${debug.isCorrect(this.data.answers[0].type == rightAnswer)}>
        <img src=${this.data.answers[0].image.url} alt="Option 1" width="${imgResize(containerSize, imgFirstSize).width}" height="${imgResize(containerSize, imgFirstSize).height}">
      </div>
      <div class="game__option  game__option--selected" ${debug.isCorrect(this.data.answers[1].type == rightAnswer)}>
        <img src=${this.data.answers[1].image.url} alt="Option 2" width="${imgResize(containerSize, imgSecondSize).width}" height="${imgResize(containerSize, imgSecondSize).height}">
      </div>
      <div class="game__option" ${debug.isCorrect(this.data.answers[2].type == rightAnswer)}>
        <img src=${this.data.answers[2].image.url} alt="Option 3" width="${imgResize(containerSize, imgThirdSize).width}" height="${imgResize(containerSize, imgThirdSize).height}">
      </div>
    </form>

    </section>
    `;


  }
  bind(element) {

    const gameOptions = element.querySelectorAll(`.game__option`);

    gameOptions.forEach((item) => {
      item.addEventListener(`click`, this.onGameOptionsPress);
    });


  }
  onGameOptionsPress(evt) {


  }


}
