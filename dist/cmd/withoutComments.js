import * as fs from 'fs';
const file = process.argv[2];
const { RemoveComments } = require('../src/parts/Comments');
if (!file || (file.indexOf('.conf') === -1 && file.indexOf('.cfg') === -1)) {
    console.log(`File (${process.argv}) doesn't end in .conf`);
}
else {
    fs.stat(file, function (err, stat) {
        if (err == null) {
            const content = fs.readFileSync(file, { encoding: 'ascii' });
            console.log(RemoveComments.parse(content));
        }
        else if (err.code == 'ENOENT') {
            // file does not exist
            console.log(`File ${file} not found`);
        }
        else {
            console.log('error: ', err.code);
        }
    });
}
//# sourceMappingURL=withoutComments.js.map