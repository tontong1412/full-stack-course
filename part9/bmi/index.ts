import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { isArrayOfNumber } from './utils';
import { calculateExercises } from './exerciseCalculator';
const app = express();
app.use(express.json());

app.get('/ping', (_req, res) => {
  res.send('pong');
});

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});


app.get('/bmi', (req, res) => {
  const { height, weight } = req.query;
  if(!height || !weight || isNaN(Number(height)) || isNaN(Number(weight))) {
    return res.status(400).send({error: "malformatted parameters"});
  }
  const weightNum = Number(weight);
  const heightNum = Number(height);
  const bmi = calculateBmi(heightNum, weightNum);

  return res.send({
    weight: weightNum,
    height: heightNum,
    bmi: bmi
  });
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { target, daily_exercises } = req.body;

  if(!target || !daily_exercises ) {
    return res.status(400).send({error: "parameters missing"});
  }

  const targetNum = Number(target);
  if(isNaN(targetNum) || !isArrayOfNumber(daily_exercises as unknown[])){
    return res.status(400).send({error: "malformatted parameters"});
  }
  const daily_exercises_convertible_number = daily_exercises as (string|number)[];
   
  const daily_exercises_num: number[] = daily_exercises_convertible_number.map(elm=>Number(elm));

  const result = calculateExercises(daily_exercises_num, targetNum);
  return res.send(result);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});