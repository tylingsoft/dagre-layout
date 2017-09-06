const __ = require('lodash3')
const _ = require('lodash')

module.exports = barycenter

function barycenter (g, movable) {
  return __.map(movable, function (v) {
    const inV = g.inEdges(v)
    if (!inV.length) {
      return { v: v }
    } else {
      const result = __.reduce(inV, function (acc, e) {
        const edge = g.edge(e)
        const nodeU = g.node(e.v)
        return {
          sum: acc.sum + (edge.weight * nodeU.order),
          weight: acc.weight + edge.weight
        }
      }, { sum: 0, weight: 0 })

      return {
        v: v,
        barycenter: result.sum / result.weight,
        weight: result.weight
      }
    }
  })
}
