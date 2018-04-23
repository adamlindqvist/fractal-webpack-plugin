const fractal = require('@frctl/fractal').create();

const logger = fractal.cli.console;

module.exports = class FractalWebpackPlugin {
    constructor(options = { mode: 'server', sync: true }) {
        this.options = options;
    }

    apply(compiler) {
        compiler.hooks.afterCompile.tap('FractalWebpackPlugin', (compilation) => {
            if (this.options.mode === 'server') {
                this.startServer();
            } else if (this.options.mode === 'build') {
                this.build();
            }
        });
    }

    /*
     * Start the Fractal server
     *
     * In this example we are passing the option 'sync: true' which means that it will
     * use BrowserSync to watch for changes to the filesystem and refresh the browser automatically.
     * Obviously this is completely optional!
     *
     * This will also log any errors to the console.
     */
    startServer() {
        const server = fractal.web.server({
            sync: this.options.sync,
        });

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

            logger.box(header, body, footer).persist();
        });
    }

    /*
    * Run a static export of the project web UI.
    *
    * This task will report on progress using the 'progress' event emitted by the
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