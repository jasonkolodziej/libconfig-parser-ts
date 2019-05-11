const fs = require('fs')

const file = process.argv[2]

const { ParseComments } = require('../src/parts/Comments')

if (!file || file.indexOf('.conf') === -1) {
    console.log(`File (${process.argv}) doesn't end in .conf`)
} else {
    fs.stat(file, function (err, stat) {
        if (err == null) {
            const content = fs.readFileSync(file, { encoding: 'ascii' })
            console.log(JSON.stringify(ParseComments.parse(content), null, 4))
        } else if (err.code == 'ENOENT') {
            // file does not exist
            console.log(`File ${file} not found`)
        } else {
            console.log('error: ', err.code);
        }
    });
}