import http from "../helpers/http";

export const searchDoctor = (
  keyword,
  exp,
  minPrice,
  maxPrice,
  sortBy,
  IdSpecialty,
  filterAvailable,
  rate,
  page = 1
) => {
  let url = `User/Doctor/GetDoctor?page=${page}`;
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
  if (rate) {
    url += `&rate=${rate}`;
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
  return http.post(`/Doctor/Profile/SetupWorkingTime`, data);
};

export const cancelAppointment = (data) => {
  return http.post("/Doctor/Appointment/CancelAppointment", data);
};

export const getProfile = () => {
  return http.get(`/Doctor/Profile/GetPersonalInfo`);
};
export const getCalendar = () => {
  return http.get(`/Doctor/Calendar/GetCalendar`);
};

export const createTimeOff = (data) => {
  return http.post(`/Doctor/Calendar/CreateTimeOff`, data);
};
export const reschedule = (data) => {
  return http.post(`/Doctor/Appointment/RescheduleAppointment`, data);
};
export const updateProfile = (data) => {
  return http.put(`/Doctor/Profile/UpdateProfile`, data);
};
export const editWorkingTime = (data) => {
  return http.put(`/Doctor/Profile/EditWorkingTime`, data);
};
export const editWorkingTimeForConflict = (data) => {
  return http.post(
    `/Doctor/Profile/CancelAppointmentAndUpdateWorkingTime`,
    data
  );
};

export const addCertificate = (data) => {
  return http.post(`/Doctor/Certificate/AddListCertificate`, data);
};
export const addExperience = (data) => {
  return http.post(`/Doctor/WorkingProcess/AddListWorkingProcess`, data);
};
export const addEducation = (data) => {
  return http.post(`/Doctor/TrainingProcess/AddListTrainingProcess`, data);
};

export const getMedical = (search) => {
  let url = `/Doctor/MedicalRecord/GetListExaminationByIdDoctor`;
  if (search) {
    url += `?search=${search}`;
  }
  return http.get(url);
};
export const getUserMedical = (id) => {
  return http.get(`/Doctor/MedicalRecord/GetMedicalHistoryOfUser/${id}`);
};

export const addMedical = (data) => {
  return http.post(`/Doctor/MedicalRecord/CreateMedicalRecord`, data);
};

export const updateEducation = (data) => {
  return http.put(`/Doctor/TrainingProcess/UpdateTrainingProcess`, data);
};
export const updateExprience = (data) => {
  return http.put(`/Doctor/WorkingProcess/UpdateWorkingProcess`, data);
};
export const updateCertificate = (data) => {
  return http.put(`/Doctor/Certificate/UpdateCertificate`, data);
}

export const deleteCertificate = (id) => {
  return http.delete(`/Doctor/Certificate/DeleteCertificate/${id}`);
}
export const deleteEducation = (id) => {
  return http.delete(`/Doctor/TrainingProcess/DeleteTrainingProcess/${id}`);
}
export const deleteExperience = (id) => {
  return http.delete(`/Doctor/WorkingProcess/DeleteWorkingProcess/${id}`);
}