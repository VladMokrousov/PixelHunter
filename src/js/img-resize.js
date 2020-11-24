export default (sizeContainer, sizePic) => {
  const a = sizeContainer.width / sizePic.width;
  const b = sizeContainer.height / sizePic.height;
  const mod = a > b ? b : a;

  const changePicSize = {
    'width': sizePic.width * mod,
    'height': sizePic.height * mod
  };
  return changePicSize;
};

