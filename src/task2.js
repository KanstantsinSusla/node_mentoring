const csv = require('csvtojson');
const fs = require('fs');
const path = require('path');
const { pipeline } = require('stream');

const sourceDataDir = './data/csv';
const outDataDir = './data/text';

let csvFileName = 'test.csv';
let txtFileName = 'test.txt';



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
