export default class HymnForm extends HTMLElement {
  constructor() {
    super();
    const template = document.createElement("template");
    template.innerHTML = `
      <style type="text/css">
        ${this._getStyle()}
      </style>
      ${this._getTemplate()}
    `;
    this.attachShadow({ mode: "open" }).appendChild(
      template.content.cloneNode(true)
    );
    this._$form = this.shadowRoot.querySelector("form");
    this._$text2cipher = this.shadowRoot.getElementById("text2cipher");
  }

  connectedCallback() {
    this._$form.addEventListener(
      "submit",
      (e) => {
        e.stopImmediatePropagation();
        e.preventDefault();
        this.dispatchEvent(
          new CustomEvent("maestro", {
            bubbles: true,
            cancelable: false,
            composed: true,
            detail: {
              text: this._$text2cipher.value,
            },
          })
        );
        return false;
      },
      false
    );
  }

  disconnectedCallback() {}

  _getStyle() {
    return `
form {
  flex-direction: column;
  justify-content: center;
  align-items: center;
  display: flex;
}

input {
  height: 3rem;
  width: 24rem;
  text-align: center;
  color: rgb(30 41 59);
  border-width: 1px;
  border-color: rgb(71 85 105);
  border-radius: .25rem;
  margin-bottom: .5rem;
  padding: .25rem .5rem;
  font-size: 1.125rem;
  line-height: 1.75rem;
}

button {
    color: rgb(255 255 255);
    background-color: rgb(21 128 61);
    border-width: 1px;
    border-color: rgb(22 101 52);
    border-radius: .25rem;
    align-items: center;
    padding: .5rem 1rem;
    display: flex;
    cursor: pointer;
    font-family: inherit;
    font-size: 100%;
    line-height: inherit;
}

button svg {
    height: 1.25rem;
    width: 1.25rem;
}

button span {
    display: block;
    white-space: nowrap;
    margin-left: .5rem;
}

button:hover {
  background-color: rgb(34 197 94);
}
    `;
  }

  _getTemplate() {
    return `
<div>
  <slot></slot>
  <form>
    <input type="text" id="text2cipher" placeholder="Your text" />
    <button type="submit">
      <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
      </svg>
      <span>Music Maestro!</span>
    </button>
  </form>
</div>
    `;
  }
}

window.customElements.define("hymn-form", HymnForm);
