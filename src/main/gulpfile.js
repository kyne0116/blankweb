var gulp=require('gulp');
var gutil=require('gulp-util');//让命令行输出的文字带颜色
var uglify=require('gulp-uglify');//压缩js
var concat=require('gulp-concat');//合并文件
var sourcemaps=require('gulp-sourcemaps');//生成js的map文件方便debugjs，谷歌浏览器中看效果
var rev=require('gulp-rev');//生成版本号
var revCollector=require('gulp-rev-collector');//替换版本号
var minifyHtml=require('gulp-minify-html');//压缩HTML（不推荐，可以压缩html文件中的js和css）
var htmlmin=require('gulp-htmlmin');//压缩HTML（推荐，可以压缩html文件中的js和css）
var minifyCss=require('gulp-minify-css');//压缩css
var cache=require('gulp-cache');//检测缓存是否存在，如果存在从缓存中取
var imagemin=require('gulp-imagemin');//压缩图片
var watchPath=require('gulp-watch-path');//检测文件是否修改并返回被修改文件的相关信息
var changed=require('gulp-changed');//只操作改变过的文件
var combiner=require('stream-combiner2');//捕获错误信息
var autoprefixer=require('gulp-autoprefixer');//解析 CSS 文件并且添加浏览器前缀到CSS规则里
var browserSync=require('browser-sync');//让浏览器实时、快速响应您的文件更改（html、js、css、sass、less等）并自动刷新页面
var handleError=function(err){
	console.log('\n');
	gutil.log(gutil.colors.red('Error!'));
	gutil.log('fileName: ' + gutil.colors.red(err.fileName))
    gutil.log('lineNumber: ' + gutil.colors.red(err.lineNumber))
    gutil.log('message: ' + err.message)
    gutil.log('plugin: ' + gutil.colors.yellow(err.plugin))
};
//复制配置文件及其他文件
gulp.task('copy',function(){
	gulp.src('websrc/**/*.{ttf,eot,svg,woff,MF,tld,xml,jsp,json,m4a,amr}')
	.pipe(changed('webapp'))
	.pipe(gulp.dest('webapp'));
});
//js压缩及生成map
gulp.task('jsmaps',function(){
	gulp.src(['websrc/**/*.js','!websrc/**/jquery.min.js','!websrc/**/jquery.easyui.min.js','!websrc/**/echarts-all.js'])
	.pipe(changed('webapp'))
	.pipe(sourcemaps.init())
	.pipe(uglify().on('error', handleError))
	.pipe(sourcemaps.write('maps'))
	.pipe(gulp.dest('webapp'));
});
//js生成版本号文件
gulp.task('jsrev',function(){
	gulp.src('websrc/**/*.js')
	.pipe(rev())
	.pipe(gulp.dest('webapp'))
	.pipe(rev.manifest())
	.pipe(gulp.dest('src/rev/js'));
});
//css压缩生成版本号
gulp.task('minifycss',function(){
	gulp.src('websrc/**/*.css')
	.pipe(changed('webapp'))
	.pipe(autoprefixer())
	.pipe(minifyCss())
	.pipe(rev())
	.pipe(gulp.dest('webapp'))
	.pipe(rev.manifest())
	.pipe(gulp.dest('src/rev/css'))
});
//压缩图片利用gulp-cache插件可以快取保存已经压缩过的图片
//也就是说没有修改过的图片不压缩，直接从缓存文件中读取，以便每次进行此任务时不需要再重新压缩，只压缩修改的图片
gulp.task('images',function(){
	gulp.src(['websrc/**/*.png','websrc/**/*.gif','websrc/**/*.jpg','websrc/**/*.jpeg','websrc/**/*.ico'])//相当于gulp.src('src/**/*.{png,jpg,gif,svg}')指明源文件路径、并进行文件匹配
	.pipe(changed('webapp'))//对比文件是否有过改动（此处填写的路径和输出路径保持一致）
	.pipe(cache(imagemin({
			optimizationLevel: 6, //优化等级，（取值范围：0-7）默认为：3  
			progressive: true, //无损压缩jpg图片，默认为：false 
			interlaced: true, //隔行扫描gif进行渲染，默认为：false 
			multipass: true //多次优化svg直到完全优化，默认为：false 
	})))
	.pipe(gulp.dest('webapp'))
});
//压缩HTML及替换引用版本号
gulp.task('minihtml',function(){
	//gulp.src(['src/**/*.json','websrc/html/*.html'])
	//.pipe(revCollector({
	//		replaceReved:true
	//		//dirReplacements:{这个不必设置，加了这个设置有时反而不会替换所有需注意
	//		//	'css':'css',
	//		//	'js':'js',
    //        //    'cdn/': function(manifest_value) {
    //        //        return '//cdn' + (Math.floor(Math.random() * 9) + 1) + '.' + 'exsample.dot' + '/img/' + manifest_value;
    //        //    }
	//		//}
	//}))
	//.pipe(htmlmin({
	//		removeComments: true,//清除HTML注释
	//		collapseWhitespace: true,//压缩HTML
	//		collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
	//		removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
	//		removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
	//		removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
	//		minifyJS: true,//压缩页面JS
	//		minifyCSS: true//压缩页面CSS
	//}))
	////.pipe(minifyHtml({
	////		empty:true,
	////		spare:true,
	////		comments: true
	////}))
	//.pipe(gulp.dest('webapp/html'))
	
	var combined=combiner.obj([
		gulp.src(['src/**/*.json','websrc/**/*.html']),
		revCollector({
			replaceReved:true
			//dirReplacements:{这个不必设置，加了这个设置有时反而不会替换所有需注意
			//	'css':'css',
			//	'js':'js',
            //    'cdn/': function(manifest_value) {
            //        return '//cdn' + (Math.floor(Math.random() * 9) + 1) + '.' + 'exsample.dot' + '/img/' + manifest_value;
            //    }
			//}
		}),
		htmlmin({
			removeComments: true,//清除HTML注释
			collapseWhitespace: true,//压缩HTML
			collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
			removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
			removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
			removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
			minifyJS: true,//压缩页面JS
			minifyCSS: true//压缩页面CSS
		}),
		gulp.dest('webapp')
	]);
	combined.on('error',handleError);
});
gulp.task('auto',function(){
	//gulp.watch('websrc/**/*.js',['jsmaps','jsrev']);作用与下面寻段相同，下面那段只压缩修改的文件
	gulp.watch('websrc/**/*.js',function(event){
		var paths=watchPath(event,'websrc/','webapp/');
		gutil.log(gutil.colors.green(event.type)+' '+paths.srcPath);
		gutil.log('Dist '+paths.distPath);
		
		//gulp.src(paths.srcPath,{base:'websrc/'})
		gulp.src([paths.srcPath,'!websrc/**/jquery.min.js','!websrc/**/jquery.easyui.min.js','!websrc/**/echarts-all.js'])
		.pipe(sourcemaps.init())
		.pipe(uglify().on('error', handleError))
		.pipe(sourcemaps.write('../maps'))
		.pipe(gulp.dest(paths.distDir));
		
		gulp.src('websrc/**/*.js')
		.pipe(rev())
		//.pipe(gulp.dest('webapp'))
		.pipe(rev.manifest())
		.pipe(gulp.dest('src/rev/js'));
	});
	//gulp.watch('websrc/**/*.css',['minifycss']);作用与下面寻段相同，下面那段只压缩修改的文件
	gulp.watch('websrc/**/*.css',function(event){
		var paths=watchPath(event,'websrc/','webapp/');
		gutil.log(gutil.colors.green(event.type)+' '+paths.srcPath);
		gutil.log('Dist '+paths.distPath);
		
		gulp.src('websrc/**/*.css')
		.pipe(autoprefixer())
		.pipe(minifyCss())
		.pipe(rev())
		.pipe(gulp.dest('webapp'))
		.pipe(rev.manifest())
		.pipe(gulp.dest('src/rev/css'));
	});
	//gulp.watch(['src/**/*.json','websrc/**/*.html'],['minihtml']);作用与下面寻段相同，下面那段只压缩修改的文件
	gulp.watch(['src/**/*.json','websrc/**/*.html'],function(event){
		var paths=watchPath(event,'websrc/','webapp/');
		gutil.log(gutil.colors.green(event.type)+' '+paths.srcPath);
		gutil.log('Dist '+paths.distPath);
		
		var combined=combiner.obj([
		gulp.src(['src/**/*.json','websrc/**/*.html']),
		revCollector({
			replaceReved:true
		}),
		htmlmin({
			removeComments: true,//清除HTML注释
			collapseWhitespace: true,//压缩HTML
			collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
			removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
			removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
			removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
			minifyJS: true,//压缩页面JS
			minifyCSS: true//压缩页面CSS
		}),
		gulp.dest('webapp')
		//browserSync.reload({stream:true})
		]);
		combined.on('error',handleError);
		//console.log(paths.distFilename);
		
		//刷新页面
		gulp.watch(paths.distPath,function(event){
			var pathsc=watchPath(event,'webapp/','webapp/');
			gutil.log(gutil.colors.green(event.type)+' '+pathsc.srcPath);
			gutil.log('Dist '+pathsc.distPath);
			
			var combined=combiner.obj([
			gulp.src(pathsc.distPath)
			//browserSync.reload({stream:true})
			]);
			combined.on('error',handleError);
			//var html=browserSync.create();
			//html.watch('*.html').on('change',html.reload);
			console.log(pathsc.distFilename);
		});
	});
	//gulp.watch(['websrc/images/*.*','websrc/img/*.*'],['images']);作用与下面寻段相同，下面那段只压缩修改的文件
	gulp.watch('websrc/**/*.{gif,png,jpg,jpeg,ico}',function(event){
		var paths=watchPath(event,'websrc/','webapp/');
		gutil.log(gutil.colors.green(event.type)+' '+paths.srcPath);
		gutil.log('Dist '+paths.distPath);
		
		gulp.src(paths.srcPath)
        .pipe(changed(paths.distDir))//对比文件是否有过改动（此处填写的路径和输出路径保持一致）
		.pipe(cache(imagemin({
				optimizationLevel: 6, //优化等级，（取值范围：0-7）默认为：3  
				progressive: true, //无损压缩jpg图片，默认为：false 
				interlaced: true, //隔行扫描gif进行渲染，默认为：false 
				multipass: true //多次优化svg直到完全优化，默认为：false 
		})))
        .pipe(gulp.dest(paths.distDir))
		//.pipe(browserSync.reload({stream:true}))
	});
	//gulp.watch('websrc/**/*.{ttf,eot,svg,woff,MF,tld,xml}',['copy']);作用与下面寻段相同，下面那段只复制修改的文件
	gulp.watch(['websrc/**/*.{ttf,eot,svg,woff,MF,tld,xml,jsp,json,m4a,amr}','websrc/**/jquery.min.js','websrc/**/jquery.easyui.min.js','websrc/**/echarts-all.js'],function(event){
		var paths=watchPath(event,'websrc/','webapp/');
		gutil.log(gutil.colors.green(event.type)+' '+paths.srcPath);
		gutil.log('Dist '+paths.distPath);
		
		gulp.src(paths.srcPath)
		.pipe(gulp.dest(paths.distDir))
		//.pipe(browserSync.reload({stream:true}))
	});
});
gulp.task('default',['copy','jsmaps','jsrev','minifycss','images','minihtml','auto'],function(){
	//browserSync.init({
	//	proxy: 'http://localhost:8888/maip/action/',
	//	port:8888,
	//	logPrefix:'maip',//改变控制台日志前缀默认BS
	//	open: 'http://localhost:8888/maip/action/'//决定Browsersync启动时自动打开的网址
	//	//browser: 'Google Chrome'//在Chrome浏览器中打开网站，也可以["google chrome", "firefox"]
	//});
});