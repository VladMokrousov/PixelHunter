const GET_DATA_URL = `https://vladmokrousov.github.io/dataForTrainingProject/pixelhunter.json`;

const onError = () => {
  const node = document.createElement(`div`);
  node.style = `margin: 0 auto; text-align: center; background-color: red; font-size: 30px;`;
  node.textContent = `Произошла ошибка:( Попробуйте перезагрузить страницу`;
  document.body.insertAdjacentElement(`afterbegin`, node);
};

const loadGames = () => {
  const whenGamesLoaded = fetch(GET_DATA_URL);
  return whenGamesLoaded
  .then((response) => {
    if (response.ok) {
      return response.json();
    }
    throw new Error();
  })
  .catch(onError);

};

const loadPastStats = () => {
  const whenStatsLoaded = fetch(GET_DATA_URL);
  return whenStatsLoaded
  .then((response) => {
    if (response.ok) {
      return response.json();
    }
    throw new Error();
  })
  .catch(onError);
};

const postCurrentStats = (model) => {
  // const POST_DATA_URL = `https://es.dump.academy/pixel-hunter/stats/:965995978-:${model.state.user}`;
  const POST_DATA_URL = `https://httpbin.org/post`;
  const whenStatsPosted = fetch(POST_DATA_URL, {
    method: `POST`,
    body: JSON.stringify({
      "date": Date.now(),
      "answers": model.answers,
      "lives": model.lives
    }),
    headers: {
      'Content-Type': `application/json`
    }

  });
  whenStatsPosted
  .then((response) => console.log(response.ok ? `Sent` : `Not sent`))
  .catch((err) => console.error(err));
};


export {loadGames, loadPastStats, postCurrentStats};
