// 执行命令
/* const shell = require('shelljs');
shell.exec('npm run deploy'); */
const path = require('path');

module.exports = () => {
  process.argv.push(
    '--config',
    // __dirname是全局变量，表示当前文件所在目录
    path.resolve(__dirname, './webpack.config.js')
  );
  require('webpack-dev-server/bin/webpack-dev-server');
}
