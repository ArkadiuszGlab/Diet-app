import axios from 'axios';

const baseUrl = 'http://10.0.2.2:3000/foods/';
// const baseUrl = 'http://localhost:3000/foods/';
// const baseUrl = 'http://127.0.0.1/3000/foods';

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = (newFood) => {
  const request = axios.post(baseUrl, newFood);
  return request.then((response) => response.data);
};

const remove = (id) => {
  const request = axios.delete(`${baseUrl}${id}`);
  return request.then((response) => response.data);
};

const update = (id, newFood) => {
  const request = axios.put(`${baseUrl}${id}`, newFood);
  return request.then((response) => response.data);
};

const foodServices = {
  getAll,
  create,
  remove,
  update
};
export default foodServices;
