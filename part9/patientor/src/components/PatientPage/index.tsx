import { useParams } from "react-router-dom";
import { Diagnosis, Patient } from "../../types";
import { useEffect, useState } from "react";
import patientService from '../../services/patients';
import diagnosisService from "../../services/diagnoses";
import EntryDetails from "./EntryDetails";

const PatientPage = () => {
  const id = useParams().id;
  const [patient, setPatient] = useState<Patient>();
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

  useEffect(() => {
    const fetchPatient = async () => {
      if(id){
        const data = await patientService.getByID(id);
        setPatient(data);
      }
    };
    fetchPatient();
    
  }, [id]);

  useEffect(()=> {
    const fetchDiagnoses = async () => {
      const data = await diagnosisService.getAll();
      setDiagnoses(data);
    };
    fetchDiagnoses();
  });

  return (
    <div>
      {patient ? <div>
        <h2>{patient.name}</h2>
        <p>ssn: {patient.ssn}</p>
        <p>occupation: {patient.occupation}</p>
        <h3>Entries</h3>
        {patient.entries.map(e=><EntryDetails entry={e}/>)}
      </div>
      :<p> Patient not found</p>
      }
    </div>
  );
};
export default PatientPage;