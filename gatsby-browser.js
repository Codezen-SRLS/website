import "./src/styles/global.css";
import Clarity from "@microsoft/clarity";
import { hydrateRoot } from "react-dom/client";

export const onClientEntry = () => {
  const projectId = process.env.GATSBY_CLARITY_ID;
  if (projectId) {
    Clarity.init(projectId);
  }
};

export const onRouteUpdate = ({ location }) => {
  if (typeof window !== "undefined" && typeof window.clarity === "function") {
    Clarity.setTag("page", location.pathname);
  }
};

// gatsby-plugin-image renders <noscript><picture/></noscript> in its browser
// bundle, but browsers with JS enabled parse noscript content as a raw text
// node — not as child elements. React 18's strict hydrateRoot throws error
// #425 ("Text content did not match") for every GatsbyImage on the page.
// These are recoverable: React re-renders the affected image subtrees on the
// client and the images load correctly. We silence them here so they don't
// surface as uncaught errors in production.
export const replaceHydrateFunction = () => {
  return (element, container) => {
    return hydrateRoot(container, element, {
      onRecoverableError(error) {
        const msg = error && error.message ? error.message : String(error);
        if (
          msg.includes("Minified React error #425") ||
          msg.includes("Minified React error #418") ||
          msg.includes("Minified React error #423") ||
          msg.includes("Text content did not match") ||
          msg.includes("Hydration failed")
        ) {
          return;
        }
        console.error(error);
      },
    });
  };
};
