function FaviconJS(canvas) {

  var canvasMaster = resizeCanvas(canvas, 128, 128);

  function ico(sizes) {
    // Canvas 256 x 256
    // var canvasMaster = draw({height: 128, width: 128, fontSize: fontSize, canvas: document.createElement('canvas')});

    // icon header
    var binary = createIconDirectoryHeader(sizes.length);

    // icon directory entries
    for (var i = 0; i < sizes.length; i++) {
      var size = sizes[i];
      // var canvas = canvases[size];
      var canvas = resizeCanvasOptimal(canvasMaster, size, size);
      var context = canvas.getContext('2d');
      var width = canvas.width;
      var height = canvas.height;
      var imageData = context.getImageData(0, 0, width, height);
      var bitmapInfoHeader = createBitmapInfoHeader(width, height);
      var bitmapImageData = createBitmapImageData(canvas);
      var bitmapSize = bitmapInfoHeader.length + bitmapImageData.length;
      var bitmapOffset = createBitmapOffset(sizes, i);
      binary += createIconDirectoryEntry(width, height, bitmapSize, bitmapOffset);
    }

    // bitmap data
    for (var i = 0; i < sizes.length; i++) {
      var size = sizes[i];
      var canvas = resizeCanvasOptimal(canvasMaster, size, size);
      var width = canvas.width;
      var height = canvas.height;
      var imageData = context.getImageData(0, 0, width, height);
      var bitmapInfoHeader = createBitmapInfoHeader(width, height);
      var bitmapImageData = createBitmapImageData(canvas);
      binary += bitmapInfoHeader;
      binary += bitmapImageData;
    }

    // return binary;
    // var base64 = 'data:image/vnd.microsoft.icon;base64,' + btoa(binary);
    var base64 = 'data:image/x-icon;base64,' + btoa(binary);
    return base64;
  }

  function png() {
    return canvas.toDataURL();
  }

  /**
   * Resize the canvas by halving the width and height. This produces better
   * sampling and the image turns out better.
   */
  function resizeCanvasOptimal(canvas, targetWidth, targetHeight) {
    var currentCanvas = canvas;
    var currentContext = canvas.getContext('2d');
    var currentWidth = canvas.width;
    var currentHeight = canvas.height;
    var resizedCanvas;
    var resizedContext;
    while (currentWidth > targetWidth) {
      resizedCanvas = document.createElement('canvas');
      resizedContext = resizedCanvas.getContext('2d');
      currentWidth = currentWidth / 2;
      currentHeight = currentHeight / 2;
      resizedCanvas.width = currentWidth;
      resizedCanvas.height = currentHeight;
      resizedContext.drawImage(currentCanvas, 0, 0, currentWidth, currentHeight);
      currentCanvas = resizedCanvas;
      currentContext = resizedContext;
    }
    return currentCanvas;
  }

  /**
   * Resize the canvas to any size.
   */
  function resizeCanvas(canvas, targetWidth, targetHeight) {
    var currentCanvas = canvas;
    var currentContext = canvas.getContext('2d');
    var resizedCanvas = document.createElement('canvas');
    var resizedContext = resizedCanvas.getContext('2d');
    resizedCanvas.width = targetWidth;
    resizedCanvas.height = targetHeight;
    resizedContext.drawImage(currentCanvas, 0, 0, targetWidth, targetHeight);
    return resizedCanvas;
  }

  function createBitmapOffset(sizes, entry) {
    var offset = 6; // icon header size
    offset += (16 * sizes.length); // icon entry header size

    // size of previous bitmaps
    for (var i = 0; i < entry; i++) {
      var size = sizes[i];
      offset += 40; // bitmap header size
      offset += (4 * size * size); // bitmap data size
      offset += ((2 * size * size) / 8); // bitmap mask size
    }
    return offset;
  }

  function createBitmapImageData(canvas) {
    var ctx = canvas.getContext('2d');
    var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    var bitmapPixelData = new Uint32Array(imageData.data.buffer);
    var bitmapBuffer = bitmapPixelData.reverse().buffer;
    var bitmapMask = new Uint8Array((canvas.width * canvas.height * 2) / 8);
    bitmapMask.fill(0);
    binary = arrayBufferToBinary(canvasToBitmap(canvas));
    binary += Uint8ArrayToBinary(bitmapMask);
    return binary;
  }

  function canvasToBitmap(canvas) {
    var ctx = canvas.getContext('2d');
    var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    var rgbaData8 = imageData.data;
    var bgraData8 = new Uint8ClampedArray(imageData.data.length);
    for (var i = 0; i < rgbaData8.length; i += 4) {
      var r = rgbaData8[i];
      var g = rgbaData8[i + 1];
      var b = rgbaData8[i + 2];
      var a = rgbaData8[i + 3];
      bgraData8[i] = b;
      bgraData8[i + 1] = g;
      bgraData8[i + 2] = r;
      bgraData8[i + 3] = a;
    }

    var bgraData32 = new Uint32Array(bgraData8.buffer);
    var bgraData32Rotated = new Uint32Array(bgraData32.length);
    for (var i = 0; i < bgraData32.length; i++) {
      var xPos = i % canvas.width;
      var yPos = Math.floor(i / canvas.width);
      var xPosRotated = xPos;
      var yPosRotated = canvas.height - 1 - yPos;
      var indexRotated = (yPosRotated * canvas.width) + xPosRotated;
      var pixel = bgraData32[i];
      bgraData32Rotated[indexRotated] = pixel;
    }
    return bgraData32Rotated.buffer;
  }

  function createIconDirectoryHeader(numImages) {
    var buffer = new ArrayBuffer(6);
    var view = new DataView(buffer);
    view.setUint16(0, 0, true); // Reserved. Must always be 0.
    view.setUint16(2, 1, true); // Specifies type. 1 = ICO.
    view.setUint16(4, numImages, true); // Number of images.
    return arrayBufferToBinary(buffer);
  }

  function createIconDirectoryEntry(width, height, size, offset) {
    var buffer = new ArrayBuffer(16);
    var view = new DataView(buffer);
    view.setUint8(0, width); // Pixel width (0..256). 0 = 256 pixels.
    view.setUint8(1, height);  // Pixel height (0..256). 0 = 256 pixels.
    view.setUint8(2, 0); // Number of colors in pallet. 0 = no pallet.
    view.setUint8(3, 0); // Reserved. Should be 0.
    view.setUint16(4, 1, true); // Color planes. 0 or 1.
    view.setUint16(6, 32, true); // Specifies bits per pixel.
    view.setUint32(8, size, true); // Image size (bytes).
    view.setUint32(12, offset, true); // Offset to BMP of PNG.
    return arrayBufferToBinary(buffer);
  }

  function createBitmapInfoHeader(width, height) {
    var buffer = new ArrayBuffer(40);
    var view = new DataView(buffer);
    view.setUint32(0, 40, true); // Header size (40 bytes).
    view.setInt32(4, width, true); // BMP width.
    view.setInt32(8, 2 * height, true); // BMP height.
    view.setUint16(12, 1, true); // Number of color planes. Must be 1.
    view.setUint16(14, 32, true); // Bits per pixel
    view.setUint32(16, 0, true); // Compression method. 0 = none.
    view.setUint32(20, 0, true); // Image size (bytes). 0 = no compression.
    view.setUint32(24, 0, true); // Horizontal resolution.
    view.setUint32(28, 0, true); // Vertical resolution.
    view.setUint32(32, 0, true); // Number of colors. 0 = default.
    view.setUint32(36, 0, true); // Number of important colors. 0 =  all
    return arrayBufferToBinary(buffer);
  }

  function arrayBufferToBinary(buffer) {
    var binary = '';
    var bytes = new Uint8Array(buffer);
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return binary;
  }

  function Uint8ArrayToBinary(Uint8Array) {
    var binary = '';
    var bytes = Uint8Array;
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return binary;
  }

  return {
    toIco: ico,
    toPng: png
  };
}
