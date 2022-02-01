import Vex from "vexflow";

const vf = new Vex.Flow.Factory({
  renderer: {
    elementId: "score",
    width: 500,
    height: 300,
  },
});

window.$hymn = {
  $in: document.getElementById("in"),
  $transform: document.getElementById("transform"),
  score: vf.EasyScore(),
  system: vf.System(),
  vf: vf,
};
