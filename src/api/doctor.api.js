import http from "../helpers/http";

export const searchDoctor = (keyword, exp, minPrice, maxPrice, sortBy, IdSpecialty) => {

    return http.get(`/Doctor/GetDoctor`);
};
export const getAllSpecialty = () => {
    return http.get("/MedicalSpecialty/GetAllMedicalSpecialty");
};
export const getDoctorById = (id) => {
    return http.get(`/Doctor/GetDoctorById/${id}`);
}

