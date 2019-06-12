const IniParser = require('./../lib/IniParser')

describe('test', () => {
    it('parser', (done) => {

        const parser = new IniParser();

        parser.parse('./spec/sip.conf')
        .then((confArray) => {
            console.log(confArray);

            expect(confArray[0].username).toEqual('101');
            expect(confArray[0].secret).toEqual('1234');
            done()
        });

    })
})