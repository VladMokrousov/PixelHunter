// Функция принимает на вход строку, а отдает Dom-элемент

export default (string) => {
  const wrapper = document.createElement(`div`);
  wrapper.insertAdjacentHTML(`beforeend`, string);
  return wrapper;
};

