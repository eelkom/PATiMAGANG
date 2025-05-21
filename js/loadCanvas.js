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
    // ctx.clearRect(0, 0, width, height);
    makePolygon();
    window.requestAnimationFrame(() => {
      animate();
    });

    state.moveX *= 0.92;
  }

  let rotate = 0;

  function makePolygon() {
    console.log("hi");
    let x = width / 2;
    let y = width > 700 ? height / 0.8 : height / 0.9;
    let radius = width > 700 ? height / 2.5 : height / 3.5;
    let sides = 7; // 직접 수정

    ctx.save();
    // ctx.fillStyle = "rgba(255, 127, 80, 1)";

    const angle = PI2 / sides;

    ctx.translate(x, y);
    rotate += state.moveX * 0.008;
    ctx.rotate(rotate);

    for (let i = 0; i < sides; i++) {
      const px = radius * Math.cos(angle * i);
      const py = radius * Math.sin(angle * i);

      cardData[i] = {
        cx: px + x, // 전체 기준 x 위치
        cy: py + y, // 전체 기준 y 위치
        width: 40 * 3,
        height: 50 * 3,
        angle: angle * i + rotate, // 실제 회전 각도
        index: (i - Math.round(rotate / angle) + sides) % sides,
      };

      ctx.save();
      ctx.translate(px, py);
      ctx.rotate(angle * i);

      ctx.globalAlpha = 0.1;
      ctx.beginPath();
      ctx.roundRect(-10, -30, 50 * 3, 40 * 3, 12);
      // ctx.arc(px, py, 50, 0, PI2, false);
      ctx.clip();

      ctx.drawImage(image, -10, -30, 50 * 3, 40 * 3);
      // ctx.fill();
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
      // 좌표 변환 (회전 고려)
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
