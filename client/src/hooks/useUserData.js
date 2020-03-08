import { useState, useEffect } from "react";
import jwtDecode from "jwt-decode";

import { isUserAuthenticated } from "../helpers";

export default ({ cannotAuthenticateUser }) => {
  const [userData, setUserData] = useState();

  useEffect(() => {
    if (isUserAuthenticated()) {
      const token = localStorage.getItem("jwtToken");
      setUserData(jwtDecode(token).user);
    } else {
      cannotAuthenticateUser();
    }
  }, []);

  return [userData];
};
