const ini = require('js-ini');
const fs = require('async-file');

class IniParser {
    __parse (filename) {
        return fs.readTextFile(filename)
        .then((txt) => {
            return ini.parse(txt)
        });
    }

    __modify (object) {
        const resArray = [];

        for (let key in object) {
            // секцию general не берем с собой ((
            if (key === 'general') {
                continue;
            }
            let element = object[key];
            // название секции становится именем пира
            element.username = key;            
            resArray.push(element);
        }
        return resArray;
    }

    __modifyIntToString (array) {
        // преобразование чисел в строку, 
        // по умолчанию js-ini преобразует числовые значения в int
        return array.map(element => {
            const el = {};
            Object.keys(element).map(key => {
                el[key] = element[key] + '';
            })
            return el;
        })
        
    }

    parse(filename) {
        return this.__parse(filename)
            .then(this.__modify)
            .then(this.__modifyIntToString)
    }
}

module.exports = IniParser;