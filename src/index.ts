import * as fs from 'fs-extra';
import * as path from 'path';
import * as uuid from 'short-uuid';

const inputFile = 'records.json';
const outputFile = 'jalopy.json';

let records;

let    vehicles = new Map();
let services = new Map();
let fillUps = new Map();

async function main(){
    records = await fs.readJson(inputFile);

    for(const key of Object.keys(records.vehicles)){
        const vehicle = records.vehicles[key];
        //console.log(vehicle)
        vehicle.id = uuid.generate();
        vehicles.set(vehicle.id, vehicle);

    }

   let output = {
        vehicles : [...vehicles],

    }
    console.log(output.vehicles)


    

    await fs.writeJson(outputFile, output);
}


main();
