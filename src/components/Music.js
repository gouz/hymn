import SheetAudio from "../js/SheetAudio";

export default class HymnMusic extends HTMLElement {
  static get observedAttributes() {
    return ["abcjs"];
  }

  constructor() {
    super();
    this.innerHTML = `
<div id="music">
    <div id="sheet"></div>
    <div id="audio"></div>
    ${this.innerHTML}
</div>
    `;
    this._$sheet = document.getElementById("sheet");
    this._$audio = document.getElementById("audio");
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue != newValue && "abcjs" == name) {
      if ("" != newValue) {
        new SheetAudio(this._$sheet, this._$audio, newValue);
      }
    }
  }

  set abcjs(value) {
    this.setAttribute("abcjs", value);
  }

  get abcjs() {
    this.getAttribute("abcjs");
  }
}
window.customElements.define("hymn-music", HymnMusic);
