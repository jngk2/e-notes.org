import { Configuration } from "webpack"
import path from "path"

let config: Configuration = {
  entry: [
    path.resolve(__dirname, '..', 'src', 'client.ts'),
  ],
  mode: 'development',
  output: {
    path: path.resolve(__dirname, '..', 'build', 'html')
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [{
          loader: 'ts-loader',
          options: {
            configFile: path.resolve('tsconfig.client.json')
          }
        }]
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".js"]
  },
  target: 'web'
}


export default [config]
