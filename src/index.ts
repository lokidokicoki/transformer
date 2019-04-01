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

  // update services and fillups first
  for (const key of Object.keys(records.services)) {
    const record = records.services[key];
    record.uid = uuid.generate();
    services.set(record.uid, record);
  }

  for (const key of Object.keys(records.fillUps)) {
    const record = records.fillUps[key];
    record.uid = uuid.generate();
    fillUps.set(record.uid, record);
  }

  // process each vehicle
  const servicesArray = [...services.values()]
  const fillUpsArray = [...fillUps.values()]
  for (const key of Object.keys(records.vehicles)) {
    const record = records.vehicles[key];
    record.uid = uuid.generate();

    record.serviceIDs.forEach(index => {
      const service = servicesArray.find(item => {
        return item.id === index;
      });

      if (service) {
        service.vehicleId = record.uid;
        delete service.id;
      }
    });

    record.fuelIDs.forEach(index => {
      const fillUp = fillUpsArray.find(item => {
        return item.id === index;
      });

      if (fillUp) {
        fillUp.vehicleId = record.uid;
        delete fillUp.id;
      }
    });

    delete record.serviceIDs;
    delete record.fuelIDs;
    delete record.id;
    vehicles.set(record.uid, record);
  }


  let output = {
    vehicles: [...vehicles],
    services: [...services],
    fillUps: [...fillUps]
  }

  await fs.writeJson(outputFile, output, { spaces: 2 });

  let newRecs = await fs.readJSON(outputFile);

  let nv = new Map(newRecs.vehicles)
  let ns = new Map(newRecs.services)
  let nf = new Map(newRecs.fillUps)


  console.log(nv)
}


main();
