import http from "../helpers/http";

export const getProfile = () => {
  return http.get(`/Profile/GetPersonalInfo`);
};
export const booking = (data) => {
  return http.post(`/Appointment/BookAppointment`, data);
};
