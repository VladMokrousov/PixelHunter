import ModalErrorView from './util-views/modal-error-view.js';

const GET_DATA_URL = `https://vladmokrousov.github.io/dataForTrainingProject/pixelhunter.json`;

const onError = () => {
  let modalError = new ModalErrorView();
  document.querySelector(`.central__content`).append(modalError.element);
};

async function loadGames() {
  try {
    const response = await fetch(GET_DATA_URL);
    if (response.ok) {
      return response.json();
    }
    throw new Error('Данные не получены');
  }
  catch(err) {
    console.log(err.message);
    onError();
  }
}

async function loadPastStats() {
  try {
    const response = await fetch(GET_DATA_URL);
    if (response.ok) {
      return response.json();
    }
    throw new Error('Данные не получены');
  }
  catch(err) {
    console.log(err.message);
  }
}

async function postCurrentStats(model) {
  // const POST_DATA_URL = `https://es.dump.academy/pixel-hunter/stats/:965995978-:${model.state.user}`;
  const POST_DATA_URL = `https://httpbin.org/post`;
  try {
    await fetch(POST_DATA_URL, {
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
   
    console.log('Данные отправлены');
  }
  catch(err){
    console.log(err.message);
  }
  
}

export {loadGames, loadPastStats, postCurrentStats};
