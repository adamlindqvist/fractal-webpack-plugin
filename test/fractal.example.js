'use strict';

/* Create a new Fractal instance and export it for use elsewhere if required */
const fractalExample = module.exports = require('@frctl/fractal').create();

/* Set the title of the project */
fractalExample.set('project.title', 'FooCorp Component Library');

/* Tell Fractal where the components will live */
fractalExample.components.set('path', __dirname + '/src/components');

/* Tell Fractal where the documentation pages will live */
fractalExample.docs.set('path', __dirname + '/src/docs');

/* Specify a directory of static assets */
fractalExample.web.set('static.path', __dirname + '/public');

/* Set the static HTML build destination */
fractalExample.web.set('builder.dest', __dirname + '/build');
