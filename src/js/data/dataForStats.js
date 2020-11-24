
const mockDataForStats = {

  secondGameAnswers: [`wrong`, `slow`, `fast`, `correct`, `wrong`, `unknown`, `slow`, `wrong`, `fast`, `wrong`],
  secondGamePoints: {
    totalPoints: `fail`
  },
  thirdGameAnswers: [`wrong`, `slow`, `fast`, `correct`, `wrong`, `unknown`, `slow`, `unknown`, `fast`, `unknown`],
  thirdGamePoints: {
    standartModifier: `x 100`,
    points: 900,

    standartModifierForLives: `x 50`,
    livesBonusCount: 2,
    pointsForLives: 100,

    totalPoints: 950
  },
};
export default {
  title: [`Победа!`, `Поражение`],
  mockDataForStats
};

