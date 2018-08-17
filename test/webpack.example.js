const FractalWebpackPlugin = require('../index.js');

module.exports = {
    entry: './test/js/main.js',
    mode: 'development',
    plugins: [
        new FractalWebpackPlugin({
            mode: 'server',
            sync: true,
        }),
    ],
};
