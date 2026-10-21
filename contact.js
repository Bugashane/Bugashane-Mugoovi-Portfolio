const contactForm = document.querySelector(".contact-form");
const contactStatus = document.querySelector(".contact-status");
const submitButton = contactForm.querySelector("button[type='submit']");

function setContactStatus(message, state = "") {
  contactStatus.textContent = message;
  contactStatus.dataset.state = state;
}

async function formErrorMessage(response) {
  try {
    const payload = await response.json();
    const detail = payload.errors?.[0]?.message || payload.error;

    if (detail) {
      return `Your message could not be sent: ${detail}.`;
    }
  } catch {
    // Use the status-based message below when the service does not return JSON.
  }

  if (response.status === 403) {
    return "This contact form is not currently accepting messages from this site. Please email smugoovi@gmail.com directly.";
  }

  if (response.status === 429) {
    return "Too many messages were sent in a short time. Please wait a moment and try again.";
  }

  return "Your message could not be sent right now. Please try again soon.";
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

    if (!response.ok) {
      setContactStatus(await formErrorMessage(response), "error");
      return;
    }

    contactForm.reset();
    setContactStatus("Thank you. Your message has been sent.", "success");
  } catch {
    setContactStatus("The contact service could not be reached. Please check your connection and try again.", "error");
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = "Send";
  }
});
