import http from "../helpers/http";

export const getProfile = () => {
  return http.get(`User/Profile/GetPersonalInfo`);
};
export const updateProfile = (data) => {
  return http.put(`User/Profile/UpdateProfile`, data);
};
export const changePassword = (data) => {
  return http.post(`User/Profile/ChangePassword`, data);
};
export const getAppointment = (type) => {
  return http.get(`/User/Appointment/ViewAppointment?Status=${type}`);
};
export const booking = (data) => {
  return http.post(`/User/Appointment/BookAppointment`, data);
};

export const disableAccount = (data) => {
  return http.post("User/Profile/LockAccount", data);
};

export const cancelAppointment = (data) => {
  return http.post("/User/Appointment/CancelAppointment", data);
};
export const registerDoctor = (data) => {
  return http.post("/User/Partner/StartDoctoring", data);
};
