import rangesJson from "../../json/ranges.json";

export default class Compose {
  constructor(text, chords) {
    this._text = text;
    this._chords = chords;

    this._mode = "major";

    this._subdiv = 4;
  }

  _alt(n) {
    if ("E+" == n) {
      n = "F";
    } else if ("F-" == n) {
      n == "E";
    } else if ("C-" == n) {
      n == "B";
    } else if ("B+" == n) {
      n == "C";
    }
    return n.replace(/(\w)-/g, "_$1").replace(/(\w)\+/, "^$1");
  }

  _chordify(n) {
    const note = n.replace(/[_^]/, "");
    let sep = ",";
    if ("A" == note || "B" == note) {
      sep = ",,";
    }
    let chord = [];
    [0, 2, 4].forEach((i) => {
      chord.push(rangesJson[this._mode][n][i]);
    });
    return `[${chord.join(sep)}${sep}]`;
  }

  _arpegify(n) {
    return [
      `${rangesJson[this._mode][n][0]}2`,
      `${rangesJson[this._mode][n][2]}2`,
      `${rangesJson[this._mode][n][4]}2`,
      `${rangesJson[this._mode][n][0]}2`,
    ].join(" ");
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
`.trim() + " ";
    /*
    let previousAccidentals = {
      A: "",
      B: "",
      C: "",
      D: "",
      E: "",
      F: "",
      G: "",
    };
    */
    /*
    let previousPitchs = {
      A: 1,
      B: 1,
      C: 1,
      D: 1,
      E: 1,
      F: 1,
      G: 1,
    };
    */
    let trebleVoice = [];
    let bassVoice = [];
    this._chords.forEach((n, i) => {
      /*
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
      */
      /*
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
      */
      trebleVoice.push(
        `${i == 0 ? "\n[V: T1]" : ""}${this._arpegify(this._alt(n))}`
      );
      bassVoice.push(
        `${i == 0 ? "\n[V: B1]" : ""}${this._chordify(this._alt(n))}${
          2 * this._subdiv
        }`
      );
    });
    return `${score}\n[V: T1] ${trebleVoice.join(
      "|"
    )}|]\n[V: B1] ${bassVoice.join("|")}|]`;
  }
}
