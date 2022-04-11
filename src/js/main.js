import "../less/main.less";

import Stegano from "./methods/Stegano";
import SheetAudio from "./methods/SheetAudio";
import Compose from "./methods/Compose";

document.getElementById("data").addEventListener(
  "input",
  (event) => {
    const composer = new Compose(
      event.target.value,
      new Stegano().encode(event.target.value)
    );
    new SheetAudio("sheet", "audio", composer.render());
  },
  false
);
