module.exports = {
  graphlib: require("./lib/graphlib"),

  layout: require("./lib/layout"),
  debug: require("./lib/debug"),
  util: {
    time: require("./lib/util").time,
    notime: require("./lib/util").notime
  },
  version: require("./lib/version")
};
