import "../less/main.less";

import { OpenSheetMusicDisplay } from "opensheetmusicdisplay";
import AudioPlayer from "osmd-audio-player";
import { PlaybackEvent } from "osmd-audio-player/dist/PlaybackEngine";

(async () => {
  const osmd = new OpenSheetMusicDisplay("score");
  const audioPlayer = new AudioPlayer();

  osmd.setOptions({
    backend: "svg",
    drawTitle: true,
  });
  await osmd.load("MozaVeilSample.xml");
  await osmd.render();
  await audioPlayer.loadScore(osmd);
  audioPlayer.on(PlaybackEvent.ITERATION, (notes) => {
    console.log(notes);
  });
  hideLoadingMessage();
  registerButtonEvents(audioPlayer);
})();

function hideLoadingMessage() {
  document.getElementById("loading").style.display = "none";
}

function registerButtonEvents(audioPlayer) {
  document.getElementById("btn-play").addEventListener("click", () => {
    if (audioPlayer.state === "STOPPED" || audioPlayer.state === "PAUSED") {
      audioPlayer.play();
    }
  });
  document.getElementById("btn-pause").addEventListener("click", () => {
    if (audioPlayer.state === "PLAYING") {
      audioPlayer.pause();
    }
  });
  document.getElementById("btn-stop").addEventListener("click", () => {
    if (audioPlayer.state === "PLAYING" || audioPlayer.state === "PAUSED") {
      audioPlayer.stop();
    }
  });
}
