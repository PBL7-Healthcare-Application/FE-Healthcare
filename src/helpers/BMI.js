

export const inforBMI = (bmi) => {
    if (bmi < 18.5) {
        return {
            color: 'rgb(63, 198, 251)',
            text: 'underweight'
        };
    } else if (bmi >= 18.5 && bmi <= 24.9) {
        return {
            color: 'rgb(12, 198, 86)',
            text: 'normalweight'
        };
    } else if (bmi >= 25 && bmi <= 29.9) {
        return {
            color: 'rgb(255, 214, 58)',
            text: 'overweight'
        };
    } else if (bmi >= 30 && bmi <= 34.9) {
        return {
            color: 'rgb(255, 153, 64)',
            text: 'obesity level I'
        };
    } else if (bmi >= 35) {
        return {
            color: 'rgb(253, 44, 44)',
            text: 'obesity level II'
        };
    }
}

function calculateIdealWeightRange(height) {
    const minWeight = 18.5 * height * height;
    const maxWeight = 24.9 * height * height;
    return {
        minWeight: minWeight.toFixed(1),
        maxWeight: maxWeight.toFixed(1)
    };
}
export const adviceBMI = (bmi, height) => {
    if (bmi < 18.5) {
        return {
            status: 'You are considered underweight if you have a BMI of under 18.5',
            risk: 'Studies have found that those who are underweight are at greater risk of malnutrition, reduced immunity, infertility, osteoporosis, slow wound healing, and surgical complications.',
            advice: {
                title: `Your ideal weight range ${calculateIdealWeightRange(height).minWeight} - ${calculateIdealWeightRange(height).maxWeight}`,
                content: "If you want to gain weight, it’s important to first determine how many calories you need per day to perform basic bodily functions and daily activities."
            }
        };
    } else if (bmi >= 18.5 && bmi <= 24.9) {
        return {
            status: 'You are considered to have an ideal body weight if you have a BMI that falls between 18.5 to 24.9',
            risk: 'Even those with a healthy BMI can be at risk for certain health conditions. So it’s important to maintain a healthy lifestyle through proper diet, ample exercise, and regular check-ups to remain in optimal health.',
            advice: {
                title: `Your ideal weight range ${calculateIdealWeightRange(height).minWeight} - ${calculateIdealWeightRange(height).maxWeight}`,
                content: "If you want to maintain your body weight, it’s important to first determine how many calories you need per day to perform basic bodily functions and daily activities.Consume food and drinks which provide an equal amount of calories to your daily calorie requirement."
            }
        };
    } else if (bmi >= 25 && bmi <= 29.9) {
        return {
            status: 'You are considered overweight if you have a BMI that falls between 25 to 29.9',
            risk: 'Being overweight can increase a person’s risk of developing type 2 diabetes, hypertension, heart disease, stroke, osteoarthritis, high cholesterol fatty liver disease, kidney disease and certain types of cancer.',
            advice: {
                title: `Your ideal weight range ${calculateIdealWeightRange(height).minWeight} - ${calculateIdealWeightRange(height).maxWeight}`,
                content: "If you want to lose weight, it’s important to first determine how many calories you need per day to perform basic bodily functions and daily activities. Next, consume food and drink with that provide fewer calories than your daily requirement."
            }
        };
    } else if (bmi >= 30 && bmi <= 34.9) {
        return {
            status: 'You are considered obese level I if you have a BMI in between 30 to 34.9',
            risk: 'Obesity can increase a person’s risk of developing type 2 diabetes, hypertension, heart disease, stroke, osteoarthritis, high cholesterol fatty liver disease, kidney disease and certain types of cancer.',
            advice: {
                title: `Your ideal weight range ${calculateIdealWeightRange(height).minWeight} to ${calculateIdealWeightRange(height).maxWeight}`,
                content: "If you want to lose weight, you must first determine how many calories you need per day to perform basic bodily functions and daily activities. Next, consume food and drink with that provide fewer calories than your daily requirement."
            }
        };
    } else if (bmi >= 35) {
        return {
            status: 'You are considered obese level II if have a BMI of more than 35',
            risk: 'Obesity increases a person’s risk of developing type 2 diabetes, hypertension, heart disease, stroke, osteoarthritis, high cholesterol fatty liver disease, kidney disease and certain types of cancer.',
            advice: {
                title: `Your ideal weight range ${calculateIdealWeightRange(height).minWeight} - ${calculateIdealWeightRange(height).maxWeight}`,
                content: "If you want to lose weight, firstly determine how many calories you need per day to perform basic bodily functions and daily activities. Next, consume food and drink with that provide fewer calories than your daily requirement."
            }
        };
    }
}

export const activities = (bmr) => {

    return [
        {
            key: 1,
            level: 'Little to no exercise',
            calo: (bmr * 1.2).toFixed(0) / 1000
        },
        {
            key: 2,
            level: 'Light exercise 1-3 times per week',
            calo: (bmr * 1.375).toFixed(0) / 1000
        },
        {
            key: 3,
            level: 'Moderate exercise 3-5 times per week',
            calo: (bmr * 1.55).toFixed(0) / 1000
        },
        {
            key: 5,
            level: 'Heavy physical exercise 5-6 times per week',
            calo: (bmr * 1.725).toFixed(0) / 1000
        },
        {
            key: 5,
            level: 'Heavy physical exercise 6-7 times per week',
            calo: (bmr * 1.9).toFixed(0) / 1000
        }
    ];
}