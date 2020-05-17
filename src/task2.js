import { csv } from 'csvtojson';
import { fs } from 'fs';
import { pipeline } from 'stream';

const sourceDataDir = './data/csv';
const outDataDir = './data/text';

const csvFileName = 'test.csv';
const txtFileName = 'test.txt';


if(!fs.existsSync(outDataDir)){
  fs.mkdirSync(outDataDir);
}


pipeline(
  fs.createReadStream(`${sourceDataDir}/${csvFileName}`),
  csv(),
  fs.createWriteStream(`${outDataDir}/${txtFileName}`),
  (error) => {
    if (error) {
      console.error('Pipeline failed.', error);
    } else {
      console.log('Pipeline succeeded.');
    }
  }
);
