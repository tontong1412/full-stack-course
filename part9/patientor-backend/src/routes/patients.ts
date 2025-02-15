 
import express, { NextFunction, Request, Response } from 'express';
import patientService from '../services/patientService';
import { EntryWithoutId, NewPatient, NonSensitivePatient, Patient } from '../type';
import { newEntrySchema, newPatientSchema } from '../utils';
import { z } from 'zod';

const router = express.Router();

const newPatientParser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    newPatientSchema.parse(req.body);
    next();
  }catch (error: unknown) {
    next(error);
  }
};

const newEntryParser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    console.log(req.body);
    newEntrySchema.parse(req.body);
    next();
  }catch (error: unknown) {
    next(error);
  }
};

const errorMiddleware = (error: unknown, _req: Request, res: Response, next: NextFunction) => { 
  if (error instanceof z.ZodError) {
    res.status(400).send({ error: error.issues });
  } else {
    next(error);
  }
}; 

router.get('/:id', (req , res: Response<Patient>) => {
  const patient = patientService.findById(req.params.id);
  if(patient){
    res.send(patient);
  }else {
    res.sendStatus(404);
  }
});

router.post('/:id/entries', newEntryParser, (req: Request<{id: string}, unknown, EntryWithoutId>, res: Response<Patient>) => {
  const updatedPatient: Patient = patientService.addEntry(req.params.id, req.body);
  res.json(updatedPatient);
});

router.get('/', (_req, res: Response<NonSensitivePatient[]>) => {
  res.send(patientService.getNonSensitivePatients());
});

router.post('/', newPatientParser, (req: Request<unknown, unknown, NewPatient>, res: Response<Patient>) => {
  const addedPatient: Patient = patientService.addPatient(req.body);
  res.json(addedPatient);
});



router.use(errorMiddleware);

export default router;