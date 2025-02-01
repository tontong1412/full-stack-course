import { EntryWithoutId, Gender, HealthCheckRating, NewPatient } from "./type";
import { z } from "zod";

export const newPatientSchema = z.object({
  name: z.string(),
  gender: z.nativeEnum(Gender),
  dateOfBirth: z.string().date(),
  occupation: z.string(),
  ssn: z.string(),
  entries: z.array(z.any()),
});

export const toNewPatient = (object: unknown): NewPatient => {
 return newPatientSchema.parse(object);
};

export const baseEntrySchema = z.object({
  description: z.string(),
  date: z.string().date(),
  specialist: z.string(),
  diagnosisCodes: z.array(z.string()).optional(),
});

export const hospitalEntrySchema = baseEntrySchema.extend({
  type: z.literal('Hospital'),
  discharge: z.object({
    date: z.string().date(),
    criteria: z.string(),
  }),
});
export const occupationalEntrySchema = baseEntrySchema.extend({
  type: z.literal('OccupationalHealthcare'),
  employerName: z.string(),
  sickLeave: z.object({
    startDate: z.string().date(),
    endDate: z.string().date(),
  }),
});
export const healthCheckEntrySchema = baseEntrySchema.extend({
  type: z.literal('HealthCheck'),
  healthCheckRating: z.nativeEnum(HealthCheckRating),
});

export const newEntrySchema = z.discriminatedUnion('type', [
  healthCheckEntrySchema,
  hospitalEntrySchema,
  occupationalEntrySchema,
]);

export const toNewEntry = (object: unknown): EntryWithoutId => {
  return newEntrySchema.parse(object);
};


export default toNewPatient;
