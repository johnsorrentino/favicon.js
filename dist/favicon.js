var $kYE3G$swchelpers = require("@swc/helpers");

function $parcel$defineInteropFlag(a) {
  Object.defineProperty(a, '__esModule', {value: true, configurable: true});
}
function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}

$parcel$defineInteropFlag(module.exports);

$parcel$export(module.exports, "default", function () { return $a90b4fa48e74fdf7$export$2e2bcd8739ae039; });




var $0915a8760e5143b1$var$Resize = /*#__PURE__*/ function() {
    "use strict";
    function $0915a8760e5143b1$var$Resize(canvas) {
        $kYE3G$swchelpers.classCallCheck(this, $0915a8760e5143b1$var$Resize);
        this.canvas = canvas;
    }
    $kYE3G$swchelpers.createClass($0915a8760e5143b1$var$Resize, [
        {
            /**
   * Resize the canvas by halving the width and height. This produces better
   * sampling and the image quality is generally better.
   */ key: "generate",
            value: function generate(width, height) {
                while(this.canvas.width / 2 >= width)this._resize(this.canvas.width / 2, this.canvas.height / 2);
                if (this.canvas.width > width) this._resize(width, height);
                return this.canvas;
            }
        },
        {
            /**
   * Simple resize of a canvas element.
   */ key: "_resize",
            value: function _resize(width, height) {
                var canvas = document.createElement("canvas");
                var resizedContext = canvas.getContext("2d");
                canvas.width = width;
                canvas.height = height;
                resizedContext.drawImage(this.canvas, 0, 0, width, height);
                this.canvas = canvas;
            }
        }
    ]);
    return $0915a8760e5143b1$var$Resize;
}();
var $0915a8760e5143b1$export$2e2bcd8739ae039 = $0915a8760e5143b1$var$Resize;


