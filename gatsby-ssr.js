import * as React from "react";

// Flag that JS is running before first paint, so scroll-reveal styles only
// hide content when the script that reveals it will actually run.
export const onRenderBody = ({ setHeadComponents }) => {
  setHeadComponents([
    <script
      key="cz-js-flag"
      dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('cz-js')" }}
    />,
  ]);
};
