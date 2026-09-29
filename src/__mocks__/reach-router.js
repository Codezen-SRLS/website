// Tests can set __setPathname to render components as if on another page.
let pathname = "/";

module.exports = {
  useLocation: () => ({ pathname }),
  __setPathname: (value) => {
    pathname = value;
  },
};
