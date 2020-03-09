import { MessagesServices } from "../services";

const createMessage = async ({ messageData, callback }) => {
  try {
    await MessagesServices.createMessage({ messageData });
    if (callback) callback();
  } catch (error) {
    console.error(error);
  }
};

const listMessages = async ({ callback }) => {
  try {
    const { data } = await MessagesServices.listMessages();
    if (callback) callback(data);
  } catch (error) {
    console.error(error);
  }
};

export default {
  createMessage,
  listMessages
};
