var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    minifyCSS = require('gulp-minify-css'),
    sass = require('gulp-sass'),
    path = require('path'),
    clean = require('gulp-clean'),
    replace = require('gulp-regex-replace'),
    express = require('express'),
    autoprefixer = require('gulp-autoprefixer'),
    livereload = require('gulp-livereload');

var minifyOpts = {};

var imagesOpts = {
    optimizationLevel: 5,
    progressive: true,
    interlaced: true
};

var sassOpts = {
    includePaths: [
        'vendor/mindy-sass/mindy'
    ]
};

var dst = {
    js: 'dist',
    css: 'dist/themes/default/css',
    images: 'dist/themes/default/images',
    sass: 'themes/default/css',
    fonts: 'dist/themes/default/fonts'
};

var paths = {
    js: [
        'ueditor.config.js',

        '_src/start.js',
        '_src/editor.js',

        '_src/core/browser.js',
        '_src/core/csrf.js',
        '_src/core/utils.js',
        '_src/core/EventBase.js',
        '_src/core/dtd.js',
        '_src/core/domUtils.js',
        '_src/core/Range.js',
        '_src/core/Selection.js',
        '_src/core/Editor.js',
        '_src/core/Editor.defaultoptions.js',
        '_src/core/loadconfig.js',
        '_src/core/ajax.js',
        '_src/core/filterword.js',
        '_src/core/node.js',
        '_src/core/htmlparser.js',
        '_src/core/filternode.js',
        '_src/core/plugin.js',
        '_src/core/keymap.js',
        '_src/core/localstorage.js',

        '_src/plugins/defaultfilter.js',
        '_src/plugins/inserthtml.js',
        '_src/plugins/autotypeset.js',
        '_src/plugins/autosubmit.js',
        '_src/plugins/image.js',
        '_src/plugins/justify.js',
        '_src/plugins/font.js',
        '_src/plugins/link.js',
        '_src/plugins/iframe.js',
        '_src/plugins/removeformat.js',
        '_src/plugins/blockquote.js',
        '_src/plugins/convertcase.js',
        '_src/plugins/indent.js',
        '_src/plugins/preview.js',
        '_src/plugins/paragraph.js',
        '_src/plugins/directionality.js',
        '_src/plugins/horizontal.js',
        '_src/plugins/rowspacing.js',
        '_src/plugins/lineheight.js',
        '_src/plugins/cleardoc.js',
        '_src/plugins/anchor.js',
        '_src/plugins/wordcount.js',
        '_src/plugins/pagebreak.js',
        '_src/plugins/wordimage.js',
        '_src/plugins/dragdrop.js',
        '_src/plugins/undo.js',
        '_src/plugins/copy.js',
        '_src/plugins/paste.js',
        '_src/plugins/puretxtpaste.js',
        '_src/plugins/list.js',
        '_src/plugins/source.js',
        '_src/plugins/enterkey.js',
        '_src/plugins/keystrokes.js',
        '_src/plugins/fiximgclick.js',
        '_src/plugins/autolink.js',
        '_src/plugins/autoheight.js',
        '_src/plugins/autofloat.js',
        '_src/plugins/video.js',
        '_src/plugins/table.core.js',
        '_src/plugins/table.cmds.js',
        '_src/plugins/table.action.js',
        '_src/plugins/table.sort.js',
        '_src/plugins/contextmenu.js',
        '_src/plugins/shortcutmenu.js',
        '_src/plugins/basestyle.js',
        '_src/plugins/elementpath.js',
        '_src/plugins/formatmatch.js',
        '_src/plugins/searchreplace.js',
        '_src/plugins/customstyle.js',
        '_src/plugins/catchremoteimage.js',
        '_src/plugins/insertparagraph.js',
        '_src/plugins/template.js',
        '_src/plugins/autoupload.js',
        '_src/plugins/autosave.js',
        '_src/plugins/section.js',
        '_src/plugins/simpleupload.js',
        '_src/plugins/serverparam.js',
        '_src/plugins/insertfile.js',
        '_src/plugins/insertcode.js',

        '_src/ui/ui.js',
        '_src/ui/uiutils.js',
        '_src/ui/uibase.js',
        '_src/ui/separator.js',
        '_src/ui/mask.js',
        '_src/ui/popup.js',
        '_src/ui/colorpicker.js',
        '_src/ui/tablepicker.js',
        '_src/ui/stateful.js',
        '_src/ui/button.js',
        '_src/ui/splitbutton.js',
        '_src/ui/colorbutton.js',
        '_src/ui/tablebutton.js',
        '_src/ui/autotypesetpicker.js',
        '_src/ui/autotypesetbutton.js',
        '_src/ui/cellalignpicker.js',
        '_src/ui/pastepicker.js',
        '_src/ui/toolbar.js',
        '_src/ui/menu.js',
        '_src/ui/combox.js',
        '_src/ui/dialog.js',
        '_src/ui/menubutton.js',
        '_src/ui/multiMenu.js',
        '_src/ui/shortcutmenu.js',
        '_src/ui/breakline.js',
        '_src/ui/message.js',

        '_src/adapter/editorui.js',
        '_src/adapter/editor.js',
        '_src/adapter/message.js',
        '_src/adapter/autosave.js',

        '_src/parse/parse.js',
        '_src/parse/insertcode.js',
        '_src/parse/list.js',
        '_src/parse/table.js',
        '_src/parse/video.js',

        '_src/end.js'
    ],
    images: [
        'themes/default/images/**/*{.png,.jpg,.gif}'
    ],
    fonts: [],
    sass: [
        'themes/default/scss/*.scss'
    ],
    css: [
        'vendor/codemirror/lib/codemirror.css',
        'themes/default/css/**/*.css'
    ]
};

