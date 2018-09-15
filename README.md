[![npm version](https://badge.fury.io/js/fractal-webpack-plugin.svg)](https://badge.fury.io/js/fractal-webpack-plugin) [![npm](https://img.shields.io/npm/dt/fractal-webpack-plugin.svg)](https://www.npmjs.com/package/fractal-webpack-plugin)


# ⚡️ fractal-webpack-plugin
Fractal webpack plugin to easily integrate fractal into a webpack workflow. 

Requires webpack 4+.

## Installation

```
npm install fractal-webpack-plugin --save-dev
```


## Usage

Do your fractal specific configurations in a `fractal.js` file and place it in the root of the project (or pass in a path in the configPath option).

See https://fractal.build/guide/project-settings for more information

---

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
        configPath: './folder/fractal.js' // defaults to 'fractal.js'
      })
    ]
};
```

## Options

#### mode

Type: `string` <br>
Default: `server`

Boot up a server or build a static page.

Available modes: `server` and `build`

#### sync

Type: `boolean` <br>
Default: `true`

To use browsersync or not

#### configPath

Type: `string` <br>
Default: `fractal.js`

Path to where the fractal.js file is located.

