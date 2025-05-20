export default function checkNavPos() {
  let yOffset = 0;

  window.addEventListener("scroll", () => {
    yOffset = window.pageYOffset;

    if (yOffset > 0) {
      document.body.classList.add("nav-sticky");
    } else {
      document.body.classList.remove("nav-sticky");
    }
  });
}
