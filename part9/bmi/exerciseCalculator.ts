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
  const rating = average / target
  if (rating < 0.5){
    return {
      rating: 1,
      description: 'Try harder'
    }
  }else if( rating >= 0.5 && rating < 1) {
    return  {
       rating: 2,
       description: "not too bad but could be better"
    }
  } else {
    return {
      rating: 3,
      description: "Good job!"
    }
  }
}

const calculateExercises = (exerciseHours: number[], targetHours: number): Result => {
  const average: number = exerciseHours.reduce((acc, val)=> acc += val, 0) / exerciseHours.length
  const {rating, description} = calculateRating(average, targetHours)
  return { 
    periodLength: exerciseHours.length,
    trainingDays: exerciseHours.filter(h=>h > 0).length,
    target: targetHours,
    average,
    success: average >= targetHours,
    rating,
    ratingDescription: description,
  }
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))