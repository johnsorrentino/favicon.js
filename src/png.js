import Canvas from "./canvas";

export default class Png {
  constructor(canvas) {
    this.canvas = canvas;
  }

  generate(size) {
    var resizedCanvas = Canvas.resizeCanvasOptimal(this.canvas, size, size);
    return resizedCanvas.toDataURL();
  }
}
