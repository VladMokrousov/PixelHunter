import GameTwoView from './game-two-view.js';
import HeaderView from '../util-views/header-view';
import ModalConfirmView from '../util-views/modal-confirm-view';
import ProgressBarView from '../util-views/progress-bar-view.js';
import GreetingScreen from '../greeting-screen/greeting-screen.js';
import changeView from '../change-view.js';
import AbstractGameScreen from '../abstract-game-screen.js';

export default class GameTwoScreen extends AbstractGameScreen {
  constructor(games, model) {
    super();
    this.model = model;
    this.wrongAnswers = this.model.state.answers.filter((item) => item == `wrong`);
    this.gamesArr = games;
    this.gameData = games[this.model.state.currentGame];

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

    this.content = new GameTwoView(this.gameData);

    this.content.onInputForPicPress = (evt) => {

      const pictureWithBtn = document.querySelectorAll(`.game__option`);
      const inputForFirstPic = pictureWithBtn[0].querySelectorAll(`[name=question1]`);
      const inputForSecondPic = pictureWithBtn[1].querySelectorAll(`[name=question2]`);

      if (evt.target.getAttribute(`name`) == `question1`) {
        inputForFirstPic.forEach(function (item) {
          item.removeAttribute(`checked`);
          item.classList.add(`marked`);
        });
      } else if (evt.target.getAttribute(`name`) == `question2`) {
        inputForSecondPic.forEach(function (item) {
          item.removeAttribute(`checked`);
          item.classList.add(`marked`);
        });
      }
      evt.target.setAttribute(`checked`, `checked`);

      if (inputForFirstPic[0].classList.contains(`marked`) && inputForSecondPic[0].classList.contains(`marked`)) {
        this._stopTimer();

        const inputChecked = document.querySelectorAll(`[checked=checked]`);
        const userAnswerForGameTwo = [];

        inputChecked.forEach(function (item) {
          let value;
          if (item.getAttribute(`value`) == `paint`) {
            value = `painting`;
          } else {
            value = item.getAttribute(`value`);
          }

          userAnswerForGameTwo.push(value);
        });

        const rightAnswerForGameTwo = [];
        for (let i = 0; i < this.gameData.answers.length; i++) {
          rightAnswerForGameTwo.push(this.gameData.answers[i].type);
        }

        if (userAnswerForGameTwo.join() == rightAnswerForGameTwo.join()) {
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

      }

    };
    this.progressBar = new ProgressBarView(this.model);
    this.root = document.createElement(`div`);
    this.root.append(this.header.element);
    this.root.append(this.content.element);
    this.root.querySelector(`.game`).append(this.progressBar.element);

  }


}
