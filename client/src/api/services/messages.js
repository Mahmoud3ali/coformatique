import http from "./httpService";

async function createMessage({ messageData }) {
  const response = await http.post(`api/messages`, messageData);
  return response;
}

export default {
  createMessage
};
