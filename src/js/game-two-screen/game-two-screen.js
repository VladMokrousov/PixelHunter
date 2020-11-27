import GameTwoView from './game-two-view.js';
import gameRouter from '../game-router.js';
import HeaderView from '../util-views/header-view';
import ProgressBarView from '../util-views/progress-bar-view.js';
import GreetingScreen from '../greeting-screen/greeting-screen.js';
import changeView from '../change-view.js';
import Application from '../application.js';

export default class GameTwoScreen {
  constructor(games, model) {

    this.model = model;
    this.wrongAnswers = this.model.state.answers.filter((item) => item == `wrong`);
    this.gamesArr = games;
    this.gameData = games[this.model.state.currentGame];

    this.header = new HeaderView(`headerLong`, this.model);
    this.header.onBtnBackPress = () => {
      const greeting = new GreetingScreen();
      changeView(greeting.element);
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

  get element() {
    return this.root;
  }

  startGame() {
    this._timer = setTimeout(() => this._tick(), 1000);
  }

  _tick() {
    this.model.tick();

    this._updateHeader();
    if (this.model.state.responseTime <= 5) {
      this._timerFlash = setTimeout(() => this._hide(), 500);
    }

    this._timer = setTimeout(() => this._tick(), 1000);

    this._isTimeOut();
  }

  _hide() {
    let gameTimerElement = document.querySelector(`.game__timer`);
    gameTimerElement.classList.add(`visually-hidden`);
  }

  _updateHeader() {
    const header = new HeaderView(`headerLong`, this.model);
    header.onBtnBackPress = this.header.onBtnBackPress;
    this.root.replaceChild(header.element, this.header.element);
    this.header = header;
  }

  _stopTimer() {
    clearTimeout(this._timer);
    clearTimeout(this._timerFlash);

  }

  _isTimeOut() {
    if (this.model.state.responseTime == 0) {

      this._stopTimer();
      this.model.addAnswer(`wrong`);
      this.model.minusLive();
      this._isGameOver();

    }
  }
  _isGameOver() {
    this.wrongAnswers = this.model.state.answers.filter((item) => item == `wrong`);

    if (this.wrongAnswers.length > 3 || this.model.currentGame == this.gamesArr.length - 1) {
      Application.showStats(this.model);
    } else {
      this._nextGame();
    }
  }

  _nextGame() {
    this.model.nextGame();

    this.model.resetTimer();
    this.gameData = this.gamesArr[this.model.state.currentGame];
    gameRouter(this.gameData, this.gamesArr, this.model);
  }


}
