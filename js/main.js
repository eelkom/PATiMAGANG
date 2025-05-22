import checkNavPos from "./checkNavPos.js";
import loadCanvas from "./loadCanvas.js";

const image = new Image();
image.src = "../src/cover.png";

function init() {
  checkNavPos();
  loadCanvas(image);
}

image.onload = () => {
  init();
};
