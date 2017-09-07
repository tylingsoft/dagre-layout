import _ from 'lodash'

const min = (obj, callback) => {
  if (_.isObject(obj) && _.isFunction(callback)) {
    if (callback.length === 1) { // 1 argument
      return _.minBy(_.values(obj), callback) || Infinity
    }
    if (callback.length === 2) { // 2 arguments
      let min = _.minBy(_.toPairs(obj), function (pair) {
        const v = pair[1]
        const k = pair[0]
        return callback(v, k)
      })
      return min === undefined ? Infinity : min[1]
    }
  }
  return _.min(obj, callback) // delegate to V4 directly
}

const max = (obj, callback) => {
  if (_.isObject(obj) && _.isFunction(callback)) {
    if (callback.length === 1) { // 1 argument
      return _.maxBy(_.values(obj), callback) || -Infinity
    }
    if (callback.length === 2) { // 2 arguments
      let max = _.maxBy(_.toPairs(obj), function (pair) {
        const v = pair[1]
        const k = pair[0]
        return callback(v, k)
      })
      return max === undefined ? -Infinity : max[1]
    }
  }
  return _.max(obj, callback) // delegate to V4 directly
}

export default {
  min,
  max
}
