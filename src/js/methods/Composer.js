import rangesJson from "../../json/ranges.json";

export default class Composer {
  constructor(text, chords) {
    this._text = text;
    this._chords = chords;

    this._mode = "major";

    this._unitNoteLength = 8;
    this._meter = 4;
    this._subdiv = 4;
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

  _chordsTreatment() {
    let symbol = "";
    this._chords = this._chords.map((chord) => {
      let transpose = 0;
      if ("E+" == chord) {
        chord = "F";
      } else if ("F-" == chord) {
        chord == "E";
      } else if ("C-" == chord) {
        chord == "B";
      } else if ("B+" == chord) {
        chord == "C";
      }
      chord = chord.replace(/(\w)-/g, "_$1").replace(/(\w)\+/, "^$1");
      rangesJson[this._mode][chord].forEach((note) => {
        if (note.length > 1) {
          if ("" != symbol && note.substring(0, 1) != symbol) {
            if ("+" == symbol) {
              transpose = -1;
            } else {
              transpose = 1;
            }
          } else {
            symbol = note.substring(0, 1);
          }
        }
      });
      if (0 != transpose) {
        if (1 == transpose) {
          switch (chord) {
            case "_A":
              chord = "^G";
              break;
            case "_B":
              chord = "^A";
              break;
            case "_D":
              chord = "^C";
              break;
            case "_E":
              chord = "^D";
              break;
            case "_G":
              chord = "^F";
              break;
          }
        } else {
          switch (chord) {
            case "^A":
              chord = "_B";
              break;
            case "^C":
              chord = "_D";
              break;
            case "^D":
              chord = "_E";
              break;
            case "^F":
              chord = "_G";
              break;
            case "^G":
              chord = "_A";
              break;
          }
        }
      }
      return chord;
    });
  }

  render() {
    console.log(this._chords);
    this._chordsTreatment();
    console.log(this._chords);
    let score =
      `
X: 1
C: Hymn // gouz
Q: 100
T: ${this._text}
M: ${this._subdiv}/${this._meter}
V: T1 clef=treble
V: B1 clef=bass
L: 1/${this._unitNoteLength}
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
      trebleVoice.push(`${i == 0 ? "\n[V: T1]" : ""}${this._arpegify(n)}`);
      bassVoice.push(
        `${i == 0 ? "\n[V: B1]" : ""}${this._chordify(n)}${2 * this._subdiv}`
      );
    });
    return `${score}\n[V: T1] ${trebleVoice.join(
      "|"
    )}|]\n[V: B1] ${bassVoice.join("|")}|]`;
  }
}
