const path = require('path');
const { AsyncSeriesHook } = require('tapable');

try {
    var fractal = require(path.join(process.cwd(), 'fractal'));
} catch (e) {
    var fractal = require('@frctl/fractal').create();
}

const logger = fractal.cli.console;

class FractalWebpackPlugin {
    constructor(options = { mode: 'server', configPath: null }) {
        this.options = options;
        this.serverStarted = false;

        if (this.options.configPath) {
            fractal = require(path.join(process.cwd(), this.options.configPath));
        }

        this.hooks = {
          done: new AsyncSeriesHook(['compilation', 'callback'])
        }
    }

    apply(compiler) {
        compiler.hooks.done.tapAsync('FractalWebpackPlugin', (compilation, callback) => {
            if (this.options.mode === 'server' && !this.serverStarted) {
                this.startServer().then(() => {
                  this.serverStarted = true;
                  callback();
                });
            } else if (this.options.mode === 'build') {
                this.build().then(callback);
            }
        });
    }

    /*
     * Start the Fractal server
     */
    startServer() {
        const server = fractal.web.server();

        server.on('error', err => logger.error(err.message));

        return server.start().then(() => {
            // Code to make a nicer console output.
            const header = 'Fractal Web UI server is running!';
            const footer = fractal.cli.isInteractive() ? 'Use the \'stop\' command to stop the server.' : 'Use ^C to stop the server.';
            const serverUrl = server.urls.server;
            const format = str => logger.theme.format(str, 'success', true);
            let body = '';

            if (!server.isSynced) {
                body += `Local URL: ${format(serverUrl)}`;
            } else {
                const syncUrls = server.urls.sync;
                body += `Local URL:      ${format(syncUrls.local)}`;
                body += `\nNetwork URL:    ${format(syncUrls.external)}`;
                body += `\nBrowserSync UI: ${format(syncUrls.ui)}`;
            }

            return logger.box(header, body, footer).persist();
        });
    }

    /*
    * Run a static export of the project web UI.
    *
    * This will report on progress using the 'progress' event emitted by the
    * builder instance, and log any errors to the terminal.
    *
    * The build destination will be the directory specified in the 'builder.dest'
    * configuration option set above.
    */
    build() {
        const builder = fractal.web.builder();

        builder.on('progress', (completed, total) => logger.update(`Exported ${completed} of ${total} items`, 'info'));
        builder.on('error', err => logger.error(err.message));

        return builder.build().then(() => {
            logger.success('Fractal build completed!');
        });
    }
};

module.exports = FractalWebpackPlugin;
