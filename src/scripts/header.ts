// Client behaviour for Header.astro, bundled into the single site script (see Base.astro)
const menu = document.getElementById("mobile-menu") as HTMLDialogElement | null;
const opener = document.querySelector<HTMLButtonElement>("[data-menu-open]");
if (menu && opener) {
  opener.addEventListener("click", () => {
    menu.showModal();
    document.documentElement.classList.add("scroll-lock");
  });
  menu.addEventListener("close", () => document.documentElement.classList.remove("scroll-lock"));
  // Links and the request button close the menu first, then do their job
  menu.querySelectorAll("[data-menu-close]").forEach((el) => el.addEventListener("click", () => menu.close()));
  // Tapping the backdrop closes the menu
  menu.addEventListener("click", (e) => {
    if (e.target === menu) menu.close();
  });
  // Leaving the mobile breakpoint with the menu open
  matchMedia("(min-width: 900px)").addEventListener("change", (e) => e.matches && menu.open && menu.close());
}

export {};
