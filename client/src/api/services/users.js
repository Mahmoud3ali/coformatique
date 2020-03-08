import http from "./httpService";

async function listUsers() {
  http.setJwt(localStorage.getItem("jwtToken"));
  const response = await http.get(`api/users`);
  return response;
}

export default {
  listUsers
};
