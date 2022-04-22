import "../less/main.less";

import Stegano from "./methods/Stegano";
import SheetAudio from "./methods/SheetAudio";
import Compose from "./methods/Compose";
import Share from "./methods/Share";

const share = new Share();

const $data = document.getElementById("data");

const toggleJumbo = () => {
  document.getElementById("form").classList.toggle("hide");
  document.getElementById("music").classList.toggle("hide");
};

const maestro = (text) => {
  const composer = new Compose(text, new Stegano().encode(text));
  new SheetAudio("sheet", "audio", composer.render());
  toggleJumbo();
};

const currentLink = share.fetchLink();
if ("" != currentLink) {
  $data.value = currentLink;
  maestro(currentLink);
}

$data.addEventListener(
  "keydown",
  (event) => {
    if (event.key == "Enter") {
      const text = event.target.value;
      maestro(text);
      share.defineLink(text);
      return false;
    }
  },
  false
);

document.getElementById("generate").addEventListener("click", () => {
  const text = $data.value;
  maestro(text);
  share.defineLink(text);
});

document.getElementById("new").addEventListener("click", () => {
  toggleJumbo();
  $data.focus();
});

document.getElementById("print").addEventListener("click", () => {
  window.print();
});
