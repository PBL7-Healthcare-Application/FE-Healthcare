/* eslint-disable no-prototype-builtins */


import getImageUpload from "./uploadCloudinary";
import dayjs from 'dayjs';

export const bodyPartner = async (values, isEdu, isExper) => {
    const body = {
        idSpecialty: values.idSpecialty,
        nameClinic: values.nameClinic,
        businessLicense: typeof values.businessLicense === 'string' ? values.businessLicense : await getImageUpload(values.businessLicense.file.originFileObj),
        certificates: await Promise.all(values.certificates.map(async item => {
            return {
                name: item.name,
                year: item.year.$y,
                image: typeof item.image === 'string' ? item.image : await getImageUpload(item.image.file.originFileObj)
            }
        })),
        workingProcesses: isExper ? values.workingProcesses.map(item => {
            return {
                position: item.position,
                startYear: item.startYear?.$y,
                endYear: item.endYear?.$y,
                workplace: item.workplace
            }
        }) : [],
        trainingProcesses: isEdu ? values.trainingProcesses.map(item => {
            return {
                schoolName: item.schoolName,
                startYear: item.startYear?.$y,
                endYear: item.endYear?.$y,
                major: item.major
            }
        }) : [],
    }

    return body;
}

export const customResCertificates = (arr) => {
    return arr.map(item => {
        return {
            name: item.name,
            year: dayjs(item.year.toString(), 'YYYY'),
            image: item.image
        }
    })
}
export const customResExperiences = (arr) => {
    return arr.map(item => {
        return {
            position: item.position,
            startYear: dayjs(item.startYear?.toString(), 'YYYY'),
            endYear: dayjs(item.endYear?.toString(), 'YYYY'),
            workplace: item.workplace
        }
    })
}

export const customResTrainings = (arr) => {
    return arr.map(item => {
        return {
            schoolName: item.schoolName,
            startYear: dayjs(item.startYear?.toString(), 'YYYY'),
            endYear: dayjs(item.endYear?.toString(), 'YYYY'),
            major: item.major
        }
    })
}