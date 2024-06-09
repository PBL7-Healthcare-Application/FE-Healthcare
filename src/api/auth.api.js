import http from "../helpers/http";

export const logInUser = (userData) => {
  return http.post("/Auth/SignIn", userData);
};
export const registerUser = (userData) => {
  return http.post("/Auth/SignUp", userData);
};

export const verifyEmail = (userData) => {
  return http.post("/Auth/ConfirmEmail", userData);
};

export const resendOTP = (userData) => {
  return http.post("/Auth/ResendOTP", userData);
};

export const resetPassword = (userData) => {
  return http.post("/Auth/ResetPassword", userData);
};
