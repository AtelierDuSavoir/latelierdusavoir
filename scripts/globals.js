const currentUrl = window.location.href;
const currentFile = currentUrl.split("/").pop();

const mainNav = document.querySelectorAll(".main-nav a");

for (let i = 0; i < mainNav.length; i++) {
  const currentClass = mainNav[i].classList.value;

  if (currentClass === "active") {
    mainNav[i].classList.remove("active");
  }

  if (mainNav[i].href.endsWith(currentFile)) {
    mainNav[i].classList.add("active");
  }
}
