import axios from "axios";

const jsonUrl = "http://localhost:4000/employeeData";

export const getEmployee = () => {
  return axios.get(jsonUrl);
};

export const postEmployee = (payload) => {
  return axios.post(jsonUrl, payload);
};

export const putEmployee = (id, payload) => {
  const url = `${jsonUrl}/${id}`;
  return axios.put(url, payload);
};

export const deleteEmployee = (id) => {
  const url = `${jsonUrl}/${id}`;
  return axios.delete(url);
};