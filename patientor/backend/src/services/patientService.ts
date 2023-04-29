import patients from '../../data/patients';
import { Patient, NonSensitivePatient, NewPatient } from '../types';
import { v1 as uuidv1 } from 'uuid';

const getPatients = (): Patient[] => {
  return patients;
};

const getPatientFieldsToDisplay = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const findPatient = (id: string): Patient | undefined => {
  const patient = patients.find(p => p.id === id);
  if (!patient) {
    return undefined;
  }
  return {
    ...patient,
    entries: patient.entries || []
  }
}

const addPatient = (entry: NewPatient): Patient => {
  const newPatient = {
    id: uuidv1(),
    ...entry
  };

  patients.push(newPatient);
  return newPatient;
};

export default {
  getPatients,
  getPatientFieldsToDisplay,
  addPatient,
  findPatient
};
