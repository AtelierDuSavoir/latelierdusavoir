const main = document.querySelector("main");

function updateMainHeight() {
  main.style.setProperty("--main-height", `${main.offsetHeight}px`);
}

let resizeTimer;

window.addEventListener("resize", () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(updateMainHeight, 100);
});

updateMainHeight();
