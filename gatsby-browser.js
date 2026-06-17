import "./src/styles/global.css";
import Clarity from "@microsoft/clarity";

export const onClientEntry = () => {
  const projectId = process.env.GATSBY_CLARITY_ID;
  if (projectId) {
    Clarity.init(projectId);
  }
};

export const onRouteUpdate = ({ location }) => {
  if (typeof Clarity.setTag === "function") {
    Clarity.setTag("page", location.pathname);
  }
};
