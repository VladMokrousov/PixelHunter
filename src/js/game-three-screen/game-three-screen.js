import GameThreeView from './game-three-view.js';
import HeaderView from '../util-views/header-view';
import ModalConfirmView from '../util-views/modal-confirm-view';
import ProgressBarView from '../util-views/progress-bar-view.js';
import GreetingScreen from '../greeting-screen/greeting-screen.js';
import changeView from '../change-view.js';
import AbstractGameScreen from '../abstract-game-screen.js';

export default class GameThreeScreen extends AbstractGameScreen {
  constructor(games, model) {
    super();
    this.model = model;
    this.wrongAnswers = this.model.state.answers.filter((item) => item == `wrong`);
    this.gameData = games[this.model.state.currentGame];
    this.gamesArr = games;

    this.header = new HeaderView(`headerLong`, this.model);
    this.modalConfirm = new ModalConfirmView();

    this.header.onBtnBackPress = () => {

      this.modalConfirm.onBtnClosePress = (evt) => {
        evt.preventDefault();
        this.modalConfirm.element.remove();
      };
      this.modalConfirm.onBtnConfirmPress = (evt) => {
        evt.preventDefault();
        this._stopTimer();
        this.model.restart();
        const greeting = new GreetingScreen();
        changeView(greeting.element);
      };

      this.root.append(this.modalConfirm.element);

    };

    this.content = new GameThreeView(this.gameData);
    this.content.onGameOptionsPress = (evt) => {
      this._stopTimer();
      const gameOptions = document.querySelectorAll(`.game__option`);

      gameOptions.forEach(function (item) {
        item.classList.remove(`game__option--selected`);
      });
      evt.target.classList.add(`game__option--selected`);


      const gameOptionsArr = [...gameOptions];
      const userAnswerIndexForGameThree = gameOptionsArr.indexOf(evt.currentTarget, 0);
      const userAnswerForGameThree = this.gameData.answers[userAnswerIndexForGameThree].type;

      let rightAnswerForGameThree;
      if (this.gameData.question == `Найдите фото среди изображений`) {
        rightAnswerForGameThree = `photo`;
      } else {
        rightAnswerForGameThree = `painting`;
      }


      if (userAnswerForGameThree == rightAnswerForGameThree) {
        const REMAINS_TIME_FOR_FAST_ANSWER = 21;
        const REMAINS_TIME_FOR_SLOW_ANSWER = 9;

        if (this.model.state.responseTime >= REMAINS_TIME_FOR_FAST_ANSWER) {
          this.model.addAnswer(`fast`);
        } else if (this.model.state.responseTime <= REMAINS_TIME_FOR_SLOW_ANSWER) {
          this.model.addAnswer(`slow`);
        } else {
          this.model.addAnswer(`correct`);
        }


      } else {
        this.model.addAnswer(`wrong`);
        this.model.minusLive();

      }


      this._isGameOver();

    };

    this.progressBar = new ProgressBarView(this.model);
    this.root = document.createElement(`div`);
    this.root.append(this.header.element);
    this.root.append(this.content.element);
    this.root.querySelector(`.game`).append(this.progressBar.element);
  }


}
