import { CoursePart } from "../type"

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part = ({part}: {part:CoursePart}) => {
  const renderCommon = () => <h3>{part.name} {part.exerciseCount}</h3>
  switch (part.kind){
    case 'basic':
      return (
        <div>
          {renderCommon()}
          <div>{part.description}</div>
        </div>
      )
    case 'group':
      return (
        <div>
          {renderCommon()}
          <div>project exercises {part.groupProjectCount}</div>
        </div>
      )
    case 'background':
      return (
        <div>
          {renderCommon()}
          <div>{part.description}</div>
          <div>submit to {part.backgroundMaterial}</div>
        </div>
      )
    case 'special':
      return (
        <div>
          {renderCommon()}
          <div>{part.description}</div>
          <div>required skills: {part.requirements.join(' ')}</div>
        </div>
      )
    default:
      return assertNever(part);
  }
}
export default Part