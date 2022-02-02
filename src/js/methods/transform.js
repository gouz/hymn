window.$hymn.transform = () => {
  const inputText = window.$hymn.$in.value;
  const conversion = window.$hymn.calculate(inputText);
  console.log(conversion.length % 4, conversion.length);
  const subdiv = 4;
  let score = `
X: 1
C: Hymn // gouz
Q: 100
T: ${inputText}
M: ${subdiv}/4
V: T1 clef=treble
V: B1 clef=bass
L: 1/4
[V: B1]`.trim();
  conversion.forEach((n, i) => {
    // , = octave down
    score += `${n.replace(/(\w)-/g, "_$1").replace(/(\w)#/, "^$1")},,${
      i % subdiv == subdiv - 1 ? " |" : " "
    }`;
  });
  const rest = conversion.length % subdiv;
  if (rest) {
    score += `z${subdiv - rest} |]`;
  } else {
    score = score.slice(0, -1) + "|]";
  }
  window.$hymn.render(score);
};
