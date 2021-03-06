// 加载模块
const {task,src,dest,watch,series,parallel} = require('gulp');
// 用于加载其他gulp插件
const load = require('gulp-load-plugins')();
// nodejs的del模块用于删除文件
const del = require('del');

// 删除dist目录
let delDist = async ()=>{
  await del('./dist');
}

// 处理图片
let image = async ()=>{
  src('./img/*.*')
  .pipe(dest('./dist/img'))
}

// 处理sass
let sass = async ()=>{
  src('./sass/*.scss')
  .pipe(load.sassChina()) 
  .pipe(load.rev())
  .pipe(load.minifyCss())
  .pipe(dest('./dist/css'))
  .pipe(load.rev.manifest())
  .pipe(dest('./rev/css'))
}
// 处理json
let json = async ()=>{
  src('./data/*.json')
  .pipe(dest('./dist/data'))
  .pipe(load.connect.reload())
}
// 处理php
let php = async ()=>{
  src('./php/*.php')
  .pipe(dest('./dist/php'))
  .pipe(load.connect.reload())
}
// 处理js
let script = async ()=>{
  src('./js/*.js')
  .pipe(load.rev())
  .pipe(load.babel({presets: ['@babel/env']}))
  .pipe(load.uglify())
  .pipe(dest('./dist/js'))
  .pipe(load.rev.manifest())
  .pipe(dest('./rev/js'))
}

// 处理html
let html = async ()=>{
  setTimeout(()=>{
  src(['./rev/**/*.json','./*.html'])
  .pipe(load.revCollector({replaceReved:true}))
  .pipe(load.minifyHtml())
  .pipe(dest('./dist'))
  },2000)
}


// 启动服务，自动刷新
let connect = async ()=>{
  load.connect.server({
    root: './dist',
    livereload: true,
    port: 3001
  });
}

// 构建生产包
// task('build',series('delDist','script','image','sass','json','php','html','connect'))
task('build',async ()=>{
  await delDist();
  await script();
  await image();
  await sass();
  await json();
  await php();
  await html();
  await connect();
})
