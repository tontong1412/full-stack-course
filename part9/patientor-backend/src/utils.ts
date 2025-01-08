import { Gender, NewPatient } from "./type";

const toNewPatient = (object: unknown): NewPatient => {
  if (!object || typeof object !== 'object'){
    throw new Error('Incorrect or missing data');
  }

  if('name' in object && 'gender' in object && 'dateOfBirth' in object && 'occupation' in object && 'ssn' in object){
    const newPatient: NewPatient = {
      name: parseName(object.name),
      gender: parseGender(object.gender),
      dateOfBirth: parseDate(object.dateOfBirth),
      occupation: parseOccupation(object.occupation),
      ssn: parseSSN(object.ssn),
    };

    return newPatient;
  }

  throw new Error('Incorrect data: some fields are missing');
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender).map(v => v.toString()).includes(param);
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseDate = (date: unknown): string => {
  if(!isString(date) || !isDate(date)){
    throw new Error('Incorrect or missing date: '+ date);
  }
  return date;
};

const parseName = (name: unknown): string => {
  if(!isString(name)){
    throw new Error('Incorrect or missing name');
  }
  return name;
};

const parseGender = (gender: unknown): Gender => {
  if(!isString(gender) || !isGender(gender)){
    throw new Error('Incorrect or missing gender: ' + gender);
  }
  return gender;
};

const parseOccupation = (occupation: unknown): string => {
  if(!isString(occupation)){
    throw new Error('Incorrect or missing occupation');
  }
  return occupation;
};

const parseSSN = (ssn: unknown): string => {
  if(!isString(ssn)){
    throw new Error('Incorrect or missing ssn');
  }
  return ssn;
};

export default toNewPatient;
