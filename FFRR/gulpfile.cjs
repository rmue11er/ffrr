// Load Gulp and required plugins
const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const plumber = require('gulp-plumber');

// Define paths
const paths = {
    scss: 'resources/scss/*.scss',
    css: 'resources/css',
};

// Task: Compile SCSS to CSS
gulp.task('styles', function () {
    return gulp
        .src(paths.scss)
        .pipe(plumber()) // Prevent pipe breaking due to errors
        .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError)) // Compile SCSS
        .pipe(gulp.dest(paths.css)); // Output to desired location
});

// Define paths for source and destination
const pathsExtern = {
    src: [
        './node_modules/moment/dist/moment.js',
    ],
    dest: './resources/js/extern', // Destination folder
};

// Task: Move external JS files
gulp.task('move-extern-js', function () {
    return gulp
        .src(pathsExtern.src) // Select the source files
        .pipe(gulp.dest(pathsExtern.dest)); // Move files to the destination folder
});

// Task: Watch for changes
gulp.task('watch', function () {
    gulp.watch(paths.scss, gulp.series('styles')); // Watch for SCSS file changes
});

// Default task
gulp.task('default', gulp.series('styles', 'move-extern-js', 'watch'));
