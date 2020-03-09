import http from "./httpService";

async function listUsers() {
  const response = await http.get(`api/users`);
  return response;
}

async function createUser({ userData }) {
  const response = await http.post(`api/users`, userData);
  return response;
}

export default {
  listUsers,
  createUser
};
