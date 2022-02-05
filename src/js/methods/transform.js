window.$hymn.transform = () => {
  const inputText = window.$hymn.$in.value;
  const conversion = window.$hymn.calculate(inputText);
  console.log(conversion.length % 4, conversion.length);
  const subdiv = 4;
  let score =
    `
X: 1
C: Hymn // gouz
Q: 100
T: ${inputText}
M: ${subdiv}/4
V: T1 clef=treble
V: B1 clef=bass
L: 1/8
[V: T1]
`.trim() + " ";
  const alt = (n) => {
    n = n.replace(/(\w)-/g, "_$1").replace(/(\w)#/, "^$1");
    if (n.length == 1) n = `=${n}`;
    return n;
  };
  let nbTemps = 0;
  conversion.forEach((n, i) => {
    let mul = 2;
    nbTemps += mul;
    // , = octave down
    score += `${alt(n)}${mul}`;
    if (nbTemps == 2 * subdiv) {
      score += " | ";
      nbTemps = 0;
    }
  });
  /*
  const rest = (2 * subdiv - nbTemps) / 2;
  if (rest) {
    score += `z${rest} |]`;
  } else {
    score = score.slice(0, -1) + "|]";
  }
  */
  console.log(score);
  window.$hymn.render(score);
};
