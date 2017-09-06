const __ = require('lodash3')
const _ = require('lodash')
const initOrder = require('./init-order')
const crossCount = require('./cross-count')
const sortSubgraph = require('./sort-subgraph')
const buildLayerGraph = require('./build-layer-graph')
const addSubgraphConstraints = require('./add-subgraph-constraints')
const Graph = require('../graphlib').Graph
const util = require('../util')

module.exports = order

/*
 * Applies heuristics to minimize edge crossings in the graph and sets the best
 * order solution as an order attribute on each node.
 *
 * Pre-conditions:
 *
 *    1. Graph must be DAG
 *    2. Graph nodes must be objects with a "rank" attribute
 *    3. Graph edges must have the "weight" attribute
 *
 * Post-conditions:
 *
 *    1. Graph nodes will have an "order" attribute based on the results of the
 *       algorithm.
 */
function order (g) {
  const maxRank = util.maxRank(g)
  const downLayerGraphs = buildLayerGraphs(g, _.range(1, maxRank + 1), 'inEdges')
  const upLayerGraphs = buildLayerGraphs(g, _.range(maxRank - 1, -1, -1), 'outEdges')

  let layering = initOrder(g)
  assignOrder(g, layering)

  let bestCC = Number.POSITIVE_INFINITY
  let best

  for (let i = 0, lastBest = 0; lastBest < 4; ++i, ++lastBest) {
    sweepLayerGraphs(i % 2 ? downLayerGraphs : upLayerGraphs, i % 4 >= 2)

    layering = util.buildLayerMatrix(g)
    const cc = crossCount(g, layering)
    if (cc < bestCC) {
      lastBest = 0
      best = _.cloneDeep(layering)
      bestCC = cc
    }
  }

  assignOrder(g, best)
}

function buildLayerGraphs (g, ranks, relationship) {
  return _.map(ranks, function (rank) {
    return buildLayerGraph(g, rank, relationship)
  })
}

function sweepLayerGraphs (layerGraphs, biasRight) {
  const cg = new Graph()
  __.each(layerGraphs, function (lg) {
    const root = lg.graph().root
    const sorted = sortSubgraph(lg, root, cg, biasRight)
    __.each(sorted.vs, function (v, i) {
      lg.node(v).order = i
    })
    addSubgraphConstraints(lg, cg, sorted.vs)
  })
}

function assignOrder (g, layering) {
  __.each(layering, function (layer) {
    __.each(layer, function (v, i) {
      g.node(v).order = i
    })
  })
}
