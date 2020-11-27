import AbstractView from './../abstract-view.js';


export default class StatsView extends AbstractView {
  constructor(model) {
    super();
    this.model = model;

  }
  get _template() {
    const wrongAnswer = this.model.answers.filter((item) => item == `wrong`);
    const correctAnswer = this.model.answers.filter((item) => item == `correct`);
    const fastAnswer = this.model.answers.filter((item) => item == `fast`);
    const slowAnswer = this.model.answers.filter((item) => item == `slow`);

    const standartModifier = 100;
    const standartModifierForSpeed = 50;
    const standartModifierForLives = 50;
    const standartModifierForSlow = -50;
    const answerPoints = (correctAnswer.length + fastAnswer.length + slowAnswer.length) * standartModifier;
    const pointsForSpeed = fastAnswer.length * standartModifierForSpeed;
    const pointsForLives = this.model.lives * standartModifierForLives;
    const penaltyForSlow = slowAnswer.length * standartModifierForSlow;
    const totalPoints = answerPoints + pointsForSpeed + pointsForLives + penaltyForSlow;
    const dataForStats = this.model.state.dataForStats;


    return `

    <section class="result">
    <h2 class="result__title">${wrongAnswer.length > 3 ? dataForStats.title[1] : dataForStats.title[0]}</h2>
    <table class="result__table">
      <tr>
        <td class="result__number">1.</td>
        <td colspan="2">
          <ul class="stats">
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
          </ul>
        </td>
        <td class="result__points" ${wrongAnswer.length > 3 ? `style="display: none;"` : ``}>x 100</td>
        <td class="result__total">${wrongAnswer.length > 3 ? `` : answerPoints}</td>
        <td class="result__total  result__total--final" ${wrongAnswer.length > 3 ? `` : `style="display: none;"`}>fail</td>
      </tr>
      <tr ${wrongAnswer.length > 3 ? `style="display: none;"` : ``}>
        <td></td>
        <td class="result__extra">Бонус за скорость:</td>
        <td class="result__extra">${fastAnswer.length}<span class="stats__result stats__result--fast"></span></td>
        <td class="result__points">x 50</td>
        <td class="result__total">${pointsForSpeed}</td>
      </tr>
      <tr ${wrongAnswer.length > 3 ? `style="display: none;"` : ``}>
        <td></td>
        <td class="result__extra">Бонус за жизни:</td>
        <td class="result__extra">${this.model.lives}<span class="stats__result stats__result--alive"></span></td>
        <td class="result__points">x 50</td>
        <td class="result__total">${pointsForLives}</td>
      </tr>
      <tr ${wrongAnswer.length > 3 ? `style="display: none;"` : ``}>
        <td></td>
        <td class="result__extra">Штраф за медлительность:</td>
        <td class="result__extra">${slowAnswer.length}<span class="stats__result stats__result--slow"></span></td>
        <td class="result__points">x 50</td>
        <td class="result__total">${penaltyForSlow}</td>
      </tr>
      <tr ${wrongAnswer.length > 3 ? `style="display: none;"` : ``}>
        <td colspan="5" class="result__total  result__total--final">${totalPoints}</td>
      </tr>
    </table>
    <table class="result__table">
      <tr>
        <td class="result__number">2.</td>
        <td>
          <ul class="stats">
            <li class="stats__result stats__result--${dataForStats.mockDataForStats.secondGameAnswers[0]}"></li>
            <li class="stats__result stats__result--${dataForStats.mockDataForStats.secondGameAnswers[1]}"></li>
            <li class="stats__result stats__result--${dataForStats.mockDataForStats.secondGameAnswers[2]}"></li>
            <li class="stats__result stats__result--${dataForStats.mockDataForStats.secondGameAnswers[3]}"></li>
            <li class="stats__result stats__result--${dataForStats.mockDataForStats.secondGameAnswers[4]}"></li>
            <li class="stats__result stats__result--${dataForStats.mockDataForStats.secondGameAnswers[5]}"></li>
            <li class="stats__result stats__result--${dataForStats.mockDataForStats.secondGameAnswers[6]}"></li>
            <li class="stats__result stats__result--${dataForStats.mockDataForStats.secondGameAnswers[7]}"></li>
            <li class="stats__result stats__result--${dataForStats.mockDataForStats.secondGameAnswers[8]}"></li>
            <li class="stats__result stats__result--${dataForStats.mockDataForStats.secondGameAnswers[9]}"></li>
          </ul>
        </td>
        <td class="result__total"></td>
        <td class="result__total  result__total--final">${dataForStats.mockDataForStats.secondGamePoints.totalPoints}</td>
      </tr>
    </table>
    <table class="result__table">
      <tr>
        <td class="result__number">3.</td>
        <td colspan="2">
          <ul class="stats">
            <li class="stats__result stats__result--${dataForStats.mockDataForStats.thirdGameAnswers[0]}"></li>
            <li class="stats__result stats__result--${dataForStats.mockDataForStats.thirdGameAnswers[1]}"></li>
            <li class="stats__result stats__result--${dataForStats.mockDataForStats.thirdGameAnswers[2]}"></li>
            <li class="stats__result stats__result--${dataForStats.mockDataForStats.thirdGameAnswers[3]}"></li>
            <li class="stats__result stats__result--${dataForStats.mockDataForStats.thirdGameAnswers[4]}"></li>
            <li class="stats__result stats__result--${dataForStats.mockDataForStats.thirdGameAnswers[5]}"></li>
            <li class="stats__result stats__result--${dataForStats.mockDataForStats.thirdGameAnswers[6]}"></li>
            <li class="stats__result stats__result--${dataForStats.mockDataForStats.thirdGameAnswers[7]}"></li>
            <li class="stats__result stats__result--${dataForStats.mockDataForStats.thirdGameAnswers[8]}"></li>
            <li class="stats__result stats__result--${dataForStats.mockDataForStats.thirdGameAnswers[9]}"></li>
          </ul>
        </td>
        <td class="result__points">${dataForStats.mockDataForStats.thirdGamePoints.standartModifier}</td>
        <td class="result__total">${dataForStats.mockDataForStats.thirdGamePoints.points}</td>
      </tr>
      <tr>
        <td></td>
        <td class="result__extra">Бонус за жизни:</td>
        <td class="result__extra">${dataForStats.mockDataForStats.thirdGamePoints.livesBonusCount}<span class="stats__result stats__result--alive"></span></td>
        <td class="result__points">${dataForStats.mockDataForStats.thirdGamePoints.standartModifierForLives}</td>
        <td class="result__total">${dataForStats.mockDataForStats.thirdGamePoints.pointsForLives}</td>
      </tr>
      <tr>
        <td colspan="5" class="result__total  result__total--final">${dataForStats.mockDataForStats.thirdGamePoints.totalPoints}</td>
      </tr>
    </table>
    </section>
    `;


  }


}
