const calculateBmi = (height: number, weight: number): string => {
  const heightInCm = height / 100;
  const bmi = weight / (heightInCm * heightInCm);

  if (isNaN(bmi) || heightInCm === 0 || weight === 0) {
    throw new Error('Invalid height or weight');
  }
  else if (bmi < 18.5) {
    return 'Underweight';
  }
  else if (bmi > 25) {
    return 'Overweight';
  }
  else {
    return 'Normal (healthy weight)';
  }
};

try {
  const height = Number(process.argv[2]);
  const weight = Number(process.argv[3]);

  if (isNaN(height) || isNaN(weight)) {
    throw new Error('Invalid arguments');
  }

  console.log(calculateBmi(height, weight));
} 
catch (error: unknown) {
  let errorMessage = 'something went wrong: ';
  
  if (error instanceof Error) {
    errorMessage += error.message;
  }

  console.log(errorMessage);
}
