import { Entry } from "../../../types";
import HealthCheckEntryComponent from "./HealthCheckEntry";
import HospitalEntryComponent from "./HospitalEntry";
import OccupationalEntry from "./OccupationalEntry";

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union entry: ${JSON.stringify(value)}`
  );
};
const EntryDetails: React.FC<{ entry: Entry}> = ({ entry}) => {
  switch (entry.type) {
    case "Hospital":
      return <HospitalEntryComponent entry={entry}/>;
    case "OccupationalHealthcare":
      return <OccupationalEntry entry={entry}/>;
    case "HealthCheck":
      return <HealthCheckEntryComponent entry={entry}/>;
    default: 
      return assertNever(entry);
  }
};

export default EntryDetails;