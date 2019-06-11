const program = require('commander');
const fetch = require('node-fetch');
const table = require('tty-table');

const sonataManageApi = 'http://sonata_management_api:3021/v1';

program
  .version('0.1.0');

program
  .command('vendors')
  .action((cmd, env) => {
    fetch(sonataManageApi + '/vendor')
      .then(res => res.json())
      .then((res) => {
        const header = [{value: 'id'}, {value: 'name'}];
        //console.log(res);
        const rows = res.map((vendor) => {
          return [vendor.id, vendor.name ];
        });
        const options = {};
        let t1 = table(header, rows, options);
        console.log(t1.render()); 
      });
  });


program
  .command('vendor <id>')  
  .action((cmd, env) => {
    // console.log(cmd);
    fetch(sonataManageApi + '/vendor/' + cmd)
      .then(res => res.json())
      .then(console.log)
      .catch((err) => {
        console.log('err', err);
      })
  });


program.parse(process.argv);