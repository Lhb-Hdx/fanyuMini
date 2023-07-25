const Client = require('node-ssh');
const ssh = new Client();

(async () => {
  await ssh.connect({
    host: '39.108.161.108',
    username: 'root',
    password: 'Zhoulang88',
  });

  console.log('**********链接成功**********')
  const failed = [], successful = []
  try {
    await ssh.putDirectory('dist', '/usr/local/www/pay-admin-web', {
      recursive: true, // 递归
      concurrency: 25, // 并发数
      tick: function(localPath, remotePath, error) {
        if (error) {
          failed.push(localPath)
        } else {
          // successful.push(localPath)
        }
      }
    });
    console.log('**********上传成功**********');
  } catch (e) {
    console.log(e)
    console.log('\n**********上传失败文件列表*********\n', failed.join(',\n '))
    // console.log('\nsuccessful transfers\n', successful.join(',\n '))
  }

  await ssh.dispose();
})();
