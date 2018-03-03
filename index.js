import graphlib from 'graphlibrary'

import layout from './lib/layout'
import debug from './lib/debug'
import util from './lib/util'

export default {
  graphlib,
  layout,
  debug,
  util: {
    time: util.time,
    notime: util.notime
  }
}
