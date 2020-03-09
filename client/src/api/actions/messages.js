import { MessagesServices } from "../services";

const createMessage = async ({ messageData, callback }) => {
  try {
    await MessagesServices.createMessage({ messageData });
    if (callback) callback();
  } catch (error) {
    console.error(error);
  }
};

const createMessageReply = async ({ replyData, messageId, callback }) => {
  try {
    await MessagesServices.createMessageReply({ replyData, messageId });
    if (callback) callback();
  } catch (error) {
    console.error(error);
  }
};

const editMessage = async ({ messageId, messageData, callback }) => {
  try {
    await MessagesServices.editMessage({ messageId, messageData });
    if (callback) callback();
  } catch (error) {
    console.error(error);
  }
};

const deleteMessage = async ({ messageId, callback }) => {
  try {
    await MessagesServices.deleteMessage({ messageId });
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
  createMessageReply,
  editMessage,
  deleteMessage,
  listMessages
};
