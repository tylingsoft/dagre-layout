import graphlib from 'graphlib'
import layout from './lib/layout'
import debug from './lib/debug'
import * as util from './lib/util'
import version from './lib/version'

export default {
  graphlib,
  layout,
  debug,
  util: {
    time: util.time,
    notime: util.notime
  },
  version
}
