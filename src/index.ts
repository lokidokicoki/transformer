import * as fs from 'fs-extra';
import * as uuid from 'short-uuid';

const inputFile = 'records.json';
const outputFile = 'jalopy.json';

let records: { vehicles: { [x: string]: any; }; };

let vehicles = new Map();
let services = new Map();
let fillUps = new Map();

async function main() {
  records = await fs.readJson(inputFile);

  for (const key of Object.keys(records.vehicles)) {
    const vehicle = records.vehicles[key];
    //console.log(vehicle)
    vehicle.id = uuid.generate();
    vehicles.set(vehicle.id, vehicle);
  }

  let output = {
    vehicles: [...vehicles],
    services: [...services],
    fillUps: [...fillUps]
  }

  await fs.writeJson(outputFile, output, { spaces: 2 });
}


main();
