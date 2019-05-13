const program = require('commander');
const fetch = require('node-fetch');

const sonataManageApi = 'http://localhost:3021/v1';

program
  .version('0.1.0');

program
  .command('vendors')
  // .option('-p, --peppers', 'Add peppers')
  .action((cmd, env) => {
    fetch(sonataManageApi + '/vendor')
      .then(res => res.json())
      .then(console.log);
  });

program.parse(process.argv);