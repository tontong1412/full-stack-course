import express from 'express'
import { calculateBmi } from './bmiCalculator';
const app = express();

app.get('/ping', (_req, res) => {
  res.send('pong');
});

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const { height, weight } = req.query
  if(!height || !weight || isNaN(Number(height)) || isNaN(Number(weight))) {
    return res.status(400).send({error: "malformatted parameters"});
  }
  const weightNum = Number(weight)
  const heightNum = Number(height)
  const bmi = calculateBmi(heightNum, weightNum)

  return res.send({
    weight: weightNum,
    height: heightNum,
    bmi: bmi
  })
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});