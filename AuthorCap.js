const fs = require('fs');
const csv = require('csv-parser');

let count1 = 0;
let count2 = 0;
let count3 = 0;
let count4 = 0;
let count5 = 0;

const putCap = [];

const wrStream = fs.createWriteStream('./AuthorCap.json');

fs.createReadStream('C://Users//Acer//Downloads//Maharashtra.csv')
  .pipe(csv())
  .on('data', (row) => {
    const getCap = parseInt(row.AUTHORIZED_CAP, 10);

    if (getCap <= 100000) {
      count1 += 1;
    } else if (getCap > 100000 && getCap <= 1000000) {
      count2 += 1;
    } else if (getCap > 1000000 && getCap <= 10000000) {
      count3 += 1;
    } else if (getCap > 10000000 && getCap <= 100000000) {
      count4 += 1;
    } else if (getCap > 100000000) {
      count5 += 1;
    }
  })
  .on('end', () => {
    putCap['<= 1L'] = count1;
    putCap['1L to 10L'] = count2;
    putCap['10L to 1Cr'] = count3;
    putCap['1Cr to 10Cr'] = count4;
    putCap['> 10Cr'] = count5;
    console.log(putCap);

    const jsonString = JSON.stringify({ ...putCap }, undefined, 4);
    console.log(jsonString);
    // writePath = "C://Users//Acer//Desktop//node js//CsvToJson//AuthorCap.json";

    wrStream.write(jsonString, (err) => {
      if (err) {
        console.log(err.message);
      } else {
        console.log('bytes written');
      }
    });
  });
