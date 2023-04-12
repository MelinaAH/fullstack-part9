const calculateBmi = (height: number, weight: number) => {
  const heightInCm = height / 100;
  const bmi = weight / (heightInCm * heightInCm);

  if (bmi < 18.5) {
    console.log('Underweight')
  }
  else if (bmi > 25 ) {
    console.log('Overweight')
  }
  else {
    console.log('Normal (healthy weight)');
  }
};

calculateBmi(180, 74);
