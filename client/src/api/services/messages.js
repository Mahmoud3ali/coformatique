import http from "./httpService";

async function createMessage({ messageData }) {
  const response = await http.post(`api/messages`, messageData);
  return response;
}

async function createMessageReply({ messageId, replyData }) {
  const response = await http.post(`api/messages/${messageId}/reply`, replyData);
  return response;
}

async function editMessage({ messageId, messageData }) {
  const response = await http.patch(`api/messages/${messageId}`, messageData);
  return response;
}

async function deleteMessage({messageId}) {
  const response = await http.delete(`api/messages/${messageId}`);
  return response;
}

async function listMessages() {
  http.setJwt(localStorage.getItem("jwtToken"));
  const response = await http.get(`api/messages`);
  return response;
}

export default {
  createMessage,
  createMessageReply,
  editMessage,
  deleteMessage,
  listMessages
};
