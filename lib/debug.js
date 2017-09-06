const __ = require('lodash3')
const _ = require('lodash')
const util = require('./util')
const Graph = require('./graphlib').Graph

module.exports = {
  debugOrdering: debugOrdering
}

/* istanbul ignore next */
function debugOrdering (g) {
  const layerMatrix = util.buildLayerMatrix(g)

  const h = new Graph({ compound: true, multigraph: true }).setGraph({})

  __.each(g.nodes(), function (v) {
    h.setNode(v, { label: v })
    h.setParent(v, 'layer' + g.node(v).rank)
  })

  __.each(g.edges(), function (e) {
    h.setEdge(e.v, e.w, {}, e.name)
  })

  __.each(layerMatrix, function (layer, i) {
    const layerV = 'layer' + i
    h.setNode(layerV, { rank: 'same' })
    __.reduce(layer, function (u, v) {
      h.setEdge(u, v, { style: 'invis' })
      return v
    })
  })

  return h
}
