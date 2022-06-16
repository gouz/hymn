import "./main.css";

import HymnForm from "./components/Form";
import HymnMusic from "./components/Music";
import Cipher from "./js/Cipher";
import Composer from "./js/Composer";
import ranges from "./json/ranges.json";
import rhythms from "./json/rhythms.json";

const $hymnForm = document.querySelector("hymn-form");
const $hymnMusic = document.querySelector("hymn-music");

window.changeText = () => {
  $hymnForm.classList.toggle("hidden");
  $hymnMusic.classList.toggle("hidden");
};

$hymnForm.addEventListener(
  "maestro",
  (e) => {
    const composer = new Composer(
      e.detail.text,
      new Cipher().encode(e.detail.text),
      ranges,
      rhythms
    );
    const score = composer.render();
    $hymnMusic.abcjs = score;
    console.log(score);
    $hymnForm.classList.toggle("hidden");
    $hymnMusic.classList.toggle("hidden");
  },
  false
);
