/* global window */

let graphlib

if (typeof require === 'function') {
  try {
    graphlib = require('graphlib')
  } catch (e) {}
}

if (!graphlib) {
  graphlib = window.graphlib
}

module.exports = graphlib
