import { AuthServices } from "../services";

const loginUser = async ({ userData, callback }) => {
  try {
    const { data } = await AuthServices.loginUser({ userData });
    localStorage.setItem("jwtToken", data.token);
    if (callback) callback();
  } catch (error) {
    console.error(error);
  }
};

export default {
  loginUser
};