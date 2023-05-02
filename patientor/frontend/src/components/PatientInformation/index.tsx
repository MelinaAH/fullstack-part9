import { Patient } from "../../types"
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import TransgenderIcon from '@mui/icons-material/Transgender';

interface Props {
  patient: Patient;
}

export const PatientInformation = ({ patient }: Props) => {
  return (
    <div>
      <h2>
        {patient.name} {' '}
        {patient.gender === 'female' ? <FemaleIcon/> : patient.gender === 'male' ? <MaleIcon /> : <TransgenderIcon />}
      </h2>
      <p>ssn: {patient.ssn}</p>
      <p>occupation: {patient.occupation}</p>
    </div>
  )
};
