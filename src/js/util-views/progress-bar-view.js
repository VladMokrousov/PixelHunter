import AbstractView from './../abstract-view.js';


export default class ProgressBarView extends AbstractView {
  constructor(model) {
    super();
    this.model = model;

  }
  get _template() {

    return `<ul class="stats">
      <li class="stats__result stats__result--${this.model.answers[0] ? this.model.answers[0] : `unknown`}"></li>
      <li class="stats__result stats__result--${this.model.answers[1] ? this.model.answers[1] : `unknown`}"></li>
      <li class="stats__result stats__result--${this.model.answers[2] ? this.model.answers[2] : `unknown`}"></li>
      <li class="stats__result stats__result--${this.model.answers[3] ? this.model.answers[3] : `unknown`}"></li>
      <li class="stats__result stats__result--${this.model.answers[4] ? this.model.answers[4] : `unknown`}"></li>
      <li class="stats__result stats__result--${this.model.answers[5] ? this.model.answers[5] : `unknown`}"></li>
      <li class="stats__result stats__result--${this.model.answers[6] ? this.model.answers[6] : `unknown`}"></li>
      <li class="stats__result stats__result--${this.model.answers[7] ? this.model.answers[7] : `unknown`}"></li>
      <li class="stats__result stats__result--${this.model.answers[8] ? this.model.answers[8] : `unknown`}"></li>
      <li class="stats__result stats__result--${this.model.answers[9] ? this.model.answers[9] : `unknown`}"></li>
    </ul>`;


  }


}
