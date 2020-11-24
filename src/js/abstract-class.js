
import generateDomFromString from './generate-dom-from-string.js';


export default class AbstractView {

  constructor() {
    if (new.target === AbstractView) {
      throw new Error(`Can't instantiate AbstractView, only concrete one`);
    }
  }
  get template() {
    throw new Error(`Template is required`);

  }
  render() {
    return generateDomFromString(this.template);


  }
  bind(element) {

  }

  get element() {
    if (this._element) {
      return this._element;
    }
    this._element = this.render();
    this.bind(this._element);

    return this._element;

  }


}


