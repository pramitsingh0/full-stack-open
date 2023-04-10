import axios from "axios";

const getAllPersons = () => {
  return axios.get('http://localhost:3001/api/persons').then(response => response.data)
};
const createNewPerson = (newPerson) => {
  return axios.post('http://localhost:3001/api/persons', newPerson).then(response => response.data)
}

export default { getAllPersons, createNewPerson };
