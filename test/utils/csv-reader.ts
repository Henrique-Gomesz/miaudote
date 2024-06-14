import csvParser from 'csv-parser';
import { createReadStream } from 'fs';

interface UserCSV {
  name: string;
  document: string;
  password: string;
  email: string;
  phone: string;
  birthday: string;
  city: string;
  state: string;
  street: string;
  number: string;
  zipCode: string;
  complement: string;
  neighborhood: string;
  about: string;
  image: string;
}

export function readCSVFile(filePath: string): Promise<UserCSV[]> {
  return new Promise((resolve, reject) => {
    const results: UserCSV[] = [];
    createReadStream(filePath)
      .pipe(csvParser())
      .on('data', (data) => results.push(data))
      .on('end', () => resolve(results))
      .on('error', (error) => reject(error));
  });
}
