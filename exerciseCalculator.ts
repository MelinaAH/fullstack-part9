interface Result {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

export const calculateExercises = (target: number, weeklyExercises: number[]): Result => {
  const periodLength = weeklyExercises.length;
  const trainingDays = weeklyExercises.reduce((count, hours) => hours > 0 ? count + 1 : count, 0);
  const totalHours = weeklyExercises.reduce((count, hours) => count + hours, 0);
  const average = totalHours / periodLength;
  const success = average >= target;
  let rating = 0;
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
  };
};

// // this part is needed in the exercise 9.3
/*try {
  const target = Number(process.argv[2]);
  // converts the process.argv object to a proper array. 
  // The slice() method removes the first three arguments 
  // (the executable path (npm run), the name of the script
  // (calculateExercises), and the target value), 
  // and the second argument to Array.from() is a function 
  // that maps each element to a number
  const weeklyExercises = Array.from(process.argv.slice(3), Number);

  if (isNaN(target) || weeklyExercises.some(isNaN)) {
    throw new Error('Invalid arguments');
  }

  console.log(calculateExercises(target, weeklyExercises));
} 
catch (error: unknown) {
  let errorMessage = 'something went wrong: ';
  
  if (error instanceof Error) {
    errorMessage += error.message;
  }

  console.log(errorMessage);
}*/
