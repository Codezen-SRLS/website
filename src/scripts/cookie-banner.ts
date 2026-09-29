// Client behaviour for CookieBanner.astro, bundled into the single site script (see Base.astro)
import { acceptAnalytics, getConsent, onOpenCookieSettings, rejectAnalytics } from "../lib/consent";

const banner = document.getElementById("cookie-banner");
if (banner) {
  // Pad the page by the banner's height so it never hides the footer or a CTA
  const reserve = () => {
    document.body.style.paddingBottom = banner.hidden ? "" : `${banner.offsetHeight + 32}px`;
  };
  const show = () => {
    banner.hidden = false;
    reserve();
  };
  new ResizeObserver(reserve).observe(banner);
  if (!getConsent()) show();
  onOpenCookieSettings(show);
  banner.querySelectorAll<HTMLButtonElement>("[data-consent]").forEach((btn) =>
    btn.addEventListener("click", () => {
      banner.hidden = true;
      reserve();
      if (btn.dataset.consent === "accept") acceptAnalytics();
      else rejectAnalytics();
    })
  );
}
