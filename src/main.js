import "./main.css";

import HymnForm from "./components/Form";
import HymnMusic from "./components/Music";
import Cipher from "./js/Cipher";
import Composer from "./js/Composer";
import ranges from "./json/ranges.json";
import rhythms from "./json/rhythms.json";

const $hymnForm = document.querySelector("hymn-form");
const $hymnMusic = document.querySelector("hymn-music");

$hymnForm.addEventListener(
  "maestro",
  (e) => {
    const composer = new Composer(
      e.detail.text,
      new Cipher().encode(e.detail.text),
      ranges,
      rhythms
    );
    $hymnMusic.abcjs = composer.render();
    $hymnForm.classList.toggle("hidden");
    $hymnMusic.classList.toggle("hidden");
  },
  false
);
