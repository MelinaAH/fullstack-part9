import { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Link, Routes, useParams } from "react-router-dom";
import { Button, Divider, Container, Typography } from '@mui/material';

import { apiBaseUrl } from "./constants";
import { Patient } from "./types";

import patientService from "./services/patients";
import PatientListPage from "./components/PatientListPage";
import { PatientInformation } from "./components/PatientInformation";

const App = () => {
  const [patients, setPatients] = useState<Patient[]>([]);

  useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchPatientList = async () => {
      const patients = await patientService.getAll();
      setPatients(patients);
    };
    void fetchPatientList();
  }, []);

  /*const { id } = useParams<{ id: string }>();
  const patient = patients.find(p => p.id === id);*/

  const PatientInfo = ({ patients }: { patients: Patient[] }) => {
    const { id } = useParams<{ id: string }>();
    const patient = patients.find(p => p.id === id);
  
    if (!patient) {
      return <div>Patient not found</div>;
    }
  
    return <PatientInformation patient={patient} />;
  };

  return (
    <div className="App">
      <Router>
        <Container>
          <Typography variant="h3" style={{ marginBottom: "0.5em" }}>
            Patientor
          </Typography>
          <Button component={Link} to="/" variant="contained" color="primary">
            Home
          </Button>
          <Divider hidden />
          <Routes>
            <Route path="/" element={<PatientListPage patients={patients} setPatients={setPatients} />} />
            <Route path="/patients/:id" element={<PatientInfo patients={patients} />} />
          </Routes>
        </Container>
      </Router>
    </div>
  );
};

export default App;
