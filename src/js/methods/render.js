window.$hymn.render = (staves) => {
  console.log(staves);
  window.$hymn.system
    .addStave({
      voices: [window.$hymn.score.voice(window.$hymn.score.notes(staves[0]))],
    })
    .addClef("treble")
    .addTimeSignature("4/4");
  window.$hymn.system
    .addStave({
      voices: [
        window.$hymn.score.voice(
          window.$hymn.score.notes(staves[1], {
            clef: "bass",
          })
        ),
      ],
    })
    .addClef("bass")
    .addTimeSignature("4/4");
  window.$hymn.system.addConnector();

  window.$hymn.vf.draw();
};
