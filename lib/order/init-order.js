const __ = require('lodash3')
const _ = require('lodash')

module.exports = initOrder

/*
 * Assigns an initial order value for each node by performing a DFS search
 * starting from nodes in the first rank. Nodes are assigned an order in their
 * rank as they are first visited.
 *
 * This approach comes from Gansner, et al., "A Technique for Drawing Directed
 * Graphs."
 *
 * Returns a layering matrix with an array per layer and each layer sorted by
 * the order of its nodes.
 */
function initOrder (g) {
  const visited = {}
  const simpleNodes = __.filter(g.nodes(), function (v) {
    return !g.children(v).length
  })
  const maxRank = __.max(__.map(simpleNodes, function (v) { return g.node(v).rank }))
  const layers = __.map(__.range(maxRank + 1), function () { return [] })

  function dfs (v) {
    if (__.has(visited, v)) return
    visited[v] = true
    const node = g.node(v)
    layers[node.rank].push(v)
    __.each(g.successors(v), dfs)
  }

  const orderedVs = __.sortBy(simpleNodes, function (v) { return g.node(v).rank })
  __.each(orderedVs, dfs)

  return layers
}
