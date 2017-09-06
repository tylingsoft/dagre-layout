const __ = require('lodash3')
const _ = require('lodash')
const util = require('../util')
const positionX = require('./bk').positionX

module.exports = position

function position (g) {
  g = util.asNonCompoundGraph(g)

  positionY(g)
  __.each(positionX(g), function (x, v) {
    g.node(v).x = x
  })
}

function positionY (g) {
  const layering = util.buildLayerMatrix(g)
  const rankSep = g.graph().ranksep
  let prevY = 0
  __.each(layering, function (layer) {
    const maxHeight = __.max(__.map(layer, function (v) { return g.node(v).height }))
    __.each(layer, function (v) {
      g.node(v).y = prevY + maxHeight / 2
    })
    prevY += maxHeight + rankSep
  })
}
