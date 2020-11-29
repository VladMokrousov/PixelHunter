import GameOneView from './game-one-view.js';
import GameTwoView from './game-two-view.js';
import GameThreeView from './game-three-view.js';
import HeaderView from '../util-views/header-view';
import ModalConfirmView from '../util-views/modal-confirm-view';
import ProgressBarView from '../util-views/progress-bar-view.js';
import GreetingScreen from '../greeting-screen/greeting-screen.js';
import changeView from '../change-view.js';
import Application from '../application.js';

export default class GameScreen {
  constructor(games, model) {
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

    if (this.gameData.type == `tinder-like`) {
      this.content = new GameOneView(this.gameData);

      this.content.onInputForPicPress = (evt) => {
        this._stopTimer();

        let userAnswerForGameOne;
        if (evt.target.getAttribute(`value`) == `paint`) {
          userAnswerForGameOne = `painting`;
        } else {
          userAnswerForGameOne = evt.target.getAttribute(`value`);
        }
        const rightAnswerForGameOne = this.gameData.answers[0].type;

        this._responseHandler(userAnswerForGameOne, rightAnswerForGameOne);
      };
    } else if (this.gameData.type == `two-of-two`) {
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
          const userAnswersArrForGameTwo = [];
          inputChecked.forEach(function (item) {
            let value;
            if (item.getAttribute(`value`) == `paint`) {
              value = `painting`;
            } else {
              value = item.getAttribute(`value`);
            }
            userAnswersArrForGameTwo.push(value);
          });

          const rightAnswersArrForGameTwo = [];
          for (let i = 0; i < this.gameData.answers.length; i++) {
            rightAnswersArrForGameTwo.push(this.gameData.answers[i].type);
          }

          this._responseHandler(userAnswersArrForGameTwo.join(), rightAnswersArrForGameTwo.join());
        }
      };
    } else if (this.gameData.type == `one-of-three`) {
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

        this._responseHandler(userAnswerForGameThree, rightAnswerForGameThree);
      };
    }

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

  _responseHandler(userAnswer, rightAnswer) {
    if (userAnswer == rightAnswer) {
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
    let gameScreen = new GameScreen(this.gamesArr, this.model);
    changeView(gameScreen.element);
    gameScreen.startGame();
  }
}
