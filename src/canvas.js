const Canvas = {};

/**
 * Resize the canvas by halving the width and height. This produces better
 * sampling and the image quality is generally better.
 */
Canvas.resizeCanvasOptimal = (canvas, targetWidth, targetHeight) => {
  let currentCanvas = canvas;
  let currentWidth = canvas.width;
  let currentHeight = canvas.height;
  let resizedCanvas;

  while (currentWidth / 2 >= targetWidth) {
    currentWidth = currentWidth / 2;
    currentHeight = currentHeight / 2;
    resizedCanvas = Canvas.resizeCanvas(currentCanvas, currentWidth, currentHeight);
    currentCanvas = resizedCanvas;
  }

  if (currentWidth > targetWidth) {
    resizedCanvas = Canvas.resizeCanvas(currentCanvas, targetWidth, targetHeight);
    currentCanvas = resizedCanvas;
  }

  return currentCanvas;
};

/**
 * Simple resize of a canvas element.
 */
Canvas.resizeCanvas = (canvas, targetWidth, targetHeight) => {
  let resizedCanvas = document.createElement("canvas");
  let resizedContext = resizedCanvas.getContext("2d");
  resizedCanvas.width = targetWidth;
  resizedCanvas.height = targetHeight;
  resizedContext.drawImage(canvas, 0, 0, targetWidth, targetHeight);
  return resizedCanvas;
};

export default Canvas;
