import { OccupationalHealthcareEntry } from "../../../types"; 
const OccupationalEntry: React.FC<{ entry: OccupationalHealthcareEntry}> = ({ entry})=> {
  return (
    <div>
      <div>{entry.date}: {entry.employerName}</div>
      <div>{entry.description}</div>
      <div>diagnose by {entry.specialist}</div>
    </div>
  );
};
export default OccupationalEntry;