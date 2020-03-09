import http from "./httpService";

async function listUsers() {
  const response = await http.get(`api/users`);
  return response;
}

export default {
  listUsers
};
