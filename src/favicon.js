import Ico from "./ico.js";
import Png from "./png.js";
import Bundle from "./bundle.js";

class FaviconJS {
  constructor(canvas) {
    this.canvas = canvas;
  }

  ico(sizes) {
    return new Ico(this.canvas, sizes).generate();
  }

  png(size) {
    return new Png(this.canvas).generate(size);
  }

  bundle() {
    return Bundle.generate(this.canvas);
  }
}

export default FaviconJS;
