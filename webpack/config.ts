import argv from "webpack-nano/argv"
import { merge } from 'webpack-merge'
import { Configuration, DefinePlugin } from "webpack"
import { config as devConfig } from './dev'
import { config as watchConfig } from './watch'
import path from "path"
import HtmlWebpackPlugin from "html-webpack-plugin";

const isDev = Boolean(argv['dev'])

console.log(isDev)

let config: Configuration = {
  entry: [
    path.resolve(__dirname, '..', 'src', 'index.tsx'),
  ],
  mode: 'development',
  output: {
    path: path.resolve(__dirname, '..', 'build')
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: ['ts-loader'],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
          '@teamsupercell/typings-for-css-modules-loader',
          {
            loader: 'css-loader',
            options: { modules: true }
          },
          'sass-loader'
        ],
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '..', 'src', 'index.html')
    }),
    new DefinePlugin({
      API_URL: JSON.stringify(isDev && 'http://localhost:8081/meta.json' || 'http://localhost:8080/meta.json'),
      DEV: isDev
    })
  ],
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".css", ".scss"]
  },
  target: 'web'
}

if (argv['dev']) {
  config = merge(config, devConfig)
}

if (argv['watch']) {
  config = merge(config, watchConfig)
}

export default [config]
