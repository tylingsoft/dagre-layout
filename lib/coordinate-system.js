const __ = require('lodash3')
const _ = require('lodash')

module.exports = {
  adjust: adjust,
  undo: undo
}

function adjust (g) {
  const rankDir = g.graph().rankdir.toLowerCase()
  if (rankDir === 'lr' || rankDir === 'rl') {
    swapWidthHeight(g)
  }
}

function undo (g) {
  const rankDir = g.graph().rankdir.toLowerCase()
  if (rankDir === 'bt' || rankDir === 'rl') {
    reverseY(g)
  }

  if (rankDir === 'lr' || rankDir === 'rl') {
    swapXY(g)
    swapWidthHeight(g)
  }
}

function swapWidthHeight (g) {
  __.each(g.nodes(), function (v) { swapWidthHeightOne(g.node(v)) })
  __.each(g.edges(), function (e) { swapWidthHeightOne(g.edge(e)) })
}

function swapWidthHeightOne (attrs) {
  const w = attrs.width
  attrs.width = attrs.height
  attrs.height = w
}

function reverseY (g) {
  __.each(g.nodes(), function (v) { reverseYOne(g.node(v)) })

  __.each(g.edges(), function (e) {
    const edge = g.edge(e)
    __.each(edge.points, reverseYOne)
    if (__.has(edge, 'y')) {
      reverseYOne(edge)
    }
  })
}

function reverseYOne (attrs) {
  attrs.y = -attrs.y
}

function swapXY (g) {
  __.each(g.nodes(), function (v) { swapXYOne(g.node(v)) })

  __.each(g.edges(), function (e) {
    const edge = g.edge(e)
    __.each(edge.points, swapXYOne)
    if (__.has(edge, 'x')) {
      swapXYOne(edge)
    }
  })
}

function swapXYOne (attrs) {
  const x = attrs.x
  attrs.x = attrs.y
  attrs.y = x
}
