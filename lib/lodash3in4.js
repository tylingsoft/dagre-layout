import _ from 'lodash'

const min = (obj, callback = undefined) => {
  if (_.isObject(obj)) {
    if (callback === undefined) {
      return _.min(_.values(obj))
    }
    if (_.isFunction(callback)) {
      if (callback.length === 1) { // 1 argument
        return _.minBy(_.values(obj), callback) || Infinity
      }
      if (callback.length === 2) { // 2 arguments
        let min = _.minBy(_.toPairs(obj), (pair) => callback(pair[1], pair[0]))
        return min === undefined ? Infinity : min[1]
      }
    }
  }
  return _.min(obj, callback) // delegate to V4 directly
}

const max = (obj, callback = undefined) => {
  if (_.isObject(obj)) {
    if (callback === undefined) {
      return _.max(_.values(obj))
    }
    if (_.isFunction(callback)) {
      if (callback.length === 1) { // 1 argument
        return _.maxBy(_.values(obj), callback) || -Infinity
      }
      if (callback.length === 2) { // 2 arguments
        let max = _.maxBy(_.toPairs(obj), (pair) => callback(pair[1], pair[0]))
        return max === undefined ? -Infinity : max[1]
      }
    }
  }
  return _.max(obj, callback) // delegate to V4 directly
}

export default {
  min,
  max
}
