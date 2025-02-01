import { z } from "zod";
import { newPatientSchema } from "./utils";

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface Entry {
  // description: string,
  // createdAt: string,
  // createdBy: string,
  // diagnosisCode: string,
}

export interface Patient {
  id: string,
  name: string,
  dateOfBirth: string,
  ssn: string,
  gender: Gender,
  occupation: string,
  entries: Entry[],
}

export type NonSensitivePatient = Omit<Patient, 'ssn' | 'entries'>;

export type NewPatient = z.infer<typeof newPatientSchema>;

export interface Diagnosis {
  code: string,
  name: string,
  latin?: string,
}