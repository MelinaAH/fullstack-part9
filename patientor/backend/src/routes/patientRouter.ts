import express from "express";
import patientService from '../services/patientService';

const router = express.Router();

router.get('/', (_req, res) => {
  const patients = patientService.getPatientFieldsToDisplay();
  res.send(patients);
});

export default router;