window.$hymn.transform = () => {
  // fetch and clean string
  let userString = window.$hymn.$in.value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z]/gim, " ")
    .replace(/\s+/g, "")
    .toLowerCase();
  // french replacement
  const remplacements = {
    // french
    do: "C",
    dau: "C",
    re: "D",
    rai: "D",
    mi: "E",
    my: "E",
    me: "E",
    fa: "F",
    pha: "F",
    sol: "G",
    saul: "G",
    la: "A",
    lo: "A",
    l: "A",
    si: "B",
    sy: "B",
    ut: "C",
    u: "C",
    r: "D",
    // german
    es: "E-",
    as: "A-",
    gis: "G#",
    a: "A",
    b: "B",
    c: "C",
    d: "D",
    e: "E",
    i: "E",
    f: "F",
    g: "G",
    h: "B-",
    s: "E-",
    z: "E-",
    // minor become flat
    Am: "A-",
    Bm: "B-",
    Cm: "C-",
    Dm: "D-",
    Em: "E-",
    Fm: "F-",
    Gm: "G-",
    // dur
    Ax: "A#",
    Bx: "B#",
    Cx: "C#",
    Dx: "D#",
    Ex: "E#",
    Fx: "F#",
    Gx: "G#",
    // others
    q: "C",
    m: "E",
    n: "E",
    k: "C",
    v: "B",
    y: "E",
    p: "B",
    t: "B",
    o: "A",
    w: "B",
  };
  Object.keys(remplacements).forEach((n) => {
    userString = userString.replace(new RegExp(n, "g"), remplacements[n]);
  });
  let notes = [];
  userString.split("").forEach((c) => {
    notes.push(c);
  });
  console.log(notes);
};
