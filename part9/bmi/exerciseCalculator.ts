interface Args {
  target: number,
  exercises: number[],
}
interface Result {
  periodLength: number,
  trainingDays: number,
  target: number,
  average: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
}

interface Rating {
  rating: number,
  description: string,
}

const calculateRating = (average: number, target: number): Rating => {
  const rating = average / target;
  if (rating < 0.5){
    return {
      rating: 1,
      description: 'Try harder'
    };
  }else if( rating >= 0.5 && rating < 1) {
    return  {
       rating: 2,
       description: "not too bad but could be better"
    };
  } else {
    return {
      rating: 3,
      description: "Good job!"
    };
  }
};

export const calculateExercises = (exerciseHours: number[], targetHours: number): Result => {
  const average: number = exerciseHours.reduce((acc, val)=> acc += val, 0) / exerciseHours.length;
  const {rating, description} = calculateRating(average, targetHours);
  return { 
    periodLength: exerciseHours.length,
    trainingDays: exerciseHours.filter(h=>h > 0).length,
    target: targetHours,
    average,
    success: average >= targetHours,
    rating,
    ratingDescription: description,
  };
};

const parseArguments = (args: string[]): Args => {
  if (args.length < 3) throw new Error('Not enough arguments');

  const target: number = Number(args[2]);
  if(isNaN(target)) throw new Error('Target should be number');

  const exerciseHoursArray: number[] = [];
  for(let i = 3; i < args.length; i++){
    const hours = Number(args[i]);
    if(isNaN(hours)) throw new Error('Hours of exercise should be number');
    exerciseHoursArray.push(hours);
  }

  return {
    target,
    exercises: exerciseHoursArray
  };
};


try {
  const { target, exercises } = parseArguments(process.argv);
  const exeriseRating = calculateExercises(exercises, target);
  console.log(exeriseRating);
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}