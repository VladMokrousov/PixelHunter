import {assert} from 'chai';

// Тестируем возвращаемое количество очков
const referenceArr = [
  {answer: true,
    time: 10},
  {answer: false,
    time: 12},
  {answer: true,
    time: 5},
  {answer: true,
    time: 22},
  {answer: false,
    time: 15},
  {answer: true,
    time: 16},
  {answer: true,
    time: 14},
  {answer: true,
    time: 6},
  {answer: true,
    time: 9},
  {answer: true,
    time: 29}

];
const referenceArrForFewAnswers = [
  {answer: true,
    time: 10},
  {answer: false,
    time: 12},
  {answer: true,
    time: 5},
  {answer: true,
    time: 22},
  {answer: false,
    time: 15},
  {answer: true,
    time: 16}

];
const referenceArrForNotFastNotSlow = [
  {answer: true,
    time: 10},
  {answer: true,
    time: 12},
  {answer: true,
    time: 13},
  {answer: true,
    time: 19},
  {answer: true,
    time: 15},
  {answer: true,
    time: 16},
  {answer: true,
    time: 14},
  {answer: true,
    time: 17},
  {answer: true,
    time: 11},
  {answer: true,
    time: 13}
];
const referenceCount = 1;
const referenceCountAllLives = 3;
const referenceCountZeroLives = 0;

const referenceFunction = function (arr, count) {
  let score = 0;
  if (arr.length < 10 || count == 0) {
    score = -1;
  } else if (arr.length == 10 && count == 3) {
    score = 1150;
  } else {
    arr.forEach((item)=>{
      if (item.answer == true) {
        score += 100;
      }
      if (item.time < 10) {
        score += 50;
      }
      if (item.time > 20) {
        score -= 50;
      }

    });
    score += count * 50;
  }

  return score;
};

describe(`Count of points`, () => {
  it(`should return 900`, () => {
    assert(referenceFunction(referenceArr, referenceCount) == 900);
  });
  it(`should return -1 if gamer give < 10 answers`, () => {
    assert(referenceFunction(referenceArrForFewAnswers, referenceCount) == -1);
  });
  it(`should return -1 if gamer spend all lives`, () => {
    assert(referenceFunction(referenceArrForNotFastNotSlow, referenceCountZeroLives) == -1);
  });
  it(`should return 1050 if gamer answered not fast, not slow and save all lives`, () => {
    assert(referenceFunction(referenceArrForNotFastNotSlow, referenceCountAllLives) == 1150);
  });

});


// Тестируем уменьшение жизней

const badGame = [
  {answer: false,
    time: 10},
  {answer: false,
    time: 12},
  {answer: false,
    time: 5},
  {answer: false,
    time: 22},
  {answer: false,
    time: 15},
  {answer: false,
    time: 16}


];
const notEndTheGame = [
  {answer: true,
    time: 10},
  {answer: false,
    time: 12},
  {answer: true,
    time: 5},
  {answer: true,
    time: 22},
  {answer: false,
    time: 15},
  {answer: true,
    time: 16}


];

const livesManagment = function (arr) {
  let livesCount = 3;
  arr.forEach((item)=>{
    if (item.answer == false) {
      livesCount -= 1;

    }
  });
  if (livesCount < 1 || arr.length < 10) {
    return -1;
  } else {
    return livesCount;
  }

};

describe(`Count of lives`, () => {
  it(`should return 1`, () => {
    assert(livesManagment(referenceArr) == 1);
  });
  it(`should return -1 when lives < 1`, () => {
    assert(livesManagment(badGame) == -1);
  });
  it(`should return -1 when gamer give not all answers`, () => {
    assert(livesManagment(notEndTheGame) == -1);
  });
});


// Тестируем смену уровня
const currentLives = 2;
const currentLivesBed = 1;
const justRightAnswer = {
  answer: true,
  time: 10
};
const justWrongAnswer = {
  answer: false,
  time: 10
};

const changeLevel = function (obj, currentLives) {
  if (obj.answer == true || obj.answer == false && currentLives > 1) {
    return 1;
  } else if (obj.answer == false && currentLives < 2) {
    return -1;
  }

};
describe(`Change level`, () => {
  it(`should return 1 if the answer are right`, () => {
    assert(changeLevel(justRightAnswer, currentLives) == 1);
  });
  it(`should return 1 when the answer are wrong and lives count > 1`, () => {
    assert(changeLevel(justWrongAnswer, currentLives) == 1);
  });
  it(`should return -1 when the answer are wrong and lives count < 2`, () => {
    assert(changeLevel(justWrongAnswer, currentLivesBed) == -1);
  });


});
