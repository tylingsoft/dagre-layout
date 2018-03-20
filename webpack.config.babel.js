import path from 'path'
import nodeExternals from 'webpack-node-externals'

export const config = {
  mode: 'development',
  target: 'web',
  entry: {
    'dagre-layout': './index.js'
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
    library: 'dagre',
    libraryTarget: 'umd',
    libraryExport: 'default'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['env', { targets: { browsers: ['last 3 versions'] } }]
            ]
          }
        }
      }
    ]
  },
  devtool: 'source-map'
}

export const coreConfig = {
  mode: 'development',
  target: 'node',
  entry: {
    'dagre-layout': './index.js'
  },
  externals: [nodeExternals()],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].core.js',
    libraryTarget: 'commonjs2'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  devtool: 'source-map'
}

export default [config, coreConfig]
