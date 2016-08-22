'use babel'

import commander from 'commander'
import electron_path from 'electron-prebuilt'
import path from 'path'
import proc from 'child_process'

let program = commander;
let runner = path.join(__dirname, 'electron-entry.js');

program.version('0.0.1')
       .description('GengarJS, an entrypoint to ElectronJS from the command line.')
       .arguments('<url>', 'The url to open in GengarJS.')
       .option('-h, --headless', 'turn on headles mode')
       .parse(process.argv);

if (program.args.length) {
  let electron_args = {
    headless: program.headless || false,
    url: program.args[0] || 'http://www.linkedin.com',
  };

  let child = proc.spawn(electron_path, [runner].concat(JSON.stringify(electron_args)));

  child.stdout.pipe(process.stdout);
  child.stderr.pipe(process.stderr);
} else {
  console.error('You did not specify a url to open. Please specify a url.')
}
