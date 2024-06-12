/* eslint-disable no-prototype-builtins */

import getImageUpload from "./uploadCloudinary";
import dayjs from "dayjs";

export const bodyPartner = async (values) => {
  const body = {
    idSpecialty: values.idSpecialty,
    nameClinic: values.nameClinic,
    businessLicense: await getImageUpload(
      values.businessLicense.file
    ),
    certificates: await Promise.all(
      values.certificates.map(async (item) => {
        return {
          name: item.name,
          year: item.year.$y,
          image: await getImageUpload(item.image.file),
        };
      })
    ),
    workingProcesses: values.workingProcesses.map((item) => {
      return {
        position: item.position,
        startYear: item.startYear?.$y,
        endYear: item.endYear?.$y,
        workplace: item.workplace,
      };
    }),
    trainingProcesses: values.trainingProcesses.map((item) => {
      return {
        schoolName: item.schoolName,
        startYear: item.startYear?.$y,
        endYear: item.endYear?.$y,
        major: item.major,
      };
    }),
  };

  return body;
};
export const customResCertificate = async (data) => {
  console.log("data", data);
  return await Promise.all(
    data.map(async (item) => {
      return {
        name: item.name,
        year: item.year.$y,
        image: await getImageUpload(item.image.fileList[0].originFileObj),
      };
    })
  )
}

export const customResCertificates = (arr) => {
  return arr.map((item) => {
    return {
      name: item.name,
      year: dayjs((parseInt(item.year) + 1).toString(), "YYYY"),
      image: item.image,
    };
  });
};
export const customResExperiences = (arr) => {
  return arr.map((item) => {
    return {
      position: item.position,
      startYear: dayjs((parseInt(item.startYear) + 1).toString(), "YYYY"),
      endYear: dayjs((parseInt(item.endYear) + 1).toString(), "YYYY"),
      workplace: item.workplace,
    };
  });
};

export const customResTrainings = (arr) => {
  return arr.map((item) => {
    return {
      schoolName: item.schoolName,
      startYear: dayjs((parseInt(item.startYear) + 1).toString(), "YYYY"),
      endYear: dayjs((parseInt(item.endYear) + 1).toString(), "YYYY"),
      major: item.major,
    };
  });
};
