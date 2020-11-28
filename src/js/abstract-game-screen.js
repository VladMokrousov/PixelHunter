import gameRouter from './game-router.js';
import HeaderView from './util-views/header-view';
import Application from './application.js';

export default class AbstractGameScreen {

  constructor() {
    if (new.target === AbstractGameScreen) {
      throw new Error(`Can't instantiate AbstractGameScreen, only concrete one`);
    }
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
