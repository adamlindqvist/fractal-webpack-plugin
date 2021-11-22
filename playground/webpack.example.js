const FractalWebpackPlugin = require('../index.js');

module.exports = {
    entry: './playground/js/main.js',
    mode: 'development',
    plugins: [
        new FractalWebpackPlugin({
            mode: 'server',
            configPath: './playground/fractal.example.js'
        }),
    ],
};
