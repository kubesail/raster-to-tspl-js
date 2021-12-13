// simple code for
// MIT license

const jimp = require("jimp");
const fs = require("fs");

const THRESHOLD = 2500000000; // RGBA value in int form

// 255 min; (r0 g0 b0 a255)
// 4294967295; max (r255 g255 b255 a255)

const COLS = 248;
const ROWS = 203;
// const COLS = 16;
// const ROWS = 2;

jimp.read("qr.png", async (err, image) => {
  //image.resize(COLS, ROWS).grayscale();
  const img = new Buffer.alloc((COLS / 8) * ROWS);
  for (let row = 0; row < ROWS; row++) {
    for (let byte = 0; byte < COLS / 8; byte++) {
      let byteData = 0;
      for (let bit = 0; bit < 8; bit++) {
        const pixelX = byte * 8 + bit;
        const pixelY = row;
        const val = image.getPixelColor(pixelX, pixelY);
        if (val > THRESHOLD) {
          byteData = byteData | (1 << (7 - bit));
        }
      }
      img[row * (COLS / 8) + byte] = byteData;
      // console.log({ byteData, img, row, byte });
    }
  }

  const label = Buffer.concat([
    Buffer.alloc(512), // 512 NUL bytes to start a new label
    Buffer.from("\r\nSIZE 31.7 mm, 25.4 mm"),
    Buffer.from("\r\nSPEED 1.5"),
    Buffer.from("\r\nSET TEAR ON"),
    Buffer.from("\r\nSET CUTTER OFF"),
    Buffer.from("\r\nSET PEEL OFF"),
    Buffer.from("\r\nCLS"),
    Buffer.from("\r\nBITMAP 0,0,31,203,1,"),
    img,
    Buffer.from("\r\nPRINT 1,1"),
    Buffer.from("\r\n"),
  ]);
  // fs.writeFileSync("out.tspl", label); //for debugging
  fs.writeFileSync("/dev/usb/lp0", label);
});
