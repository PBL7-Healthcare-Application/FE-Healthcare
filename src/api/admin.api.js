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
