var gulp = require('gulp');
var webserver = require('gulp-webserver');
var url = require('url');
var fs = require('fs');
var path = require('path');

gulp.task('webserver', function() {
    return gulp.src('public')
        .pipe(webserver({
            port: 9090,
            open: true,
            middleware: function(req, res, next) {
                var pathname = url.parse(req.url).pathname;
                if (pathname === '/') {
                    res.end(fs.readFileSync(path.join(__dirname, 'public', 'index.html')));
                } else if (pathname === '/favicon.ico') {
                    res.end('');
                } else if (pathname === "/render") {
                    res.end(fs.readFileSync('./public/data/data.json'));
                } else {
                    res.end(fs.readFileSync(path.join(__dirname, 'public', pathname)));
                }
            }
        }))
})