const fs = require('fs');
const csv = require('csv-parser');

const putYear = [];
let year = 0;

const wrStream = fs.createWriteStream('./GroupAgg.json');

for (let i = 2000; i <= 2019; i += 1) {
  // putYear[i.toString()] = 0;
  putYear[i] = {};
  // var getActivity = {};
}

fs.createReadStream('C://Users//Acer//Downloads//Maharashtra.csv')
  .pipe(csv())
  .on('data', (row) => {
    const getCap = row.DATE_OF_REGISTRATION;

    // console.log(getCap);
    if (getCap !== 'NA') {
      let yr = getCap.substring(6);

      if (yr.length === 2) {
        const ch = parseInt(yr, 10);
        if (ch >= 0 && ch <= 19) {
          yr = `20${yr}`;
          year = parseInt(yr, 10);
        }
      } else {
        const mydate = new Date(getCap);
        year = mydate.getFullYear();
      }

      // console.log(year);
      if (year >= 2000 && year <= 2019) {
        // putYear[year.toString()]++;
        const activity = row.PRINCIPAL_BUSINESS_ACTIVITY_AS_PER_CIN;
        if (activity in putYear[year]) {
          putYear[year][activity] += 1;
        } else {
          putYear[year][activity] = 1;
        }
      }
    }
  })
  .on('end', () => {
    console.log(putYear);
    const jsonString = JSON.stringify({ ...putYear }, undefined, 4);
    console.log(jsonString);

    wrStream.write(jsonString, (err) => {
      if (err) {
        console.log(err.message);
      } else {
        console.log('bytes written');
      }
    });
  });
