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
    let previousAccidentals = {
      A: "",
      B: "",
      C: "",
      D: "",
      E: "",
      F: "",
      G: "",
    };
    let previousPitchs = {
      A: 1,
      B: 1,
      C: 1,
      D: 1,
      E: 1,
      F: 1,
      G: 1,
    };
    this._chords.forEach((n) => {
      let mul = 2;
      nbTemps += mul;
      const note = n.substr(0, 1);
      let accidental = "";
      if (n.length == 2) {
        accidental = n.substr(1, 1);
      }
      if ("" == accidental && "" != previousAccidentals[note]) {
        n = `=${n}`;
      } else if ("" != accidental && accidental == previousAccidentals[note]) {
        n = note;
      }
      previousAccidentals[note] = accidental;
      let pitch = Math.floor(4 * Math.random());
      if (Math.abs(previousPitchs[note] - pitch) > 1) {
        if (pitch > previousPitchs[note]) {
          pitch = previousPitchs[note] + 1;
        } else {
          pitch = previousPitchs[note] - 1;
        }
      }
      previousPitchs[note] = pitch;
      switch (pitch) {
        case 0:
          // bass
          n += ",";
          break;
        default:
        case 1:
          // no change
          break;
        case 2:
          // octave sup
          n = n.toLowerCase();
          break;
        case 3:
          // treble
          n = `${n.toLowerCase()}'`;
          break;
      }
      score += `${alt(n)}${mul}`;
      if (nbTemps == 2 * this._subdiv) {
        score += " | ";
        nbTemps = 0;
        previousAccidentals = {
          A: "",
          B: "",
          C: "",
          D: "",
          E: "",
          F: "",
          G: "",
        };
      }
    });
    return score;
  }
}
