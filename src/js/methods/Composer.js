import rangesJson from "../../json/ranges.json";

export default class Composer {
  constructor(text, chords) {
    this._text = text;
    this._chords = chords;

    this._mode = "major";

    this._symbol = "";

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
    this._chords = this._chords.map((chord) => {
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
      return chord;
    });
  }

  _normalize(voice) {
    // remove accidentals
    voice = voice.map((v) => {
      let previousAccidentals = {};
      return v
        .split(" ")
        .map((n) => {
          if (String(n).startsWith("_") || String(n).startsWith("^")) {
            let accidental = n.substr(0, 1);
            let note = n.substr(1, 1);
            let rest = n.substr(2);
            if ("" == this._symbol) {
              this._symbol = accidental;
            } else {
              if (accidental != this._symbol) {
                // sharp is different than flat
                if ("_" == accidental) {
                  // flat becomes shart
                  accidental = "^";
                  switch (note) {
                    default:
                      break;
                    case "A":
                      note = "G";
                      break;
                    case "B":
                      note = "A";
                      break;
                    case "C":
                      note = "B";
                      break;
                    case "D":
                      note = "C";
                      break;
                    case "E":
                      note = "D";
                      break;
                    case "F":
                      note = "E";
                      break;
                    case "G":
                      note = "F";
                      break;
                  }
                } else {
                  // sharp becomes flat
                  accidental = "_";
                  switch (note) {
                    default:
                      break;
                    case "A":
                      note = "B";
                      break;
                    case "B":
                      note = "C";
                      break;
                    case "C":
                      note = "D";
                      break;
                    case "D":
                      note = "E";
                      break;
                    case "E":
                      note = "F";
                      break;
                    case "F":
                      note = "G";
                      break;
                    case "G":
                      note = "A";
                      break;
                  }
                }
              }
              n = `${accidental}${note}${rest}`;
              if (previousAccidentals[n] != null) {
                n = `${note}${rest}`;
              }
            }
            previousAccidentals[n] = 1;
          }
          return n;
        })
        .join(" ");
    });
    return voice;
  }

  _normalizeChords(voice) {
    // remove accidentals
    voice = voice.map((v) => {
      let transform = {};
      let accidental = "";
      if ("_" == this._symbol) {
        accidental = "^";
        transform = {
          C: "D",
          D: "E",
          F: "G",
          G: "A",
          A: "B",
        };
      } else {
        accidental = "_";
        transform = {
          B: "A",
          A: "G",
          G: "F",
          E: "D",
          D: "C",
        };
      }
      Object.keys(transform).forEach((k) => {
        v = v.replace(
          new RegExp(`${accidental}${k}`, "g"),
          `${this._symbol}${transform[k]}`
        );
      });
      return v;
    });
    return voice;
  }

  render() {
    this._chordsTreatment();
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
    let trebleVoice = [];
    let bassVoice = [];
    this._chords.forEach((n) => {
      /*
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
      trebleVoice.push(`${this._arpegify(n)}`);
      bassVoice.push(`${this._chordify(n)}${2 * this._subdiv}`);
    });
    return `${score}\n[V: T1] ${this._normalize(trebleVoice).join(
      "|"
    )}|]\n[V: B1] ${this._normalizeChords(bassVoice).join("|")}|]`;
  }
}
