import Canvas from "./canvas";

export default class Png {
  constrcutor(canvas) {
    this.canvas = canvas;
  }

  generate(size) {
    var resizedCanvas = Canvas.resizeCanvasOptimal(canvas, size, size);
    return resizedCanvas.toDataURL();
  }
}
