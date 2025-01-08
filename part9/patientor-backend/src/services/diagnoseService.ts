import diagnoseData from '../data/diagnoses';
import { Diagnosis } from '../type';

const diagnosis: Diagnosis[] = diagnoseData;

const getEntries = (): Diagnosis[] => {
  return diagnosis;
};

export default {
  getEntries
};