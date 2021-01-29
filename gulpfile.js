const { src, dest, watch, parallel, series } = require("gulp");

const scss = require("gulp-sass");
const concat = require("gulp-concat");
const browserSync = require("browser-sync").create();
const uglify = require("gulp-uglify-es").default;
const autoprefixer = require("gulp-autoprefixer");
const imagemin = require("gulp-imagemin");
const del = require("del");
const iconfont = require("gulp-iconfont");
const iconfontCss = require("gulp-iconfont-css");
const webp = require('gulp-webp');

const fontName = "Icons";

function browsersync() {
  browserSync.init({
    server: {
      baseDir: "app/",
    },
  });
}

function cleanDist() {
  return del("dist");
}

function images() {
  return src("app/assets/images/**/*")
    .pipe(
      imagemin([
        imagemin.gifsicle({
          interlaced: true,
        }),
        imagemin.mozjpeg({
          quality: 75,
          progressive: true,
        }),
        imagemin.optipng({
          optimizationLevel: 5,
        }),
        imagemin.svgo({
          plugins: [
            {
              removeViewBox: true,
            },
            {
              cleanupIDs: false,
            },
          ],
        }),
      ])
    )
    .pipe(dest("dist/assets/images"));
}

function webpGen() {
   return src('assets/images/*.jpg')
        .pipe(webp())
        .pipe(dest('app/assets/images'))
};


function iconfontGen() {
  return src("app/assets/icons/*.svg")
    .pipe(
      iconfontCss({
        fontName: fontName,
        targetPath: "../../styles/_icons.scss",
        fontPath: "../assets/fonts/",
      })
    )
    .pipe(
      iconfont({
        fontName: fontName,
      })
    )
    .pipe(dest("app/assets/fonts/"));
}

function scripts() {
  return src(["app/js/main.js"])
    .pipe(concat("main.min.js"))
    .pipe(uglify())
    .pipe(dest("app/js"))
    .pipe(browserSync.stream());
}

function styles() {
  return src("app/styles/style.scss")
    .pipe(
      scss({
        outputStyle: "compressed",
      })
    )
    .pipe(concat("style.min.css"))
    .pipe(
      autoprefixer({
        overrideBrowserlist: ["last 10 version"],
        grid: true,
      })
    )
    .pipe(dest("app/css"))
    .pipe(browserSync.stream());
}

function build() {
  return src(
    [
      "app/css/style.min.css",
      "app/assets/fonts/**/*",
      "app/js/main.min.js",
      "app/js/swiper-bundle.min.js",
      "app/js/wow.min.js",
      "app/*.html",
    ],
    {
      base: "app",
    }
  ).pipe(dest("dist"));
}

function watching() {
  watch(["app/styles/**/*.scss"], styles);
  watch(["app/js/**/*.js", "!app/js/main.min.js"], scripts);
  watch(["app/*.html"]).on("change", browserSync.reload);
}

exports.styles = styles;
exports.watching = watching;
exports.browsersync = browsersync;
exports.scripts = scripts;
exports.images = images;
exports.cleanDist = cleanDist;
exports.iconfontGen = iconfontGen;
exports.webpGen = webpGen;

exports.build = series(cleanDist, iconfontGen, images, build);
exports.default = parallel(scripts, browsersync, watching);
