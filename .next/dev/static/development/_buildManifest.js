self.__BUILD_MANIFEST = {
  "/": [
    "static/chunks/pages/index.js"
  ],
  "/cart": [
    "static/chunks/pages/cart.js"
  ],
  "/dashboard": [
    "static/chunks/pages/dashboard.js"
  ],
  "/product/[id]": [
    "static/chunks/pages/product/[id].js"
  ],
  "__rewrites": {
    "afterFiles": [],
    "beforeFiles": [],
    "fallback": []
  },
  "sortedPages": [
    "/",
    "/_app",
    "/_error",
    "/cart",
    "/dashboard",
    "/product/[id]"
  ]
};self.__BUILD_MANIFEST_CB && self.__BUILD_MANIFEST_CB()