import openModal from "./openModal.js";

export default function loadCanvas(image) {
  const PI2 = Math.PI * 2;
  const cardData = [];

  const container = document.querySelector(".canvas-container");
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  container.appendChild(canvas);

  const state = {
    isDown: false,
    moveX: 0,
    offsetX: 0,
  };
  let pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;
  let width = window.innerWidth;
  let height = window.innerHeight;

  function init() {
    window.addEventListener("resize", () => {
      resize();
    });
    document.addEventListener("pointerdown", (e) => {
      onDown(e);
    });
    document.addEventListener("pointermove", (e) => {
      onMove(e);
    });
    document.addEventListener("pointerup", () => {
      onUp();
    });
    document.addEventListener("dblclick", (e) => {
      onCheck(e);
    });
    document.addEventListener("touch", (e) => {
      onCheck(e);
    });

    window.requestAnimationFrame(() => {
      animate();
    });
    resize();
  }

  function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width * pixelRatio;
    canvas.height = height * pixelRatio;
    ctx.scale(pixelRatio, pixelRatio);
  }

  function animate() {
    makePolygon();
    window.requestAnimationFrame(() => {
      animate();
    });

    state.moveX *= 0.92;
  }

  let rotate = 0;

  function makePolygon() {
    let x = width / 2;
    let y = width > 700 ? height / 2 : height / 2;
    let radius = width > 1200 ? height / 3 : height / 3.5;
    let ratio = width > 1200 ? 3 : 2.6;
    let sides = 9; // 영상 추가 시 직접 수정

    ctx.save();

    const angle = PI2 / sides;

    ctx.translate(x, y);
    rotate += state.moveX * 0.008;
    ctx.rotate(rotate);

    for (let i = 0; i < sides; i++) {
      const px = radius * Math.cos(angle * i);
      const py = radius * Math.sin(angle * i);

      cardData[i] = {
        cx: px + x,
        cy: py + y,
        width: 50 * (ratio + 1),
        height: 40 * (ratio + 1),
        angle: angle * i + rotate,
        index: (i - Math.round(rotate / angle) + sides) % sides,
      };

      ctx.save();
      ctx.translate(px, py);
      ctx.rotate(angle * i);

      ctx.globalAlpha = 0.1;
      ctx.beginPath();

      const w = 50 * ratio;
      const h = 40 * ratio;
      ctx.roundRect(-w / 2, -h / 2, w, h, 12);
      ctx.clip();
      ctx.drawImage(image, -w / 2, -h / 2, w, h);
      ctx.closePath();
      ctx.restore();
    }
    ctx.restore();
  }

  function onDown(e) {
    state.isDown = true;
    state.moveX = 0;
    state.offsetX = e.offsetX;
  }

  function onCheck(e) {
    const mx = e.clientX;
    const my = e.clientY;

    for (let card of cardData) {
      const dx = mx - card.cx;
      const dy = my - card.cy;

      const angle = -card.angle;
      const rx = dx * Math.cos(angle) - dy * Math.sin(angle);
      const ry = dx * Math.sin(angle) + dy * Math.cos(angle);

      if (
        rx >= -card.width / 2 &&
        rx <= card.width / 2 &&
        ry >= -card.height / 2 &&
        ry <= card.height / 2
      ) {
        openModal(card.index);
        break;
      }
    }
  }

  function onMove(e) {
    if (state.isDown) {
      state.moveX = e.offsetX - state.offsetX;
      state.offsetX = e.offsetX;
      ctx.clearRect(0, 0, width, height);
    }
  }

  function onUp() {
    state.isDown = false;
  }

  init();
}
