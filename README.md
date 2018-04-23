# fractal-webpack-plugin
Fractal Webpack Plugin.

Requires a `fractal.js` file in the root of the project. See https://fractal.build/guide/project-settings

## Installation

```
npm install ...
```


## Usage

Example `webpack.config`

```javascript
const FractalWebpackPlugin = require('fractal-webpack-plugin');

module.exports = {
    entry: {
        app: path.resolve('./src/assets/js/app.js'),
    },
    output: {
        path: path.resolve('./public/js/'),
        filename: '[name].js',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: ['babel-loader'],
            },
        ],
    },
    plugins: [
      new FractalWebpackPlugin({
        mode: 'server', // mode: 'build'
        sync: true,
      })
    ]
};
```
