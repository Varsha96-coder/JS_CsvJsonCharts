const fs = require('fs');
const csv = require('csv-parser');

const countYear = {};
let year = 0;

const wrStream = fs.createWriteStream('./RegYear.json');

for (let i = 2000; i <= 2019; i += 1) {
  countYear[i.toString()] = 0;
}

fs.createReadStream('C://Users//Acer//Downloads//Maharashtra.csv')
  .pipe(csv())
  .on('data', (row) => {
    const getCap = row.DATE_OF_REGISTRATION;

    // console.log(getCap);
    if (getCap !== 'NA') {
      let yr = getCap.substring(6);

      if (yr.length === 2) {
        const yrInt = parseInt(yr, 10);
        if (yrInt >= 0 && yrInt <= 19) {
          yr = `20${yr}`;
          year = parseInt(yr, 10);
        } else {
          const mydate = new Date(getCap);
          year = mydate.getFullYear();
        }
      }

      if (year >= 2000 && year <= 2019) {
        countYear[year.toString()] += 1;
      }
    }
  })
  .on('end', () => {
    console.log(countYear);
    const jsonString = JSON.stringify({ ...countYear }, undefined, 4);
    console.log(jsonString);

    wrStream.write(jsonString, (err) => {
      if (err) {
        console.log(err.message);
      } else {
        console.log('bytes written');
      }
    });
  });
