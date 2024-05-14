import http from "../helpers/http";

export const searchDoctor = (
  keyword,
  exp,
  minPrice,
  maxPrice,
  sortBy,
  IdSpecialty,
  filterAvailable
) => {
  let url = `User/Doctor/GetDoctor?`;
  if (keyword) {
    url += `&search=${keyword}`;
  }
  if (exp) {
    url += `&exp=${exp}`;
  }
  if (minPrice) {
    url += `&from=${minPrice}`;
  }
  if (maxPrice) {
    url += `&to=${maxPrice}`;
  }
  if (sortBy) {
    url += `&sortBy=${sortBy}`;
  }
  if (IdSpecialty) {
    url += `&id_specialty=${IdSpecialty}`;
  }
  if (filterAvailable) {
    url += `&filterAvailable=${filterAvailable}`;
  }
  return http.get(url);
};
export const getAllSpecialty = () => {
  return http.get("/MedicalSpecialty/GetAllMedicalSpecialty");
};
export const getDoctorById = (id) => {
  return http.get(`User/Doctor/GetDoctorDetail/${id}`);
};

export const getAppointment = (search, status, page = 1, filterAvailable) => {
  return http.get(`/Doctor/Appointment/ViewAppointment?page=${page}`);
};

export const getDetailAppointment = (id) => {
  return http.get(`/Doctor/Appointment/ViewAppointment/${id}`);
};

export const setSchedule = (data) => {
  return http.post(`/Doctor/Appointment/SetupSchedule`, data);
};

export const cancelAppointment = (data) => {
  return http.post("/Doctor/Appointment/CancelAppointment", data);
};

export const getProfile = () => {
  return http.get(`/Doctor/Profile/GetPersonalInfo`);
};
