interface Result {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

const calculateExercises = (weeklyExercises: number[], target: number): Result => {
  const periodLength = weeklyExercises.length;
  const trainingDays = weeklyExercises.filter(hours => hours > 0).length;
  const totalHours = weeklyExercises.reduce((acc, hours) => acc + hours, 0);
  const average = totalHours / periodLength;
  const success = average >= target;
  let rating = 1 | 2 | 3;
  let ratingDescription = '';

  if (average >= target) {
    rating = 3;
    ratingDescription = 'Good job';
  }
  else if (average >= target * 0.8) {
    rating = 2;
    ratingDescription = 'Not too bad but could be better';
  }
  else {
    rating = 1;
    ratingDescription = 'You need to work harder';
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average
  }
};

console.log(calculateExercises([2, 1, 3, 2, 1, 3, 2], 2));
