const contactForm = document.querySelector(".contact-form");
const contactStatus = document.querySelector(".contact-status");
const submitButton = contactForm.querySelector("button[type='submit']");

function setContactStatus(message, state = "") {
  contactStatus.textContent = message;
  contactStatus.dataset.state = state;
}

contactForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (!contactForm.checkValidity()) {
    contactForm.reportValidity();
    return;
  }

  const formData = new FormData(contactForm);
  if (formData.get("website")) {
    setContactStatus("Thank you. Your message has been sent.", "success");
    contactForm.reset();
    return;
  }

  const endpoint = contactForm.dataset.endpoint.trim();
  if (!endpoint || endpoint.includes("YOUR_FORM_ID")) {
    setContactStatus("This contact form is still being configured. Please check back shortly.", "error");
    return;
  }

  submitButton.disabled = true;
  submitButton.textContent = "Sending...";
  setContactStatus("", "");

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      body: formData,
      headers: { Accept: "application/json" }
    });

    if (!response.ok) throw new Error("Message could not be sent.");

    contactForm.reset();
    setContactStatus("Thank you. Your message has been sent.", "success");
  } catch {
    setContactStatus("Your message could not be sent right now. Please try again soon.", "error");
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = "Send";
  }
});
