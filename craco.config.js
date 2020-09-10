require("dotenv/config");

const { pick } = require("lodash");
const { DefinePlugin } = require("webpack");

module.exports = {
  babel: {
    plugins: [
      [
        "babel-plugin-styled-components",
        {
          displayName: process.env.NODE_ENV === "development",
        },
      ],
    ],
  },
  webpack: {
    plugins: [
      new DefinePlugin({
        "process.env": JSON.stringify(pick(process.env, ["SERVER_URL"])),
      }),
    ],
  },
};
