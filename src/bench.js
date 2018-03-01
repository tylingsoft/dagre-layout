import Benchmark from 'benchmark'
import { sprintf } from 'sprintf'
import { Graph } from 'graphlibrary'

import rank from '../lib/rank'
import dagre from '../index'

const { layout } = dagre

function runBenchmark (name, fn) {
  const options = {}
  options.onComplete = function (bench) {
    const target = bench.target
    const hz = target.hz
    const stats = target.stats
    const rme = stats.rme
    const samples = stats.sample.length
    const msg = sprintf('    %25s: %13s ops/sec \xb1 %s%% (%3d run(s) sampled)',
      target.name,
      Benchmark.formatNumber(hz.toFixed(2)),
      rme.toFixed(2),
      samples)
    console.log(msg)
  }
  options.onError = function (bench) {
    console.error('    ' + bench.target.error)
  }
  options.setup = function () {
    this.count = Math.random() * 1000
    this.nextInt = function (range) {
      return Math.floor(this.count++ % range)
    }
  }
  new Benchmark(name, fn, options).run()
}

const g = new Graph()
  .setGraph({})
  .setDefaultNodeLabel(function () { return { width: 1, height: 1 } })
  .setDefaultEdgeLabel(function () { return { minlen: 1, weight: 1 } })
  .setPath(['a', 'b', 'c', 'd', 'h'])
  .setPath(['a', 'e', 'g', 'h'])
  .setPath(['a', 'f', 'g'])

runBenchmark('longest-path ranker', function () {
  g.graph().ranker = 'longest-path'
  rank(g)
})

runBenchmark('tight-tree ranker', function () {
  g.graph().ranker = 'tight-tree'
  rank(g)
})

runBenchmark('network-simplex ranker', function () {
  g.graph().ranker = 'network-simplex'
  rank(g)
})

runBenchmark('layout', function () {
  delete g.graph().ranker
  layout(g)
})
