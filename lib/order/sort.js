const __ = require('lodash3')
const _ = require('lodash')
const util = require('../util')

module.exports = sort

function sort (entries, biasRight) {
  const parts = util.partition(entries, function (entry) {
    return __.has(entry, 'barycenter')
  })
  const sortable = parts.lhs
  const unsortable = __.sortBy(parts.rhs, function (entry) { return -entry.i })
  const vs = []
  let sum = 0
  let weight = 0
  let vsIndex = 0

  sortable.sort(compareWithBias(!!biasRight))

  vsIndex = consumeUnsortable(vs, unsortable, vsIndex)

  __.each(sortable, function (entry) {
    vsIndex += entry.vs.length
    vs.push(entry.vs)
    sum += entry.barycenter * entry.weight
    weight += entry.weight
    vsIndex = consumeUnsortable(vs, unsortable, vsIndex)
  })

  const result = { vs: __.flatten(vs, true) }
  if (weight) {
    result.barycenter = sum / weight
    result.weight = weight
  }
  return result
}

function consumeUnsortable (vs, unsortable, index) {
  let last
  while (unsortable.length && (last = __.last(unsortable)).i <= index) {
    unsortable.pop()
    vs.push(last.vs)
    index++
  }
  return index
}

function compareWithBias (bias) {
  return function (entryV, entryW) {
    if (entryV.barycenter < entryW.barycenter) {
      return -1
    } else if (entryV.barycenter > entryW.barycenter) {
      return 1
    }

    return !bias ? entryV.i - entryW.i : entryW.i - entryV.i
  }
}
