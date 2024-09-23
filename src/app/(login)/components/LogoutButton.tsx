"use client";

import { logoutAction } from "../actions/login.action";

const LogoutButton = () => {
  return <button onClick={() => logoutAction()}>LOGOUT</button>;
};

export default LogoutButton;
