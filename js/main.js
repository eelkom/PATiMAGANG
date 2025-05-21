import checkNavPos from "./checkNavPos.js";
import loadCanvas from "./loadCanvas.js";

// const imageUrls = [
//   "../src/champagne supernova(신환회).png",
//   "../src/눈이 마주쳤을 때(겨울정기).png",
//   "../src/눈이 마주쳤을 때(신환회).png",
//   "../src/Neo(신환회).png",
//   "../src/Neo(겨울 정기).png",
//   "../src/Ling Ling(신환회).png",
//   "../src/Ling Ling(겨울 정기).png",
// ];
// const images = [];
// let loadedCount = 0;

// imageUrls.forEach((url) => {
//   const img = new Image();
//   img.src = url;
//   img.onload = () => {
//     loadedCount++;
//     if (loadedCount === imageUrls.length) {
//       init();
//     }
//   };
//   images.push(img);
// });

const image = new Image();
image.src = "../src/cover.png";

function init() {
  checkNavPos();
  loadCanvas(image);
}

image.onload = () => {
  init();
};
