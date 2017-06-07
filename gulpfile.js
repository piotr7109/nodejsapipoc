const gulp = require('gulp'),
    gutil = require('gulp-util'),
    shell = require('gulp-shell'),
    webpack = require('webpack'),
    webpackConfig = require('./webpack.config.js');

gulp.task('watch', () => {
    gulp.start('build-js');
    gulp.watch(['src/app/**/*.{js,jsx}'], ['build-js'])
});

gulp.task('build', () => gulp.start('build-js'));

gulp.task('default', ['watch']);

gulp.task('build-js', callback => {
    webpack(webpackConfig, (err, stats) => runWebpackConfig(err, stats, callback));
});

function runWebpackConfig(err, stats, callback) {
    if (err) {
        throw new gutil.PluginError('webpack', err);
    }
    gutil.log('[webpack] Completed\n' + stats.toString({
            assets: true,
            chunks: false,
            chunkModules: false,
            colors: true,
            hash: false,
            timings: false,
            version: false
        }));
    callback();
}