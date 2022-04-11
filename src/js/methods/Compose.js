export default class Compose {
  constructor(text, chords) {
    this._text = text;
    this._chords = chords;

    this._subdiv = 4;
  }

  render() {
    let score =
      `
X: 1
C: Hymn // gouz
Q: 100
T: ${this._text}
M: ${this._subdiv}/4
V: T1 clef=treble
V: B1 clef=bass
L: 1/8
[V: T1]
`.trim() + " ";
    const alt = (n) => {
      n = n.replace(/(\w)-/g, "_$1").replace(/(\w)\+/, "^$1");
      return n;
    };
    let nbTemps = 0;
    this._chords.forEach((n, i) => {
      let mul = 2;
      nbTemps += mul;
      /*
      if (1 == n.length && "" != previousPitch[n]) {
        n = `=${n}`;
        previousPitch[n] = "";
      } else if (2 == n.length) {
        if ("" != previousPitch[n] && n.substr(1, 1) == previousPitch[n]) {
          n = n.substr(0, 1);
        }
      }
      */
      // , = octave down
      score += `${alt(n)}${mul}`;
      if (nbTemps == 2 * this._subdiv) {
        score += " | ";
        nbTemps = 0;
        /*
        previousPitch = {
          A: "",
          B: "",
          C: "",
          D: "",
          E: "",
          F: "",
          G: "",
        };
        */
      }
    });
    return score;
  }
}
