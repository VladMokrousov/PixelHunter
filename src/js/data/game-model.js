import INITIAL_STATE from './initialState.js';


export default class GameModel {
  constructor(userName) {
    this._state = JSON.parse(JSON.stringify(INITIAL_STATE));
    this._state.user = userName;
  }

  get state() {
    return this._state;
  }

  get lives() {
    return this._state.lives;
  }

  get answers() {
    return this._state.answers;
  }

  get currentGame() {
    return this._state.currentGame;
  }


  restart() {
    // Продумать
    // INITIAL_STATE.answers = [];

    this._state = JSON.parse(JSON.stringify(INITIAL_STATE));
  }

  addAnswer(answer) {
    this._state.answers.push(answer);
  }

  minusLive() {

    if (this._state.lives != 0) {
      this._state.lives--;
    } else {
      this._state.isGameOver = true;
    }
  }
  nextGame() {
    this._state.currentGame++;

  }
  tick() {
    this._state.responseTime--;
  }
  resetTimer() {
    this._state.responseTime = 30;
  }


}
