/* eslint-env mocha */
const __ = require('lodash3')
const _ = require('lodash')
const expect = require('../chai').expect
const Graph = require('graphlib').Graph
const addSubgraphConstraints = require('../../lib/order/add-subgraph-constraints')

describe('order/addSubgraphConstraints', function () {
  let g
  let cg

  beforeEach(function () {
    g = new Graph({ compound: true })
    cg = new Graph()
  })

  it('does not change CG for a flat set of nodes', function () {
    const vs = ['a', 'b', 'c', 'd']
    __.each(vs, function (v) { g.setNode(v) })
    addSubgraphConstraints(g, cg, vs)
    expect(cg.nodeCount()).equals(0)
    expect(cg.edgeCount()).equals(0)
  })

  it("doesn't create a constraint for contiguous subgraph nodes", function () {
    const vs = ['a', 'b', 'c']
    __.each(vs, function (v) {
      g.setParent(v, 'sg')
    })
    addSubgraphConstraints(g, cg, vs)
    expect(cg.nodeCount()).equals(0)
    expect(cg.edgeCount()).equals(0)
  })

  it('adds a constraint when the parents for adjacent nodes are different', function () {
    const vs = ['a', 'b']
    g.setParent('a', 'sg1')
    g.setParent('b', 'sg2')
    addSubgraphConstraints(g, cg, vs)
    expect(cg.edges()).eqls([{ v: 'sg1', w: 'sg2' }])
  })

  it('works for multiple levels', function () {
    const vs = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
    __.each(vs, function (v) {
      g.setNode(v)
    })
    g.setParent('b', 'sg2')
    g.setParent('sg2', 'sg1')
    g.setParent('c', 'sg1')
    g.setParent('d', 'sg3')
    g.setParent('sg3', 'sg1')
    g.setParent('f', 'sg4')
    g.setParent('g', 'sg5')
    g.setParent('sg5', 'sg4')
    addSubgraphConstraints(g, cg, vs)
    expect(__.sortBy(cg.edges(), 'v')).eqls([
      { v: 'sg1', w: 'sg4' },
      { v: 'sg2', w: 'sg3' }
    ])
  })
})