var $b7682bb6491fbddd$var$Ico = /*#__PURE__*/ function() {
    "use strict";
    function $b7682bb6491fbddd$var$Ico(canvas) {
        $kYE3G$swchelpers.classCallCheck(this, $b7682bb6491fbddd$var$Ico);
        this.canvas = canvas;
    }
    $kYE3G$swchelpers.createClass($b7682bb6491fbddd$var$Ico, [
        {
            key: "generate",
            value: function generate() {
                var sizes = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [
                    16,
                    32,
                    48
                ];
                var canvasMaster = new $0915a8760e5143b1$export$2e2bcd8739ae039(this.canvas).generate(128, 128);
                var iconDirectoryHeader = this.createIconDirectoryHeader(sizes.length);
                var iconDirectoryEntries = "";
                var bitmapData = "";
                for(var i = 0; i < sizes.length; i++){
                    var size = sizes[i];
                    var canvas = new $0915a8760e5143b1$export$2e2bcd8739ae039(canvasMaster).generate(size, size);
                    var context = canvas.getContext("2d");
                    var width = canvas.width;
                    var height = canvas.height;
                    var imageData = context.getImageData(0, 0, width, height);
                    var bitmapInfoHeader = this.createBitmapInfoHeader(width, height);
                    var bitmapImageData = this.createBitmapImageData(canvas);
                    var bitmapSize = bitmapInfoHeader.length + bitmapImageData.length;
                    var bitmapOffset = this.calculateBitmapOffset(sizes, i);
                    iconDirectoryEntries += this.createIconDirectoryEntry(width, height, bitmapSize, bitmapOffset);
                    bitmapData += bitmapInfoHeader + bitmapImageData;
                }
                var binary = iconDirectoryHeader + iconDirectoryEntries + bitmapData;
                var base64 = "data:image/x-icon;base64," + btoa(binary);
                return base64;
            }
        },
        {
            /**
   * Calculates the location to the bitmap entry.
   */ key: "calculateBitmapOffset",
            value: function calculateBitmapOffset(sizes, entry) {
                var offset = 6; // icon header size
                offset += 16 * sizes.length; // icon entry header size
                // size of previous bitmaps
                for(var i = 0; i < entry; i++){
                    var size = sizes[i];
                    offset += 40; // bitmap header size
                    offset += 4 * size * size; // bitmap data size
                    offset += 2 * size * size / 8; // bitmap mask size
                }
                return offset;
            }
        },
        {
            key: "createBitmapImageData",
            value: function createBitmapImageData(canvas) {
                var ctx = canvas.getContext("2d");
                var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                var bitmapPixelData = new Uint32Array(imageData.data.buffer);
                var bitmapBuffer = bitmapPixelData.reverse().buffer;
                var bitmapMask = new Uint8Array(canvas.width * canvas.height * 2 / 8);
                bitmapMask.fill(0);
                var binary = this.arrayBufferToBinary(this.canvasToBitmap(canvas));
                binary += this.Uint8ArrayToBinary(bitmapMask);
                return binary;
            }
        },
        {
            key: "canvasToBitmap",
            value: function canvasToBitmap(canvas) {
                var ctx = canvas.getContext("2d");
                var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                var rgbaData8 = imageData.data;
                var bgraData8 = new Uint8ClampedArray(imageData.data.length);
                for(var i = 0; i < rgbaData8.length; i += 4){
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
                for(var i1 = 0; i1 < bgraData32.length; i1++){
                    var xPos = i1 % canvas.width;
                    var yPos = Math.floor(i1 / canvas.width);
                    var xPosRotated = xPos;
                    var yPosRotated = canvas.height - 1 - yPos;
                    var indexRotated = yPosRotated * canvas.width + xPosRotated;
                    var pixel = bgraData32[i1];
                    bgraData32Rotated[indexRotated] = pixel;
                }
                return bgraData32Rotated.buffer;
            }
        },
        {
            key: "createIconDirectoryHeader",
            value: function createIconDirectoryHeader(numImages) {
                var buffer = new ArrayBuffer(6);
                var view = new DataView(buffer);
                view.setUint16(0, 0, true); // Reserved. Must always be 0.
                view.setUint16(2, 1, true); // Specifies type. 1 = ICO.
                view.setUint16(4, numImages, true); // Number of images.
                return this.arrayBufferToBinary(buffer);
            }
        },
        {
            key: "createIconDirectoryEntry",
            value: function createIconDirectoryEntry(width, height, size, offset) {
                var buffer = new ArrayBuffer(16);
                var view = new DataView(buffer);
                view.setUint8(0, width); // Pixel width (0..256). 0 = 256 pixels.
                view.setUint8(1, height); // Pixel height (0..256). 0 = 256 pixels.
                view.setUint8(2, 0); // Number of colors in pallet. 0 = no pallet.
                view.setUint8(3, 0); // Reserved. Should be 0.
                view.setUint16(4, 1, true); // Color planes. 0 or 1.
                view.setUint16(6, 32, true); // Specifies bits per pixel.
                view.setUint32(8, size, true); // Image size (bytes).
                view.setUint32(12, offset, true); // Offset to BMP of PNG.
                return this.arrayBufferToBinary(buffer);
            }
        },
        {
            key: "createBitmapInfoHeader",
            value: function createBitmapInfoHeader(width, height) {
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
                return this.arrayBufferToBinary(buffer);
            }
        },
        {
            key: "arrayBufferToBinary",
            value: function arrayBufferToBinary(buffer) {
                var binary = "";
                var bytes = new Uint8Array(buffer);
                var len = bytes.byteLength;
                for(var i = 0; i < len; i++)binary += String.fromCharCode(bytes[i]);
                return binary;
            }
        },
        {
            key: "Uint8ArrayToBinary",
            value: function Uint8ArrayToBinary(Uint8Array) {
                var binary = "";
                var bytes = Uint8Array;
                var len = bytes.byteLength;
                for(var i = 0; i < len; i++)binary += String.fromCharCode(bytes[i]);
                return binary;
            }
        }
    ]);
    return $b7682bb6491fbddd$var$Ico;
}();
var $b7682bb6491fbddd$export$2e2bcd8739ae039 = $b7682bb6491fbddd$var$Ico;




var $1387984658b9a595$export$2e2bcd8739ae039 = /*#__PURE__*/ function() {
    "use strict";
    function $1387984658b9a595$export$2e2bcd8739ae039(canvas) {
        $kYE3G$swchelpers.classCallCheck(this, $1387984658b9a595$export$2e2bcd8739ae039);
        this.canvas = canvas;
    }
    $kYE3G$swchelpers.createClass($1387984658b9a595$export$2e2bcd8739ae039, [
        {
            key: "generate",
            value: function generate(size) {
                return new $0915a8760e5143b1$export$2e2bcd8739ae039(this.canvas).generate(size, size).toDataURL();
            }
        }
    ]);
    return $1387984658b9a595$export$2e2bcd8739ae039;
}();


var $df1f8b647d3692e8$var$Bundle = /*#__PURE__*/ function() {
    "use strict";
    function $df1f8b647d3692e8$var$Bundle(canvas) {
        $kYE3G$swchelpers.classCallCheck(this, $df1f8b647d3692e8$var$Bundle);
        this.canvas = canvas;
    }
    $kYE3G$swchelpers.createClass($df1f8b647d3692e8$var$Bundle, [
        {
            key: "generate",
            value: function generate() {
                var ico = new $b7682bb6491fbddd$export$2e2bcd8739ae039(this.canvas);
                var png = new $1387984658b9a595$export$2e2bcd8739ae039(this.canvas);
                return {
                    ico: ico.generate([
                        16,
                        32,
                        48
                    ]),
                    png16: png.generate(16),
                    png32: png.generate(32),
                    png150: png.generate(150),
                    png180: png.generate(180),
                    png192: png.generate(192),
                    png512: png.generate(512)
                };
            }
        }
    ]);
    return $df1f8b647d3692e8$var$Bundle;
}();
var $df1f8b647d3692e8$export$2e2bcd8739ae039 = $df1f8b647d3692e8$var$Bundle;





var $a90b4fa48e74fdf7$var$FaviconJS = /*#__PURE__*/ function() {
    "use strict";
    function $a90b4fa48e74fdf7$var$FaviconJS(canvas) {
        $kYE3G$swchelpers.classCallCheck(this, $a90b4fa48e74fdf7$var$FaviconJS);
        this.canvas = canvas;
    }
    $kYE3G$swchelpers.createClass($a90b4fa48e74fdf7$var$FaviconJS, [
        {
            key: "bundle",
            value: function bundle() {
                return new $df1f8b647d3692e8$export$2e2bcd8739ae039(this.canvas).generate();
            }
        },
        {
            key: "ico",
            value: function ico(sizes) {
                return new $b7682bb6491fbddd$export$2e2bcd8739ae039(this.canvas).generate(sizes);
            }
        },
        {
            key: "png",
            value: function png(size) {
                return new $1387984658b9a595$export$2e2bcd8739ae039(this.canvas).generate(size);
            }
        },
        {
            key: "resize",
            value: function resize(size) {
                return new $0915a8760e5143b1$export$2e2bcd8739ae039(this.canvas).generate(size, size);
            }
        }
    ]);
    return $a90b4fa48e74fdf7$var$FaviconJS;
}();
var $a90b4fa48e74fdf7$export$2e2bcd8739ae039 = $a90b4fa48e74fdf7$var$FaviconJS;


//# sourceMappingURL=favicon.js.map
