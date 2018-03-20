import path from 'path'
import nodeExternals from 'webpack-node-externals'

export const config = {
  mode: 'development',
  target: 'node',
  entry: {
    'dagre-layout': './index.js'
  },
  externals: [nodeExternals()],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
    libraryTarget: 'commonjs2',
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

export default [config]
