import * as fs from 'fs';
const {join} = require('path')

const raw_file = process.argv[2]

const include_dir = raw_file.substring(0, raw_file.lastIndexOf('/') + 1);

const file = raw_file.substring(raw_file.lastIndexOf('/') + 1, raw_file.length);

const { parseFile } = require('../src/index')
const { getFromFile } = require('../src/parts/include')

if (!file || (file.indexOf('.conf') === -1 && file.indexOf('.cfg') === -1)) {
    console.log(`File (${process[2]}) doesn't end in .conf`)
} else {
    fs.stat(join(include_dir, file), function (err, stat) {
        if (err == null) {
            console.log(
                JSON.stringify(
                    parseFile(file, include_dir, getFromFile), null, 4
                )
            )
            // DONT use this hacky methode!
        } else if (err.code == 'ENOENT') {
            // file does not exist
            console.log(file, include_dir, join(include_dir, file))
            console.log(`File ${file} not found`)
        } else {
            console.log('error: ', err.code);
        }
    });
}