gulp.task('fonts', function () {
    return gulp.src(paths.fonts)
        .pipe(gulp.dest(dst.fonts));
});

gulp.task('csrf', function () {
    return gulp.src('./csrf.js')
        .pipe(gulp.dest(dst.js));
});

gulp.task('js', ['csrf'], function () {
    return gulp.src(paths.js)
        // .pipe(uglify())
        .pipe(concat('ueditor.all.js'))
        .pipe(gulp.dest(dst.js));
        //.pipe(livereload());
});

gulp.task('images', function () {
    return gulp.src(paths.images)
        .pipe(imagemin(imagesOpts))
        .pipe(gulp.dest(dst.images));
});

gulp.task('sass', function () {
    return gulp.src(paths.sass)
        .pipe(sass(sassOpts))
        .pipe(gulp.dest(dst.sass));
});

gulp.task('php', function () {
    return gulp.src('php/**/*')
        .pipe(gulp.dest('dist/php'));
});

gulp.task('lang', function () {
    return gulp.src('lang/**/*.js')
        .pipe(gulp.dest('dist/lang/'));
});

gulp.task('third-party', function () {
    return gulp.src('third-party/**/*')
        .pipe(gulp.dest('dist/third-party/'));
});

gulp.task('dialogs', function () {
    return gulp.src('dialogs/**/*')
        .pipe(gulp.dest('dist/dialogs/'));
});

gulp.task('demo', function () {
    return gulp.src('index.html')
        .pipe(gulp.dest('dist/'));
});

gulp.task('css', ['sass'], function () {
    return gulp.src(paths.css)
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(minifyCSS(minifyOpts))
        .pipe(gulp.dest(dst.css))
        //.pipe(livereload());
});

gulp.task('themes', ['css', 'images'], function () {
    return gulp.src('themes/**/*')
        .pipe(gulp.dest('dist/themes/'));
});

// Rerun the task when a file changes
gulp.task('watch', ['build'], function () {
    //livereload.listen();

    gulp.watch(paths.js + ['./csrf.js'], ['js']);

    gulp.watch(['third-party/**/*', 'vendor/**/*'], ['third-party']);
    gulp.watch('themes/**/*', ['themes']);
    gulp.watch('lang/**/*.js', ['lang']);
    gulp.watch('dialogs/**/*', ['dialogs']);
    gulp.watch('index.html', ['demo']);
});

// Clean
gulp.task('clean', function () {
    return gulp.src(['dist/*'], {
        read: false
    }).pipe(clean());
});

gulp.task('serve', function () {
    var serverPort = 3000,
        server = express();

    server.use('/ueditor.all.js', express.static('./dist/ueditor.all.js'));

    server.use('/dialogs/', express.static('./dist/dialogs/'));
    server.use('/lang', express.static('./dist/lang'));
    server.use('/themes', express.static('./dist/themes'));
    server.use('/third-party', express.static('./dist/third-party'));

    server.get('/', function (req, res) {
        res.sendFile(path.resolve('dist/index.html'));
    });
    server.listen(serverPort);
});

gulp.task('default', ['build'], function () {
    return gulp.start('serve', 'watch');
});

gulp.task('build', ['clean'], function () {
    return gulp.start('php', 'lang', 'dialogs', 'js', 'themes', 'images', 'fonts', 'third-party', 'demo');
});