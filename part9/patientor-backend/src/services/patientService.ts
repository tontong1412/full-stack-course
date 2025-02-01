import patientData from '../data/patients';
import { v1 as uuid } from 'uuid';
import { Patient, NonSensitivePatient, NewPatient, EntryWithoutId, Entry } from '../type';

const getPatients = (): Patient[] => {
  return patientData;
};

const getNonSensitivePatients = (): NonSensitivePatient[] => {
  return patientData.map(({id, name, dateOfBirth, gender, occupation})=>({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const findById = (id: string): Patient | undefined => {
  const patient = patientData.find((p) => p.id === id);
  return patient;
};

const addPatient = (patient: NewPatient): Patient => {
  const newPatient: Patient = {
    id: uuid(),
    ...patient
  };
  patientData.push(newPatient);
  return newPatient;
};

const addEntry = (patientId: string, entry: EntryWithoutId): Patient => {
  const patient = patientData.find((p)=> p.id === patientId);
  if(patient){
    const newEntry: Entry = {
      id: uuid(),
      ...entry
    };
    const tempEntries = [...patient.entries];
    tempEntries.push(newEntry);
    patient.entries = tempEntries;
    return patient;
  }
  throw new Error('Patient not found');
};

export default {
  getPatients,
  getNonSensitivePatients,
  addPatient,
  findById,
  addEntry
};
