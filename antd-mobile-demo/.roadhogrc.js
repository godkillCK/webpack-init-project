const webpack = require('webpack');
const pxtorem = require('postcss-pxtorem');

export default {
  entry: "src/pages/*.js",
  autoprefixer: {
    "browsers": [
      "iOS >= 8", "Android >= 4"
    ]
  },
  extraPostCSSPlugins: [
    pxtorem({
      rootValue: 100,
      propWhiteList: [],
    }),
  ],
  multipage: true,
  env: {
    "development": {
      "extraBabelPlugins": [
        "dva-hmr",
        "transform-runtime",
        ["import", { "libraryName": "antd-mobile", "style": true }]
      ]
    },
    "production": {
      "extraBabelPlugins": [
        "transform-runtime",
        ["import", { "libraryName": "antd-mobile", "style": true }]
      ]
    }
  },
  theme: "./src/theme.js"
};
