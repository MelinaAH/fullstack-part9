import { Diagnose, Patient } from "../../types"
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import TransgenderIcon from '@mui/icons-material/Transgender';

interface Props {
  patient: Patient;
  diagnoses: Diagnose[];
}
export const PatientInformation = ({ patient, diagnoses }: Props) => {
  const getDiagnosisName = (code: string): string => {
    const diagnosis = diagnoses.find((d) => d.code === code);
    if (!diagnosis) {
      return code;
    }
    return `${diagnosis.code} ${diagnosis.name}`;
  };

  return (
    <div>
      <h2>
        {patient.name} {' '}
        {patient.gender === 'female' ? <FemaleIcon /> : patient.gender === 'male' ? <MaleIcon /> : <TransgenderIcon />}
      </h2>
      <p>ssn: {patient.ssn}</p>
      <p>occupation: {patient.occupation}</p>
      <h3>entries</h3>
      {patient.entries.map((entry) => (
        <div key={entry.id}>
          <p>{entry.date} <span style={{ fontStyle: 'italic' }}>{entry.description}</span></p>
          {entry.diagnosisCodes && (
            <ul>
              {entry.diagnosisCodes.map((code) => (
                <li key={code}>{getDiagnosisName(code)}</li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  )
};
