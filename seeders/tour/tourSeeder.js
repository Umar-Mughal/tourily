const fs = require('fs');
const seeder = require('../seeder');
const Tour = require('../../models/tour/tourModel');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/tourSeederData.json`, 'utf-8')
);

if (process.argv[2] === '--import') {
  seeder.importData(Tour, tours);
} else if (process.argv[2] === '--delete') {
  seeder.deleteData(Tour);
}

console.log('Process argv', process.argv);
