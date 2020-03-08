import http from "./httpService";

async function loginUser({ userData }) {
  const response = await http.post(`api/auth`, userData);
  return response;
}

export default {
  loginUser
};
