const path = require("path");
const fs = require("fs");
const chokidar = require("chokidar");

const templateTsx = require('./templateTsx.js')
const templateCss = require('./templateCss.js')
const templateModel = require('./templateModel.js')
const templateService = require('./templateService.js')
// 获取写入文件的路径
function getRoot() {
	return new Promise((resove, reject) => {
		fs.readFile("package.json", "utf8", function (err, data) {
			if (err) throw err;
			resove(JSON.parse(data).src);
		});
	});
}
// getRoot().then((res) => {
//   	watchFile(res);
// });

// 监听文件变化
function watchFile(src) {
	const watcher = chokidar.watch(src, {
		ignored: /[\/\\]\./,
		persistent: true,
		usePolling: false
	});

  const log = console.log.bind(console);

  watcher
    .on("ready", function () {
      	log("Initial scan complete. Ready for changes.");
    })
    .on("raw", function (event, path, details) {
			// 创建新文件
			if (details.event === 'created') {
				creatFile(path)
			}
      log("Raw event info:", event, path, details);
    });
}
// 写入文件
function creatFile (path) {
	// 写入文件(文件不存在就创建,但不能创建目录)
	const arr = [
		{fileName: 'index.tsx', content: templateTsx()},
		{fileName: 'index.less', content: templateCss()},
		{fileName: 'model.ts', content: templateModel()},
		{fileName: 'service.ts', content: templateService()}
	]
	arr.map(item => {
		fs.writeFile(`${path}/${item.fileName}`, item.content, 'utf8', function(error) {
			if(error){
				console.log(error, '11111');
				return false;
			}
			console.log('写入成功');
		})
	})
	// fs.appendFile 写入追加文件÷
}
fs.readdir(path.resolve(__dirname, '/'), function(err, data) {
	console.log(data)
})