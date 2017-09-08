import graphlib from 'graphlib'

import layout from './lib/layout'
import debug from './lib/debug'
import util from './lib/util'
import pkg from './package.json'

export default {
  graphlib,
  layout,
  debug,
  util: {
    time: util.time,
    notime: util.notime
  },
  version: pkg.version
}
