import ABCJS from "abcjs";
import "abcjs/abcjs-audio.css";

export default class SheetAudio {
  constructor(elementSheet, elementAudio, score) {
    console.log(score);
    const visualObj = ABCJS.renderAbc(elementSheet, score, {
      add_classes: true,
    });

    if (ABCJS.synth.supportsAudio()) {
      const synthControl = new ABCJS.synth.SynthController();
      const CursorControl = function () {
        this.beatSubdivisions = 2;
        this.onStart = function () {
          // console.log("The tune has started playing.");
        };
        this.onFinished = function () {
          // console.log("The tune has stopped playing.");
        };
        this.onBeat = function () {
          // console.log("Beat " + beatNumber + " is happening.");
        };
        this.onEvent = function () {
          // console.log("An event is happening", event);
        };
      };
      const cursorControl = new CursorControl();
      synthControl.load(`#${elementAudio}`, cursorControl, {
        displayLoop: true,
        displayRestart: true,
        displayPlay: true,
        displayProgress: true,
        displayWarp: true,
      });
      const createSynth = new ABCJS.synth.CreateSynth();
      createSynth
        .init({ visualObj: visualObj[0] })
        .then(function () {
          synthControl
            .setTune(visualObj[0], false, { chordsOff: true })
            .then(function () {
              //console.log("Audio successfully loaded.");
            })
            .catch(function (error) {
              console.warn("Audio problem:", error);
            });
        })
        .catch(function (error) {
          console.warn("Audio problem:", error);
        });
    }
  }
}
