import { UsersServices } from "../services";

const listUsers = async ({ callback }) => {
  try {
    const { data } = await UsersServices.listUsers();
    if (callback) callback(data);
  } catch (error) {
    console.error(error);
  }
};

const createUser = async ({ userData, callback }) => {
  try {
    await UsersServices.createUser({ userData });
    if (callback) callback();
  } catch (error) {
    console.error(error);
  }
};

export default {
  listUsers,
  createUser
};