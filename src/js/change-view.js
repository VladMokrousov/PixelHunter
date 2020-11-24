// Добавляет переданный блок на страницу
const divInMain = document.querySelector(`#main`);

export default function (elem) {
  divInMain.innerHTML = ``;
  divInMain.append(elem);
}


