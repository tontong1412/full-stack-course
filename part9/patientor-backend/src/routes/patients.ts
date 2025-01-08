import express, { Response } from 'express';
import patientService from '../services/patientService';
import { NonSensitivePatient } from '../type';

const router = express.Router();

router.get('/', (_req, res: Response<NonSensitivePatient[]>) => {
  res.send(patientService.getNonSensitivePatients());
});


export default router;