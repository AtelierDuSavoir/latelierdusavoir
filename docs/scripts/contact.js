
document.addEventListener("DOMContentLoaded", function () {

  const forms = document.querySelectorAll("form[action*='formspree.io']");

  forms.forEach((form) => {

    form.addEventListener("submit", async function (e) {
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

  const button = form.querySelector("button");

  // Transformation du bouton
  button.textContent = "Envoyé ✅";
  button.disabled = true;
  button.classList.add("sent");

  // Footer message
  const footerMessage = form.querySelector(".form-message");
  if (footerMessage) {
    footerMessage.textContent = "Merci ✨ Nous vous recontactons très rapidement.";
    footerMessage.classList.add("success");
  }

  // Contact page message
  const contactMessage = form.querySelector("#contactMessage");
  if (contactMessage) {
    contactMessage.textContent = "Merci ✨ Votre message a bien été envoyé.";
    contactMessage.style.display = "block";
  }


        } else {
          throw new Error("Erreur réseau");
        }

      } catch (error) {
        alert("Une erreur est survenue. Merci de réessayer.");
      }

    });

  });

});