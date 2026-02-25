const form = document.getElementById("footerContactForm");
const message = document.getElementById("footerMessage");

if (form) {
  form.addEventListener("submit", async function(e) {
    e.preventDefault();

    const data = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: data,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        form.reset();
        message.textContent = "Merci ✨ Nous vous recontactons très rapidement.";
        message.classList.remove("error");
        message.classList.add("success", "show");
      } else {
        throw new Error("Erreur réseau");
      }

    } catch (error) {
      message.textContent = "Une erreur est survenue. Merci de réessayer.";
      message.classList.remove("success");
      message.classList.add("error", "show");
    }
  });
}