/* global require */

var gulp = require('gulp');
var fs = require('fs');
var del = require('del');
var config = require('./gulp.config.js')();

var $ = require('gulp-load-plugins')({
    pattern: ['gulp-*', 'gulp.*', 'browser-sync', 'main-bower-files', 'connect-modrewrite', 'run-sequence'],
    replaceString: /\bgulp[\-.]/
});

var reload = $.browserSync.reload;

gulp.task('bowerMove', function(cb) {
    var libFolder = config.destLib;

    if(!fs.existsSync(config.dest)) {
        fs.mkdirSync(config.dest);
    }

    if(!fs.existsSync(libFolder)) {
        fs.mkdirSync(libFolder);
    } else {
        del.sync([
            libFolder + '/**/*'
        ], cb);
    }

    gulp.src(config.vendor)
        .pipe(gulp.dest(config.destLib));

    gulp.src(config.images)
        .pipe(gulp.dest(config.destImg));

    if(fs.existsSync('bower_components/bootstrap-sass')) {
        gulp.src('bower_components/bootstrap-sass/assets/fonts/**/*')
            .pipe(gulp.dest(config.destFont));
    }

    gulp.src(config.fonts)
        .pipe(gulp.dest(config.destFont));

    if(fs.existsSync('bower_components')) {
        return gulp.src(
                $.mainBowerFiles(),
                { base: 'bower_components' }
            )
            .pipe(gulp.dest(config.destLib));
    }
});

gulp.task('bowerInsert', function() {
    return gulp.src(config.root + '/index.html')
        .pipe(gulp.dest(config.dest))
        .pipe($.inject(
                gulp.src(config.injectFiles,
                    {read: false}
                ),
                {name: 'bower', relative: true}
            )
        )
        .pipe(gulp.dest(config.dest));
});

gulp.task('templates', function () {
    return gulp.src([
            '!' + config.root + '/index.html',
            config.root + '/**/*.html'
        ])
        .pipe($.htmlmin({
            empty: true,
            conditionals: true
        }))
        .pipe($.angularTemplatecache({
            module: 'app.core',
            root: '',
            standalone: false,
            moduleSystem: 'IIFE'
        }))
        .pipe(gulp.dest(config.destDist));
});

gulp.task('tsLint', function() {
    return gulp.src(config.root + '/**/*.ts')
        .pipe($.tslint())
        .pipe($.tslint.report('prose', {
            emitError: false
        }));
});

gulp.task('scripts', function() {
    gulp.src(config.destLib + '/**/*.js')
        .pipe($.ngAnnotate({
            add: true,
            single_quotes: true
        }))
        .pipe(gulp.dest(config.destLib));

    return gulp.src(config.scriptSource)
        .pipe($.typescript({
            noImplicitAny: false,
            out: 'main.js'
        }))
        .pipe($.sourcemaps.init())
        .pipe($.ngAnnotate({
            add: true,
            single_quotes: true
        }))
        .pipe(gulp.dest(config.destDist))
        .pipe($.rename('main.min.js'))
        .pipe($.uglify())
        .pipe($.sourcemaps.write('.'))
        .pipe(gulp.dest(config.destDist));
});

gulp.task('release', function(cb) {
    del.sync([
        config.destDist + '/*.map'
    ], cb);

    return gulp.src(config.destDist + '/*.js')
        .pipe($.stripDebug())
        .pipe(gulp.dest(config.destDist));
});

gulp.task('sass', function() {
    return gulp.src(config.root + '/app.scss')
        .pipe($.sourcemaps.init())
        .pipe($.sass({
                outputStyle: 'compressed'
            })
            .on('error', $.sass.logError))
        .pipe($.autoprefixer())
        .pipe($.rename('app.min.css'))
        .pipe($.sourcemaps.write('.'))
        .pipe(gulp.dest(config.destDist));
});

gulp.task('watch', function() {
    if(fs.existsSync('out/index.html')) {
        gulp.watch(config.root + '/**/*.ts', ['tsLint', 'scripts']).on('change', reload);
        gulp.watch(config.root + '/**/*.scss', ['sass']).on('change', reload);
        gulp.watch(config.root + '/index.html').on('change', reload);
        gulp.watch(config.root + '/**/*.html', ['templates']).on('change', reload);
    }
});

gulp.task('serve', function() {
    if(fs.existsSync('out/index.html')) {
        $.browserSync({
            server: {
                baseDir: config.dest,
                middleware: [
                    $.connectModrewrite([
                        '!\\.\\w+$ /index.html [L]'
                    ])
                ]
            },
            online: false,
            // browser: ['google chrome', 'firefox']
        });
    }
});


gulp.task('default', function() {
    $.runSequence(
            'bowerMove',
            'templates',
            ['tsLint', 'scripts', 'sass'],
            'bowerInsert',
            'watch',
            'serve'
        )
});

gulp.task('build', function() {
    $.runSequence(
            'bowerMove',
            'templates',
            ['tsLint', 'scripts', 'sass'],
            'release',
            'bowerInsert'
        )
});

gulp.task('serve-prod', function() {
    if(fs.existsSync('out/index.html')) {
        $.browserSync({
            ui: false,
            server: {
                baseDir: config.dest,
                middleware: [
                    $.connectModrewrite([
                        '!\\.\\w+$ /index.html [L]'
                    ])
                ]
            },
            online: false,
            ghostMode: false,
            logLevel: "silent",
            open: false
        });
    }
})