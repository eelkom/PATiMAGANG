import checkNavPos from "./checkNavPos.js";
import loadCanvas from "./loadCanvas.js";

const image = new Image();
image.src = "../src/PATiMAGANG.png";

function init() {
  checkNavPos();
  loadCanvas(image);
}

image.onload = () => {
  init();
};
