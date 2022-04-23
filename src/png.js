import Resize from "./resize";

export default class Png {
  constructor(canvas) {
    this.canvas = canvas;
  }

  generate(size) {
    return new Resize(this.canvas).generate(size, size).toDataURL();
  }
}
