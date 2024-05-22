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
    url += `&idSpecialty=${IdSpecialty}`;
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
  let url = `Doctor/Appointment/ViewAppointment?page=${page}`;
  if (search !== undefined) {
    url += `&search=${search}`;
  }
  if (status !== undefined) {
    url += `&status=${status}`;
  }
  if (filterAvailable !== undefined) {
    url += `&filterAvailable=${filterAvailable}`;
  }
  return http.get(url);
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
export const getCalendar = () => {
  return http.get(`/Doctor/Calendar/GetCalendar`);
}

export const createTimeOff = (data) => {
  return http.post(`/Doctor/Calendar/CreateTimeOff`, data);
}