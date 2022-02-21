// https://en.wikipedia.org/wiki/Musical_cryptogram
window.$hymn.calculate = (text) => {
  // fetch and clean string
  let userString = text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z]/gim, " ")
    .replace(/\s+/g, "")
    .toLowerCase();
  // french replacement
  const remplacements = {
    // french
    do: "C ",
    dau: "C ",
    deau: "C ",
    re: "D ",
    rai: "D ",
    mi: "E ",
    my: "E ",
    me: "E ",
    fa: "F ",
    pha: "F ",
    sol: "G ",
    saul: "G ",
    la: "A ",
    lo: "A ",
    l: "A ",
    si: "B ",
    sy: "B ",
    ut: "C ",
    u: "C ",
    r: "D ",
    // german
    es: "E- ",
    "E s": "E- ",
    as: "A- ",
    "A s": "A- ",
    gis: "G# ",
    is: "E- ",
    a: "A ",
    b: "B- ",
    c: "C ",
    d: "D ",
    e: "E ",
    i: "E ",
    f: "F ",
    g: "G ",
    h: "B ",
    s: "E- ",
    z: "E- ",
    // minor become flat
    "A m": "A- ",
    "B m": "B- ",
    "C m": "C- ",
    "D m": "D- ",
    "E m": "E- ",
    "F m": "F- ",
    "G m": "G- ",
    // others
    q: "C ",
    m: "E ",
    n: "G ",
    k: "C ",
    v: "B ",
    y: "E ",
    p: "B ",
    t: "B ",
    o: "A ",
    w: "B ",
    j: "E ",
    // dur
    "A x": "A# ",
    "B x": "B# ",
    "C x": "C# ",
    "D x": "D# ",
    "E x": "E# ",
    "F x": "F# ",
    "G x": "G# ",
  };
  Object.keys(remplacements).forEach((n) => {
    userString = userString.replace(new RegExp(n, "g"), remplacements[n]);
  });
  return userString.split(" ").slice(0, -1);
};
