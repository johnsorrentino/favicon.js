import Bundle from "./bundle";
import Ico from "./ico.js";
import Png from "./png";
import Resize from "./resize";

class FaviconJS {
  constructor(canvas) {
    this.canvas = canvas;
  }

  bundle() {
    return new Bundle(this.canvas).generate();
  }

  ico(sizes) {
    return new Ico(this.canvas).generate(sizes);
  }

  png(size) {
    return new Png(this.canvas).generate(size);
  }

  resize(size) {
    return new Resize(this.canvas).generate(size, size);
  }
}

export default FaviconJS;
