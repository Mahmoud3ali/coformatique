import http from "./httpService";

async function createMessage({ messageData }) {
  const response = await http.post(`api/messages`, messageData);
  return response;
}

async function listMessages() {
  const response = await http.get(`api/messages`);
  return response;
}

export default {
  createMessage,
  listMessages
};
