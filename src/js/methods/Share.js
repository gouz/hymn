export default class Share {
  constructor() {}

  defineLink(text) {
    const buf = Buffer.from(text, "utf8");
    window.location.hash = buf.toString("base64");
  }

  fetchLink() {
    const buf = Buffer.from(window.location.hash.substring(1), "base64");
    return buf.toString("utf8");
  }
}
