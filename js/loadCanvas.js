export default function loadCanvas(image) {
  const PI2 = Math.PI * 2;

  const container = document.querySelector(".canvas-container");
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  container.appendChild(canvas);

  const dumy = [1, 2, 3, 3, 6, 5, 4, 3];
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
    let x = width / 2;
    let y = width > 700 ? height / 0.8 : height / 0.9;
    let radius = width > 700 ? height / 2.5 : height / 3.5;
    let sides = dumy.length;

    ctx.save();
    ctx.fillStyle = "rgba(255, 127, 80, 1)";

    const angle = PI2 / sides;

    ctx.translate(x, y);
    rotate += state.moveX * 0.008;
    ctx.rotate(rotate);

    for (let i = 0; i < sides; i++) {
      const px = radius * Math.cos(angle * i);
      const py = radius * Math.sin(angle * i);

      ctx.save();
      ctx.translate(px, py);
      ctx.rotate(angle * i);

      ctx.globalAlpha = 0.1;
      ctx.beginPath();
      ctx.roundRect(-10, -30, 160 * 1.3, 90 * 1.3, 12);
      // ctx.arc(px, py, 50, 0, PI2, false);
      ctx.clip();

      ctx.drawImage(image, -10, -30, 160 * 1.3, 90 * 1.3);

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
