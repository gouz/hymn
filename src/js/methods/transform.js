window.$hymn.transform = () => {
  // fetch and clean string
  const userString = window.$hymn.$in.value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
  let notes = [];
  userString.split("").forEach((c) => {
    switch (c) {
      case "a":
        notes.push("(A2 C3 E3)/q");
        break;
    }
  });
  window.$hymn.render(["D5/q/r", notes.join(",")]);
};
