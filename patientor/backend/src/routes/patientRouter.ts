import express from "express";
import patientService from '../services/patientService';
import toNewPatient from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  const patients = patientService.getPatientFieldsToDisplay();
  res.send(patients);
});

router.get('/:id', (req, res) => {
  const data = patientService.findPatient(req.params.id);

  if (!data) {
    return res.sendStatus(404);
  }
  else {
    return res.send(data);
  }
})

router.post('/', (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);
    const addedPatient = patientService.addPatient(newPatient);
    res.json(addedPatient);
  }
  catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;
