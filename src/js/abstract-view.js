
import generateDomFromString from './generate-dom-from-string.js';


export default class AbstractView {

  constructor() {
    if (new.target === AbstractView) {
      throw new Error(`Can't instantiate AbstractView, only concrete one`);
    }
  }
  get _template() {
    throw new Error(`Template is required`);

  }
  _render() {
    return generateDomFromString(this._template);


  }
  _bind(element) {

  }

  get element() {
    if (this._element) {
      return this._element;
    }
    this._element = this._render();
    this._bind(this._element);

    return this._element;

  }


}


