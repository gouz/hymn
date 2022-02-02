import ABCJS from "abcjs";
import "abcjs/abcjs-audio.css";

window.$hymn.render = (score) => {
  var visualObj = ABCJS.renderAbc("paper", score, { add_classes: true });

  if (ABCJS.synth.supportsAudio()) {
    var synthControl = new ABCJS.synth.SynthController();
    var CursorControl = function () {
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
    var cursorControl = new CursorControl();
    synthControl.load("#audio", cursorControl, {
      displayLoop: true,
      displayRestart: true,
      displayPlay: true,
      displayProgress: true,
      displayWarp: true,
    });
    var createSynth = new ABCJS.synth.CreateSynth();
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
};
