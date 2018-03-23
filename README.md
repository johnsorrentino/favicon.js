# Favicon.js

Favicon.js is a lightweight library that allows you to create an ICO formatted favicon from a canvas element.

## Usage

The favicon.js library takes two parameters: a canvas element and an array of sizes. The canvas element should include the image data that you want your favicon to contain. The list of sizes defines the dimensions of the images that will be included in the generated ICO file.

```JavaScript
const dataurl = faviconjs({
  canvas: canvas,
  sizes: [16, 32, 48]
});
```

## Example

The example below will generate an ICO formatted favicon that includes 3 sizes: 16x16, 32x32, and 48x48 pixels. The full example can be found [here](./examples).

![Preview](./examples/preview.png)

```JavaScript
// Setup canvas
const canvas = document.getElementById("canvas");
canvas.width = 128;
canvas.height = 128;
const context = canvas.getContext("2d");

// Draw background
context.fillStyle = "#d85537";
context.fillRect(0, 0, canvas.width, canvas.height);

// Draw text
context.fillStyle = "#FFFFFF";
context.font = "100px Helvetica";
context.textBaseline = "middle";
context.textAlign = "center";
const x = canvas.width / 2;
const y = canvas.height / 2;
context.fillText("F", x, y);

// Create favicon.ico dataurl
const dataurl = faviconjs({
  canvas: canvas,
  sizes: [16, 32, 48]
});

// Activate the download button
const download = document.getElementById("download");
download.href = dataurl;
download.setAttribute("download", "favicon.ico");
```
