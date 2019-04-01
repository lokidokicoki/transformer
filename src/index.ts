import * as fs from 'fs-extra';
import * as uuid from 'short-uuid';

const inputFile = 'records.json';
const outputFile = 'jalopy.json';

let records: { vehicles: { [x: string]: any; }; services: { [x: string]: any; }; fillUps: { [x: string]: any; }; };

let vehicles = new Map();
let services = new Map();
let fillUps = new Map();

async function main() {
  records = await fs.readJson(inputFile);

  for (const key of Object.keys(records.vehicles)) {
    const record = records.vehicles[key];
    record.id = uuid.generate();
    vehicles.set(record.id, record);
  }

  for (const key of Object.keys(records.services)) {
    const record = records.services[key];
    record.id = uuid.generate();
    services.set(record.id, record);
  }
  for (const key of Object.keys(records.fillUps)) {
    const record = records.fillUps[key];
    record.id = uuid.generate();
    fillUps.set(record.id, record);
  }



  let output = {
    vehicles: [...vehicles],
    services: [...services],
    fillUps: [...fillUps]
  }

  await fs.writeJson(outputFile, output, { spaces: 2 });
}


main();
