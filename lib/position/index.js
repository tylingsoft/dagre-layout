import _ from '../lodash'
const util = require('../util')
const positionX = require('./bk').positionX

module.exports = position

function position (g) {
  g = util.asNonCompoundGraph(g)

  positionY(g)
  _.each(positionX(g), function (x, v) {
    g.node(v).x = x
  })
}

function positionY (g) {
  const layering = util.buildLayerMatrix(g)
  const rankSep = g.graph().ranksep
  let prevY = 0
  _.each(layering, function (layer) {
    const maxHeight = _.max(_.map(layer, function (v) { return g.node(v).height }))
    _.each(layer, function (v) {
      g.node(v).y = prevY + maxHeight / 2
    })
    prevY += maxHeight + rankSep
  })
}
