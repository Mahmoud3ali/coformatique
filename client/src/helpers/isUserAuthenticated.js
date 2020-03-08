import jwt_decode from "jwt-decode";

export default () => {
  if (!localStorage["jwtToken"]) return false;
  const currentToken = jwt_decode(localStorage.getItem("jwtToken"));
  return Boolean(!(!currentToken || Date.now() >= currentToken.exp * 1000));
};
