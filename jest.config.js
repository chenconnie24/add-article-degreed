module.exports = {
    preset: "jest-puppeteer",
    globals: {
      URL: "http://localhost:8080"
    },
    // testMatch: [
    //   "**/test/**/*.test.js"
    // ],
    testMatch: [
        "**/*.test.js"
      ],
    verbose: true,
}