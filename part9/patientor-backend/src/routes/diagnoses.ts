import express, { Response } from 'express';
import diagnoseService from '../services/diagnoseService';
import { Diagnosis } from '../type';

const router = express.Router();

router.get('/', (_req, res: Response<Diagnosis[]>) => {
  res.send(diagnoseService.getEntries());
});

export default router;