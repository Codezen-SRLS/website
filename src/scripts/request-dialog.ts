// Client behaviour for RequestDialog.astro, bundled into the single site script (see Base.astro)
const dialog = document.getElementById("request-dialog") as HTMLDialogElement | null;

if (dialog) {
  const form = dialog.querySelector("form")!;
  const formView = dialog.querySelector<HTMLElement>("[data-rq-form-view]")!;
  const doneView = dialog.querySelector<HTMLElement>("[data-rq-done-view]")!;
  const error = dialog.querySelector<HTMLElement>("[data-rq-error]")!;
  const submit = dialog.querySelector<HTMLButtonElement>("[data-rq-submit]")!;
  const submitLabel = submit.querySelector(".cz-btn__label")!;

  const reset = () => {
    form.reset();
    formView.hidden = false;
    doneView.hidden = true;
    error.hidden = true;
    form.querySelectorAll("[aria-invalid]").forEach((el) => el.removeAttribute("aria-invalid"));
  };

  const open = () => {
    if (dialog.open) return;
    reset();
    dialog.showModal();
    document.documentElement.classList.add("scroll-lock");
    dialog.querySelector<HTMLInputElement>("#rf-name")?.focus();
  };

  // Delegated so buttons rendered anywhere on the page work
  document.addEventListener("click", (e) => {
    const trigger = (e.target as Element).closest("[data-open-request]");
    if (!trigger) return;
    e.preventDefault();
    open();
  });
  dialog.querySelectorAll("[data-rq-close]").forEach((el) => el.addEventListener("click", () => dialog.close()));
  // Click on the backdrop (outside the panel) closes
  dialog.addEventListener("click", (e) => {
    if (e.target !== dialog) return;
    const r = dialog.getBoundingClientRect();
    const inside = e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom;
    if (!inside) dialog.close();
  });
  dialog.addEventListener("close", () => document.documentElement.classList.remove("scroll-lock"));

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    // Show native validation messages and mark invalid fields for screen readers
    let valid = true;
    form.querySelectorAll<HTMLInputElement>("input, textarea").forEach((el) => {
      const ok = el.checkValidity();
      el.toggleAttribute("aria-invalid", !ok);
      if (!ok) valid = false;
    });
    if (!valid) {
      form.reportValidity();
      return;
    }

    const data = new FormData(form);
    const fields = Object.fromEntries(["name", "email", "project", "details"].map((k) => [k, String(data.get(k) || "")]));
    submit.disabled = true;
    submitLabel.textContent = "Sending…";
    error.hidden = true;
    try {
      const { default: emailjs } = await import("@emailjs/browser");
      await emailjs.send(
        import.meta.env.GATSBY_EMAILJS_SERVICE_ID,
        import.meta.env.GATSBY_EMAILJS_TEMPLATE_ID,
        {
          from_name: fields.name,
          from_email: fields.email,
          project: fields.project,
          message: fields.details,
        },
        import.meta.env.GATSBY_EMAILJS_PUBLIC_KEY
      );
      const firstName = fields.name.trim().split(/\s+/)[0];
      dialog.querySelector("[data-rq-thanks]")!.textContent =
        `Thanks${firstName ? `, ${firstName}` : ""}. We will scope your audit and reply within one business day.`;
      formView.hidden = true;
      doneView.hidden = false;
      dialog.querySelector<HTMLElement>("[data-rq-done-title]")?.focus();
    } catch (_) {
      error.hidden = false;
    }
    submit.disabled = false;
    submitLabel.textContent = "Submit your request";
  });
}

export {};
