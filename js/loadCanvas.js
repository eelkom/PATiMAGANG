export default function loadCanvas() {
  const PI2 = Math.PI * 2;
  console.log(PI2);

  const container = document.querySelector(".canvas-container");
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  container.appendChild(canvas);
  console.log(container);

  const dumy = [1, 2, 3, 4, 5, 6, 7];
  const state = {
    isDown: false,
    moveX: 0,
    offsetX: 0,
  };
  let pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;
  let width = document.body.clientWidth;
  let height = document.body.clientHeight;

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
    width = document.body.clientWidth;
    height = document.body.clientHeight;
    canvas.width = width * pixelRatio;
    canvas.height = height * pixelRatio;
    ctx.scale(pixelRatio, pixelRatio);
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);
    makePolygon();
    window.requestAnimationFrame(() => {
      animate();
    });

    state.moveX *= 0.92;
  }

  let rotate = 0;
  function makePolygon() {
    let x = width / 2;
    let y = height / 1;
    let radius = height / 3;
    let sides = dumy.length;

    ctx.save();
    const angle = PI2 / sides;

    ctx.translate(x, y);
    rotate += state.moveX * 0.008;
    ctx.rotate(rotate);
    for (let i = 0; i < sides; i++) {
      const px = radius * Math.cos(angle * i);
      const py = radius * Math.sin(angle * i);

      ctx.fillStyle = "rgba(255, 127, 80, 1)";

      ctx.beginPath();
      ctx.arc(px, py, 10, 0, PI2, false);
      ctx.fill();
      ctx.closePath();
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
