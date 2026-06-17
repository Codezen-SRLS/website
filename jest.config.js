module.exports = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["@testing-library/jest-dom"],
  transform: {
    "^.+\\.[jt]sx?$": "babel-jest",
  },
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "\\.(svg|png|jpg|jpeg|gif|webp|mp4)$": "<rootDir>/src/__mocks__/fileMock.js",
    "^gatsby$": "<rootDir>/src/__mocks__/gatsby.js",
    "^gatsby-plugin-image$": "<rootDir>/src/__mocks__/gatsby-plugin-image.js",
    "^@reach/router$": "<rootDir>/src/__mocks__/reach-router.js",
    "^@emailjs/browser$": "<rootDir>/src/__mocks__/emailjs.js",
  },
  testMatch: ["<rootDir>/src/__tests__/**/*.test.[jt]s?(x)"],
  testPathIgnorePatterns: ["/node_modules/", "/.cache/", "/public/"],
};
