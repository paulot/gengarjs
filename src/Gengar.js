#! /usr/bin/env node

var program = require('commander');
var electron_path = require('electron-prebuilt');
var path = require('path')
var proc = require('child_process')
var  runner = path.join(__dirname, 'electron-entry.js');

program.version('0.0.1')
       .description('GengarJS, an entrypoint to ElectronJS from the command line.')
       .arguments('<url>', 'The url to open in GengarJS.')
       .option('-h, --headless', 'turn on headles mode')
       .parse(process.argv);

if (program.args.length) {
  var electron_args = {
    headless: program.headless || false,
    url: program.args[0] || 'http://www.linkedin.com',
  };

  var child = proc.spawn(electron_path, [runner].concat(JSON.stringify(electron_args)));

  child.stdout.pipe(process.stdout);
  child.stderr.pipe(process.stderr);
} else {
  console.error('You did not specify a url to open. Please specify a url.')
}
