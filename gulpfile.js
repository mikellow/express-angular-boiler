var gulp = require('gulp');
var concat = require('gulp-concat');
var sass = require('gulp-ruby-sass');
var Server = require('karma').Server;
var karma = require("gulp-karma-runner");


var tinylr;
gulp.task('livereload', function() {
  tinylr = require('tiny-lr')();
  tinylr.listen(35729);
});

gulp.task('express', function() {
  var express = require('express');
  var app = express();
  app.use(require('connect-livereload')());
  app.use(express.static(__dirname+'/client'));
  app.use(express.static('client/public'));
  app.listen(4000, '0.0.0.0');
});


function notifyLiveReload(event) {
  var fileName = require('path').relative(__dirname, event.path);
  tinylr.changed({
    body: {
      files: [fileName]
    }
  });
}

gulp.task('concat-scripts', function() {
  return gulp.src('client/app/*.js')
    .pipe(concat('app.js'))
    .pipe(gulp.dest('client/public/js'));
});

gulp.task('sass', function() {
    return sass('sass/style.scss', { indentedSyntax: false })
        .pipe(gulp.dest('client/public/css'))
})

gulp.task('styles', function() {
  gulp.watch('sass/*.scss', ['sass']);
});

gulp.task('scripts', function() {
  gulp.watch('client/app/angular/*.js', ['concat-scripts']);
});

gulp.task('test', function (done) {
  new Server({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done).start();
});

gulp.task('tdd', function (done) {

  new Server({
    configFile: __dirname + '/karma.conf.js'
  }, done).start();

});


gulp.task('watch', function() {
  gulp.watch('client/public/*.html', notifyLiveReload);
  gulp.watch('client/public/css/*.css', notifyLiveReload);
  gulp.watch('client/public/js/*.js', notifyLiveReload);
});

gulp.task('default', ['express','livereload','styles','scripts','tdd','watch'], function() {

});