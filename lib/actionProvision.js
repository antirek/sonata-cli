
const fetch = require('node-fetch');
const Action = require('./action');
const IniParser = require('./IniParser');

class ActionProvision extends Action {
    process(cmd, env) {

        // console.log(cmd);

        console.log('--sip config path', cmd.path);
        console.log('--default vendor', cmd.vendor);
        console.log('--default model', cmd.model);

        this.sipConfigPath = cmd.path || '/etc/asterisk/sip.conf';
        this.defaultVendor = cmd.vendor;
        this.defaultModel = cmd.model;
        this.defaultHost = cmd.host;


        const parser = new IniParser();
        parser.parse(cmd.path).then(confArray=> {
            console.log(confArray);

            confArray.map(sipConfig => {
                const device = {
                    id: '1212',
                    model: sipConfig.model || this.defaultModel,
                    vendor: sipConfig.vendor || this.defaultVendor,
                    mac: sipConfig.mac,                    
                    status: true,                    
                    updated_at: (new Date()).toISOString(),
                    accounts: [
                      {
                        name: sipConfig.username,
                        line: 1,
                        sip_register: this.defaultHost,
                        sip_name: sipConfig.username,
                        sip_user: sipConfig.username,
                        sip_password: sipConfig.secret,
                        sip_auth: sipConfig.username,
                      }
                    ]
                };
                console.log('--prepared device config', device);
            })
        })

        /*
        fetch(this.sonataManagementApiUrl + '/vendor/' + cmd)
            .then(res => res.json())
            .then(console.log)
            .catch((err) => {
                console.log('err', err);
            })

        */
    }   
}


module.exports = ActionProvision;