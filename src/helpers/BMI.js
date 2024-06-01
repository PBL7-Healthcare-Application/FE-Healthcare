

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
            status: 'You are considered underweight because your BMI is below 18.5',
            risk: 'Studies indicate that underweight individuals are at higher risk of malnutrition, weakened immune system, infertility, osteoporosis, slow wound healing, and are more likely to experience complications after surgery.',
            advice: {
                title: `your ideal weight is in the range of ${calculateIdealWeightRange(height).minWeight} to ${calculateIdealWeightRange(height).maxWeight}`,
                content: "If you want to gain weight, the first important thing is to determine how many calories you need each day to perform basic bodily functions and daily activities."
            }
        };
    } else if (bmi >= 18.5 && bmi <= 24.9) {
        return {
            status: 'You are considered to have an ideal body weight because your BMI is between 18.5 to 24.9',
            risk: 'Even individuals with a healthy BMI may still face the risk of developing certain health conditions. Therefore, it\'s important to adopt a healthy lifestyle through proper nutrition, regular physical activity, and routine health check-ups to maintain the best possible health.',
            advice: {
                title: `your ideal weight is in the range of ${calculateIdealWeightRange(height).minWeight} to ${calculateIdealWeightRange(height).maxWeight}`,
                content: "If you want to maintain your body weight, first determine how many calories you need each day to perform basic bodily functions and daily activities.\nChoose foods and drinks that provide a calorie intake equivalent to your daily calorie needs."
            }
        };
    } else if (bmi >= 25 && bmi <= 29.9) {
        return {
            status: 'You are considered overweight because your BMI is is between 25 to 29.9',
            risk: 'Being overweight can increase the risk of developing type 2 diabetes, high blood pressure, heart disease, stroke, joint inflammation, fatty liver disease, kidney disease, and some cancers.',
            advice: {
                title: `your ideal weight is in the range of ${calculateIdealWeightRange(height).minWeight} to ${calculateIdealWeightRange(height).maxWeight}`,
                content: "If you want to lose weight, first you need to determine the number of calories you need to consume each day to perform basic bodily functions and daily activities. Then, choose foods and drinks that provide fewer calories than your daily needs."
            }
        };
    } else if (bmi >= 30 && bmi <= 34.9) {
        return {
            status: 'You are considered obesity level I because your BMI is between 30 to 34.9',
            risk: 'Obesity can increase the risk of developing type 2 diabetes, high blood pressure, heart disease, stroke, joint inflammation, fatty liver disease, kidney disease, and some cancers.',
            advice: {
                title: `your ideal weight is in the range of ${calculateIdealWeightRange(height).minWeight} to ${calculateIdealWeightRange(height).maxWeight}`,
                content: "If you want to lose weight, first you need to determine how many calories you need each day to perform basic bodily functions and daily activities. Then, eat foods that provide fewer calories than your daily needs."
            }
        };
    } else if (bmi >= 35) {
        return {
            status: 'You are considered obesity level II because your BMI is over 35',
            risk: 'Obesity can increase the risk of developing type 2 diabetes, high blood pressure, heart disease, stroke, joint inflammation, fatty liver disease, kidney disease, and some cancers.',
            advice: {
                title: `your ideal weight is in the range of ${calculateIdealWeightRange(height).minWeight} to ${calculateIdealWeightRange(height).maxWeight}`,
                content: "If you want to lose weight, first you need to determine how many calories you need each day to perform basic bodily functions and daily activities. Then, eat foods that provide fewer calories than your daily needs."
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