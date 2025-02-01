import { Gender, NewPatient } from "./type";
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


export default toNewPatient;
