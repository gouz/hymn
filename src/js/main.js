import "../less/main.less";

import Stegano from "./methods/Stegano";
import SheetAudio from "./methods/SheetAudio";
import Compose from "./methods/Compose";

const steg = new Stegano();

document.getElementById("data").addEventListener(
  "input",
  (event) => {
    const value = event.target.value;
    const composer = new Compose(value, steg.encode(value));
    new SheetAudio("sheet", "audio", composer.render());
  },
  false
);
