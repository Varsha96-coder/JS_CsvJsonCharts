const fs = require('fs');
const csv = require('csv-parser');

const putYear = {};
let year = 0;

const wstream = fs.createWriteStream('./Business.json');

fs.createReadStream('C://Users//Acer//Downloads//Maharashtra.csv')
  .pipe(csv())
  .on(
    'data',
    (row) => {
      const getCap = row.DATE_OF_REGISTRATION;

      // console.log(getCap);
      if (getCap !== 'NA') {
        let yr = getCap.substring(6);

        if (yr.length === 2) {
          const yrInt = parseInt(yr, 10);
          if (yrInt >= 0 && yrInt <= 19) {
            yr = `20${yr}`;
            year = parseInt(yr, 10);
          }
        } else {
          const mydate = new Date(getCap);
          year = mydate.getFullYear();
        }

        if (year === 2015) {
          const activity = row.PRINCIPAL_BUSINESS_ACTIVITY_AS_PER_CIN;
          if (activity in putYear) putYear[activity] += 1;
          else putYear[activity] = 1;
        }
      }
    },
  )
  .on('end', () => {
    console.log(putYear);
    const jsonString = JSON.stringify({ ...putYear }, undefined, 4);
    console.log(jsonString);

    wstream.write(jsonString, (err) => {
      if (err) {
        console.log(err.message);
      } else {
        console.log('bytes written');
      }
    });
  });
