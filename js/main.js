import checkNavPos from "./checkNavPos.js";
import loadCanvas from "./loadCanvas.js";

function init() {
  const image = new Image();
  image.src = "../src/PATiMAGANG.png";
  checkNavPos();
  image.onload = () => {
    loadCanvas(image);
  };
}
init();
