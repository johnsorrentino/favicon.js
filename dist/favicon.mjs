class $058517cf1355ff1a$var$Resize {
    /**
   * Resize the canvas by halving the width and height. This produces better
   * sampling and the image quality is generally better.
   */ generate(width, height) {
        while(this.canvas.width / 2 >= width)this._resize(this.canvas.width / 2, this.canvas.height / 2);
        if (this.canvas.width > width) this._resize(width, height);
        return this.canvas;
    }
    /**
   * Simple resize of a canvas element.
   */ _resize(width, height) {
        let canvas = document.createElement("canvas");
        let resizedContext = canvas.getContext("2d");
        canvas.width = width;
        canvas.height = height;
        resizedContext.drawImage(this.canvas, 0, 0, width, height);
        this.canvas = canvas;
    }
    constructor(canvas){
        this.canvas = canvas;
    }
}
var $058517cf1355ff1a$export$2e2bcd8739ae039 = $058517cf1355ff1a$var$Resize;


class $9b5b47f028ff428c$var$Ico {
    generate(sizes = [
        16,
        32,
        48
    ]) {
        const canvasMaster = new $058517cf1355ff1a$export$2e2bcd8739ae039(this.canvas).generate(128, 128);
        const iconDirectoryHeader = this.createIconDirectoryHeader(sizes.length);
        let iconDirectoryEntries = "";
        let bitmapData = "";
        for(let i = 0; i < sizes.length; i++){
            const size = sizes[i];
            const canvas = new $058517cf1355ff1a$export$2e2bcd8739ae039(canvasMaster).generate(size, size);
            const context = canvas.getContext("2d");
            const width = canvas.width;
            const height = canvas.height;
            const imageData = context.getImageData(0, 0, width, height);
            const bitmapInfoHeader = this.createBitmapInfoHeader(width, height);
            const bitmapImageData = this.createBitmapImageData(canvas);
            const bitmapSize = bitmapInfoHeader.length + bitmapImageData.length;
            const bitmapOffset = this.calculateBitmapOffset(sizes, i);
            iconDirectoryEntries += this.createIconDirectoryEntry(width, height, bitmapSize, bitmapOffset);
            bitmapData += bitmapInfoHeader + bitmapImageData;
        }
        const binary = iconDirectoryHeader + iconDirectoryEntries + bitmapData;
        const base64 = "data:image/x-icon;base64," + btoa(binary);
        return base64;
    }
    /**
   * Calculates the location to the bitmap entry.
   */ calculateBitmapOffset(sizes, entry) {
        let offset = 6; // icon header size
        offset += 16 * sizes.length; // icon entry header size
        // size of previous bitmaps
        for(let i = 0; i < entry; i++){
            const size = sizes[i];
            offset += 40; // bitmap header size
            offset += 4 * size * size; // bitmap data size
            offset += 2 * size * size / 8; // bitmap mask size
        }
        return offset;
    }
    createBitmapImageData(canvas) {
        const ctx = canvas.getContext("2d");
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const bitmapPixelData = new Uint32Array(imageData.data.buffer);
        const bitmapBuffer = bitmapPixelData.reverse().buffer;
        const bitmapMask = new Uint8Array(canvas.width * canvas.height * 2 / 8);
        bitmapMask.fill(0);
        let binary = this.arrayBufferToBinary(this.canvasToBitmap(canvas));
        binary += this.Uint8ArrayToBinary(bitmapMask);
        return binary;
    }
    canvasToBitmap(canvas) {
        const ctx = canvas.getContext("2d");
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const rgbaData8 = imageData.data;
        const bgraData8 = new Uint8ClampedArray(imageData.data.length);
        for(let i = 0; i < rgbaData8.length; i += 4){
            const r = rgbaData8[i];
            const g = rgbaData8[i + 1];
            const b = rgbaData8[i + 2];
            const a = rgbaData8[i + 3];
            bgraData8[i] = b;
            bgraData8[i + 1] = g;
            bgraData8[i + 2] = r;
            bgraData8[i + 3] = a;
        }
        const bgraData32 = new Uint32Array(bgraData8.buffer);
        const bgraData32Rotated = new Uint32Array(bgraData32.length);
        for(let i1 = 0; i1 < bgraData32.length; i1++){
            const xPos = i1 % canvas.width;
            const yPos = Math.floor(i1 / canvas.width);
            const xPosRotated = xPos;
            const yPosRotated = canvas.height - 1 - yPos;
            const indexRotated = yPosRotated * canvas.width + xPosRotated;
            const pixel = bgraData32[i1];
            bgraData32Rotated[indexRotated] = pixel;
        }
        return bgraData32Rotated.buffer;
    }
    createIconDirectoryHeader(numImages) {
        const buffer = new ArrayBuffer(6);
        const view = new DataView(buffer);
        view.setUint16(0, 0, true); // Reserved. Must always be 0.
        view.setUint16(2, 1, true); // Specifies type. 1 = ICO.
        view.setUint16(4, numImages, true); // Number of images.
        return this.arrayBufferToBinary(buffer);
    }
    createIconDirectoryEntry(width, height, size, offset) {
        const buffer = new ArrayBuffer(16);
        const view = new DataView(buffer);
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
    createBitmapInfoHeader(width, height) {
        const buffer = new ArrayBuffer(40);
        const view = new DataView(buffer);
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
    arrayBufferToBinary(buffer) {
        let binary = "";
        const bytes = new Uint8Array(buffer);
        const len = bytes.byteLength;
        for(let i = 0; i < len; i++)binary += String.fromCharCode(bytes[i]);
        return binary;
    }
    Uint8ArrayToBinary(Uint8Array) {
        let binary = "";
        const bytes = Uint8Array;
        const len = bytes.byteLength;
        for(let i = 0; i < len; i++)binary += String.fromCharCode(bytes[i]);
        return binary;
    }
    constructor(canvas){
        this.canvas = canvas;
    }
}
var $9b5b47f028ff428c$export$2e2bcd8739ae039 = $9b5b47f028ff428c$var$Ico;



class $faba7f80617af102$export$2e2bcd8739ae039 {
    generate(size) {
        return new $058517cf1355ff1a$export$2e2bcd8739ae039(this.canvas).generate(size, size).toDataURL();
    }
    constructor(canvas){
        this.canvas = canvas;
    }
}


class $4953411d24246927$var$Bundle {
    generate() {
        const ico = new $9b5b47f028ff428c$export$2e2bcd8739ae039(this.canvas);
        const png = new $faba7f80617af102$export$2e2bcd8739ae039(this.canvas);
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
    constructor(canvas){
        this.canvas = canvas;
    }
}
var $4953411d24246927$export$2e2bcd8739ae039 = $4953411d24246927$var$Bundle;





class $2361830c7095c6f6$var$FaviconJS {
    bundle() {
        return new $4953411d24246927$export$2e2bcd8739ae039(this.canvas).generate();
    }
    ico(sizes) {
        return new $9b5b47f028ff428c$export$2e2bcd8739ae039(this.canvas).generate(sizes);
    }
    png(size) {
        return new $faba7f80617af102$export$2e2bcd8739ae039(this.canvas).generate(size);
    }
    resize(size) {
        return new $058517cf1355ff1a$export$2e2bcd8739ae039(this.canvas).generate(size, size);
    }
    constructor(canvas){
        this.canvas = canvas;
    }
}
var $2361830c7095c6f6$export$2e2bcd8739ae039 = $2361830c7095c6f6$var$FaviconJS;


export {$2361830c7095c6f6$export$2e2bcd8739ae039 as default};
//# sourceMappingURL=favicon.mjs.map
