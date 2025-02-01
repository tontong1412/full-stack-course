import { HealthCheckEntry } from "../../../types"; 
const HealthCheckEntryComponent: React.FC<{ entry: HealthCheckEntry}> = ({ entry})=> {
  return (
    <div>
      <div>{entry.date}</div>
      <div>{entry.description}</div>
      <div>rating: {entry.healthCheckRating}</div>
      <div>diagnose by {entry.specialist}</div>
    </div>
  );
};
export default HealthCheckEntryComponent;