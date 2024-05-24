import http from "../helpers/http";

export const getUsers = (search, role, status, page = 1) => {
  let url = `/Admin/User/GetUser?page=${page}`;
  if (search !== undefined) {
    url += `&search=${search}`;
  }
  if (status !== undefined) {
    url += `&status=${status}`;
  }
  if (role !== undefined) {
    url += `&role=${role}`;
  }
  return http.get(url);
};
export const disableAccount = (email) => {
  return http.post(`/Admin/User/DisableAccount`, email);
};

export const getPartner = (search, idSpecialty, TypePartner, page = 1) => {
  let url = `/Admin/Partner/GetPartner?page=${page}`;
  if (search !== undefined) {
    url += `&search=${search}`;
  }
  if (idSpecialty !== undefined) {
    url += `&idSpecialty=${idSpecialty}`;
  }
  if (TypePartner !== undefined) {
    url += `&TypePartner=${TypePartner}`;
  }
  return http.get(url);
};

export const getPartnerDetail = (id) => {
  return http.get(`/Admin/Partner/GetPartnerDetail/${id}`);
};

export const verifyProfile = (data) => {
  return http.post("/Admin/Partner/VerifyInfoPartner", data);
};

export const verifyCertificate = (data) => {
  return http.post("/Admin/Partner/VerifyCertificate", data);
};
export const verifyExperience = (data) => {
  return http.post("/Admin/Partner/VerifyWorkingProcess", data);
};
export const verifyEducation = (data) => {
  return http.post("/Admin/Partner/VerifyTrainingProcess", data);
};
