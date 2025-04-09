import { navigate } from "gatsby";
import { useEffect } from "react";
import Seo from "../components/seo";
import * as React from "react";

const NotFoundPage = () => {
  useEffect(() => {
    navigate("/");
  }, []);

  return null;
};

export const Head = () => (
  <Seo title="404: Not Found" description="This page doesn't exist" />
);

export default NotFoundPage;
