import "../less/main.less";

import Stegano from "./methods/Stegano";
import SheetAudio from "./methods/SheetAudio";
import Compose from "./methods/Compose";
import Share from "./methods/Share";

const share = new Share();

const maestro = (text) => {
  const composer = new Compose(text, new Stegano().encode(text));
  new SheetAudio("sheet", "audio", composer.render());
  share.defineLink(text);
};

document.getElementById("data").addEventListener(
  "keydown",
  (event) => {
    if (event.key == "Enter") {
      maestro(event.target.value);
      return false;
    }
  },
  false
);

if ("" != window.location.hash) {
  const text = share.fetchLink();
  document.getElementById("data").value = text;
  maestro(text);
}
