
import {  HospitalEntry } from "../../../types"; 
const HospitalEntryComponent: React.FC<{ entry: HospitalEntry}> = ({ entry})=> {
  return (
    <div>
      <div>{entry.date}</div>
      <div>{entry.description}</div>
      <div>{entry.discharge.date}: {entry.discharge.criteria}</div>
      <div>diagnose by {entry.specialist}</div>
    </div>
  );
};
export default HospitalEntryComponent;