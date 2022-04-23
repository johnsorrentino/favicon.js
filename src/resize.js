class Resize {
  constructor(canvas) {
    this.canvas = canvas;
  }

  /**
   * Resize the canvas by halving the width and height. This produces better
   * sampling and the image quality is generally better.
   */
  generate(width, height) {
    while (this.canvas.width / 2 >= width) {
      this._resize(this.canvas.width / 2, this.canvas.height / 2);
    }

    if (this.canvas.width > width) {
      this._resize(width, height);
    }

    return this.canvas;
  }

  /**
   * Simple resize of a canvas element.
   */
  _resize(width, height) {
    let canvas = document.createElement("canvas");
    let resizedContext = canvas.getContext("2d");
    canvas.width = width;
    canvas.height = height;
    resizedContext.drawImage(this.canvas, 0, 0, width, height);
    this.canvas = canvas;
  }
}

export default Resize;
