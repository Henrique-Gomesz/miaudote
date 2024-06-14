import csvParser from 'csv-parser';
import { createReadStream } from 'fs';

interface UserCreateCSV {
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

interface UserUpdateCSV {
  id: string;
  name?: string;
  birthday?: string;
  about?: string;
  image?: string;
}

export function readCreateCSVFile(filePath: string): Promise<UserCreateCSV[]> {
  return new Promise((resolve, reject) => {
    const results: UserCreateCSV[] = [];
    createReadStream(filePath)
      .pipe(csvParser())
      .on('data', (data) => results.push(data))
      .on('end', () => resolve(results))
      .on('error', (error) => reject(error));
  });
}

export function readUpdateCSVFile(filePath: string): Promise<UserUpdateCSV[]> {
  return new Promise((resolve, reject) => {
    const results: UserUpdateCSV[] = [];
    createReadStream(filePath)
      .pipe(csvParser())
      .on('data', (data) => results.push(data))
      .on('end', () => resolve(results))
      .on('error', (error) => reject(error));
  });
}
