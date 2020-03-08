import { MessagesServices } from "../services";

const createMessage = async ({ messageData, callback }) => {
  try {
    await MessagesServices.createMessage({ messageData });
    if (callback) callback();
  } catch (error) {
    console.error(error);
  }
};

export default {
  createMessage
};
