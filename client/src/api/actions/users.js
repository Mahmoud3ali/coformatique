import { UsersServices } from "../services";

const listUsers = async ({ callback }) => {
  try {
    const { data } = await UsersServices.listUsers();
    if (callback) callback(data);
  } catch (error) {
    console.error(error);
  }
};

export default {
  listUsers
};