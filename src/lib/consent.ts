// Analytics only load after the visitor opts in (ePrivacy Directive / Garante guidelines).
export const STORAGE_KEY = "cz-analytics-consent";
const OPEN_EVENT = "cz:open-cookie-settings";
const ANALYTICS_COOKIES = /^(_ga|_ga_.*|_clck|_clsk)$/;

// Same variable names as the CI secrets (see envPrefix in astro.config.ts)
const GA_ID: string | undefined = import.meta.env.GA_TRACKING_ID;
const CLARITY_ID: string | undefined = import.meta.env.GATSBY_CLARITY_ID;

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
    clarity?: (...args: unknown[]) => void;
    [key: `ga-disable-${string}`]: boolean;
  }
}

let analyticsLoaded = false;

// Clarity's loader is only fetched once the visitor has opted in
const clarity = () => import("@microsoft/clarity").then((m) => m.default);

export const getConsent = () => {
  try {
    return window.localStorage.getItem(STORAGE_KEY);
  } catch (_) {
    return null;
  }
};

const storeConsent = (value: "granted" | "denied") => {
  try {
    window.localStorage.setItem(STORAGE_KEY, value);
  } catch (_) {}
};

export const loadAnalytics = (): Promise<void> | void => {
  if (analyticsLoaded || typeof window === "undefined") return;
  analyticsLoaded = true;

  if (GA_ID) {
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
    document.head.appendChild(script);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() {
      // gtag.js only accepts the `arguments` object, not a spread array
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer.push(arguments);
    };
    // Analytics only; no advertising signals are ever granted
    window.gtag("consent", "default", {
      analytics_storage: "granted",
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
    });
    window.gtag("js", new Date());
    // Page views are sent by trackPageView, so config must not send its own
    window.gtag("config", GA_ID, { send_page_view: false });
  }

  if (CLARITY_ID) {
    const id = CLARITY_ID;
    return clarity().then((Clarity) => {
      Clarity.init(id);
      Clarity.consentV2({ analytics_Storage: "granted", ad_Storage: "denied" });
    });
  }
};

// Called on every page load (with consent) and right after the visitor accepts
export const trackPageView = (location: Location) => {
  if (typeof window.gtag === "function") {
    window.gtag("event", "page_view", {
      page_path: `${location.pathname}${location.search}${location.hash}`,
    });
  }
  if (CLARITY_ID) {
    const page = location.pathname;
    clarity().then((Clarity) => Clarity.setTag("page", page));
  }
};

const clearAnalyticsCookies = () => {
  const host = window.location.hostname;
  const domains = ["", host, `.${host}`, `.${host.replace(/^www\./, "")}`];
  document.cookie.split(";").forEach((entry) => {
    const name = entry.split("=")[0].trim();
    if (!ANALYTICS_COOKIES.test(name)) return;
    domains.forEach((domain) => {
      document.cookie = `${name}=; Max-Age=0; path=/${domain ? `; domain=${domain}` : ""}`;
    });
  });
};

export const acceptAnalytics = async () => {
  storeConsent("granted");
  await loadAnalytics();
  trackPageView(window.location);
};

export const rejectAnalytics = async () => {
  const wasLoaded = analyticsLoaded;
  storeConsent("denied");
  if (wasLoaded) {
    // Stop both tools immediately, before their cookies are cleared, so no hits
    // (e.g. GA's user_engagement on unload) are sent after withdrawal
    if (GA_ID) window[`ga-disable-${GA_ID}`] = true;
    if (CLARITY_ID && typeof window.clarity === "function") {
      (await clarity()).consentV2({ analytics_Storage: "denied", ad_Storage: "denied" });
    }
  }
  clearAnalyticsCookies();
  // Already-running scripts can only be fully removed by reloading without them
  if (wasLoaded) window.location.reload();
};

export const openCookieSettings = () => window.dispatchEvent(new Event(OPEN_EVENT));

export const onOpenCookieSettings = (handler: () => void) => {
  window.addEventListener(OPEN_EVENT, handler);
  return () => window.removeEventListener(OPEN_EVENT, handler);
};
