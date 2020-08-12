const proxy = require("http-proxy-middleware");

module.exports = app => {
  app.use(
    "/auth",
    proxy({
      target: process.env.REACT_APP_PROXY_API_ENDPOINT,
      changeOrigin: true
    })
  );
  app.use(
    "/api",
    proxy({
      target: process.env.REACT_APP_PROXY_API_ENDPOINT,
      changeOrigin: true
    })
  );
};