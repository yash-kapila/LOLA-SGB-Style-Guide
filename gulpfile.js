var gulp = require('gulp');
var gutil = require('gulp-util');
var inject = require('gulp-inject');
var jshint = require('gulp-jshint');
var express = require('express');
var webpackDevServer = require('webpack-dev-server');
var webpack = require('webpack');
var del = require('del');
var webpackConfig = require('./webpack.config.js');
var config = require('./config/config.json');

function getOutputPath(env, mod) {
	return '_build/'+env+'/'+mod.name;
}

// build index.html
function buildIndexHtml(env, mod, done) {
	var indexHtmlPath = mod.index;
	var outputPath = __dirname+'/'+getOutputPath(env, mod);
	var injectPaths = gulp.src([
		outputPath+'/vendor*.js',
		outputPath+'/*.js',
		outputPath+'/*.css'
	],{
		read: false,
		cwd: outputPath
	});

	return gulp.src(indexHtmlPath)
		.pipe(inject(injectPaths, {addRootSlash: false}))
		.pipe(gulp.dest(outputPath))
		.on('end', done);
}

// build dev/uat/prod
function build(env, mod) {
	return function(done) {
		env = env || 'prod';
		var outputPath = getOutputPath(env, mod);

		gutil.log('[build]', 'Using \''+env.toUpperCase()+' '+mod.name.toUpperCase()+'\' config...');
		var config = webpackConfig(env, mod);

		// clean existing folder
		gutil.log('[build]', 'Cleaning target directory...')		
		del.sync(['./'+outputPath+'/**/*']);

		// run Webpack bundler
		gutil.log('[build]', 'Running Webpack bundler...');
		webpack(config, function(err, stats) {
			if(err) {				
				throw new gutil.PluginError('build', err);
			}

			// build index.html
			buildIndexHtml(env, mod, function(){
				gutil.log('[build]', '\''+env.toUpperCase()+' '+mod.name.toUpperCase()+'\' build complete.');
				done();
			});
		});
	}
}

// dev-server
function server() {
	return function(done) {
		var env = 'local';
		outputPath = getOutputPath(env, config);

		gutil.log('[dev-server]', 'Using \''+env.toUpperCase()+' '+config.name.toUpperCase()+'\' config...');
		var webpack_config = webpackConfig('local', config);

		var onServerLoad = function(err, stats) {
			if(err) {
				throw new gutil.PluginError('dev-server', err);
			}

			build(env, config)(function(error) {
				done(error);
			});
		};

		//gutil.log('[dev-server]', 'Running Webpack bundler...');
		new webpackDevServer(webpack(webpack_config, onServerLoad), {
			contentBase: webpack_config.output.path,
			publicPath: '/',
			hot: true,
			stats: {
				colors: true
			},
			noInfo: true
		}).listen(8080, 'localhost', function(err) {
			if(err) {
				throw new gutil.PluginError('dev-server', err);
			}
		});
	}
}

// clean _build dir
gulp.task('clean', function() {
	del.sync(['./_build/**']);
});

// JS Hint task
gulp.task('lint', function() {
  return gulp.src('./app/scripts/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

// release tasks
gulp.task('release', build('prod', config));

// dev-server tasks
gulp.task('server:local', server());

gulp.task('default', ['server:local']);