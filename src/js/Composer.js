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
      "V: B1": {
        clef: "bass",
      },
    };
  }

  _cyrb128(str) {
    let h1 = 1779033703,
      h2 = 3144134277,
      h3 = 1013904242,
      h4 = 2773480762;
    for (let i = 0, k; i < str.length; i++) {
      k = str.charCodeAt(i);
      h1 = h2 ^ Math.imul(h1 ^ k, 597399067);
      h2 = h3 ^ Math.imul(h2 ^ k, 2869860233);
      h3 = h4 ^ Math.imul(h3 ^ k, 951274213);
      h4 = h1 ^ Math.imul(h4 ^ k, 2716044179);
    }
    h1 = Math.imul(h3 ^ (h1 >>> 18), 597399067);
    h2 = Math.imul(h4 ^ (h2 >>> 22), 2869860233);
    h3 = Math.imul(h1 ^ (h3 >>> 17), 951274213);
    h4 = Math.imul(h2 ^ (h4 >>> 19), 2716044179);
    return [
      (h1 ^ h2 ^ h3 ^ h4) >>> 0,
      (h2 ^ h1) >>> 0,
      (h3 ^ h1) >>> 0,
      (h4 ^ h1) >>> 0,
    ];
  }

  _sfc32(a, b, c, d) {
    return function () {
      a >>>= 0;
      b >>>= 0;
      c >>>= 0;
      d >>>= 0;
      var t = (a + b) | 0;
      a = b ^ (b >>> 9);
      b = (c + (c << 3)) | 0;
      c = (c << 21) | (c >>> 11);
      d = (d + 1) | 0;
      t = (t + d) | 0;
      c = (c + t) | 0;
      return (t >>> 0) / 4294967296;
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
    const seed = this._cyrb128(this._text);
    const rand = this._sfc32(seed[0], seed[1], seed[2], seed[3]);
    do {
      let sum = 0;
      let rhythms = [];
      do {
        const rhythm =
          this._rhythms[this._rhythmDifficulty][Math.floor(rand() * nbRhythms)];
        const val = this._fractionToDecimal(rhythm);
        if (sum + val <= this._unitNoteLength) {
          sum += val;
          rhythms.push(rhythm);
        }
        cpt++;
      } while (sum != this._unitNoteLength && cpt < this._melody.length);
      if (sum != this._unitNoteLength) {
        rhythms[rhythms.length - 1] =
          this._unitNoteLength - (sum - parseInt(rhythms[rhythms.length - 1]));
      }
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
    console.log(this._melody);
    const melody = this._melodify();
    console.log(melody);
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
    return `${score}\n[V: T1] ${melody.join(
      "|"
    )}|]\n[V: B1] [B,D,F,]8|[A,C,E,]8|[E,G,B,]8|[G,B,D,]8|]`;
  }
}
