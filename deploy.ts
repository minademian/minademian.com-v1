import * as dotenv from 'dotenv';

const FtpDeploy = require('ftp-deploy');

const ftpDeploy = new FtpDeploy();

dotenv.config();
console.log(process.env.HOST);
const config = {
  user: process.env.USER,
  // Password optional, prompted if none given
  password: process.env.PW,
  host: process.env.HOST,
  port: process.env.PORT,
  localRoot: __dirname + '/local-folder',
  remoteRoot: '/public_html/remote-folder/',
  // include: ["*", "**/*"],      // this would upload everything except dot files
  include: ['*.ts'],
  // e.g. exclude sourcemaps, and ALL files in node_modules (including dot files)
  exclude: [
    'dist/**/*.map',
    'node_modules/**',
    'node_modules/**/.*',
    '.git/**',
  ],
  // delete ALL existing files at destination before uploading, if true
  deleteRemote: false,
  // Passive mode is forced (EPSV command is not sent)
  forcePasv: true,
  // use sftp or ftp
  sftp: true,
};

ftpDeploy.on('uploading', (data) => {
  console.log(data.totalFilesCount); // total file count being transferred
  console.log(data.transferredFileCount); // number of files transferred
  console.log(data.filename); // partial path with filename being uploaded
});
ftpDeploy.on('uploaded', (data) => {
  console.log(data); // same data as uploading event
});
ftpDeploy.on('log', (data) => {
  console.log(data); // same data as uploading event
});
ftpDeploy.on('upload-error', (data) => {
  console.log(data.err); // data will also include filename, relativePath, and other goodies
});

ftpDeploy
  .deploy(config)
  .then((res: unknown) => console.log('finished:', res))
  .catch((err: unknown) => console.log(err));
