import http from "./httpService";

async function createMessage({ messageData }) {
  const response = await http.post(`api/messages`, messageData);
  return response;
}

async function editMessage({ messageId, messageData }) {
  const response = await http.patch(`api/messages/${messageId}`, messageData);
  return response;
}

async function listMessages() {
  http.setJwt(localStorage.getItem("jwtToken"));
  const response = await http.get(`api/messages`);
  return response;
}

export default {
  createMessage,
  editMessage,
  listMessages
};
