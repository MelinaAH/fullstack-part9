import patients from '../../data/patients';
import { Patient, PatientFieldsToDisplay } from '../types';

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
}

export default { getPatients, getPatientFieldsToDisplay };
