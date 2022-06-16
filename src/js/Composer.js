export default class Composer {
  constructor(text, melody, ranges, rhythms) {
    this._text = text;
    this._melody = melody;

    this._mode = "major";
    this._rhythmDifficulty = "simple";

    this._symbol = "";

    this._unitNoteLength = 8;
    this._meter = 4;
    this._subdiv = 4;

    this._ranges = ranges;
    this._rhythms = rhythms;

    this._voices = {
      "V: T1": {
        clef: "treble",
      },
      //"V: B1 clef=bass"
    };
  }

  _chordsTreatment() {
    this._melody = this._melody.map((chord) => {
      if ("E+" == chord) {
        chord = "F";
      } else if ("F-" == chord) {
        chord == "E";
      } else if ("C-" == chord) {
        chord == "B";
      } else if ("B+" == chord) {
        chord == "C";
      }
      chord = chord.replace(/(\w)-/g, "_$1").replace(/(\w)\+/g, "^$1");
      return chord;
    });
  }

  _fractionToDecimal(f) {
    return parseFloat(f.split("/").reduce((n, d, i) => n / (i ? d : 1)));
  }

  _melodify() {
    let measures = [];
    const nbRhythms = this._rhythms[this._rhythmDifficulty].length;
    let cpt = 0;
    do {
      let sum = 0;
      let rhythms = [];
      do {
        const rhythm =
          this._rhythms[this._rhythmDifficulty][
            Math.floor(Math.random() * nbRhythms)
          ];
        const val = this._fractionToDecimal(rhythm);
        if (sum + val <= this._unitNoteLength) {
          sum += val;
          rhythms.push(rhythm);
        }
        cpt++;
      } while (sum != this._unitNoteLength && cpt <= this._melody.length);
      measures.push(rhythms);
    } while (cpt <= this._melody.length);
    let melody = [];
    let index = 0;
    measures.forEach((rythmic) => {
      let measure = [];
      rythmic.forEach((r) => {
        if (index < this._melody.length) {
          measure.push(`${this._melody[index++]}${r}`);
        }
      });
      melody.push(measure.join(""));
    });
    return melody;
  }

  render() {
    this._chordsTreatment();
    let voicesHeader = [];
    Object.keys(this._voices).forEach((k) => {
      voicesHeader.push(`${k} clef=${this._voices[k].clef}`);
    });
    let score =
      `
X: 1
C: Hymn // gouz
Q: 100
T: ${this._text}
M: ${this._subdiv}/${this._meter}
${voicesHeader.join("\n")}
L: 1/${this._unitNoteLength}
`.trim() + " ";
    return `${score}\n[V: T1] ${this._melodify().join("|")}|]\n`;
  }
}
