import patients from '../../data/patients';
import { Patient, PatientFieldsToDisplay, NewPatient } from '../types';
import { v1 as uuidv1 } from 'uuid';

const getPatients = (): Patient[] => {
  return patients;
};

const getPatientFieldsToDisplay = (): PatientFieldsToDisplay[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

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
  addPatient
};
