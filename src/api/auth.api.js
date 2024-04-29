import http from "../helpers/http";

export const logInUser = (userData) => {
  return http.post("/User/SignIn", userData);
};
export const registerUser = (userData) => {
  return http.post("/User/SignUp", userData);
};

export const verifyEmail = (userData) => {
  return http.post("/User/ConfirmEmail", userData);
};

export const resendOTP = (userData) => {
  return http.post("/User/ResendOTP", userData);
};
