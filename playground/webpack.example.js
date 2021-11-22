const FractalWebpackPlugin = require('../index.js');

module.exports = {
    entry: './js/main.js',
    mode: 'development',
    plugins: [
        new FractalWebpackPlugin({
            mode: 'server',
        }),
    ],
};
