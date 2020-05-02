import React from "react";

//? import logo
import { ReactComponent as Logo } from "../../assets/images/madinatic_logo.svg";

//? import component
import MainForm from "./MainForm.jsx";

import "./FormLogin.css";

const FormLogin = () => {
  localStorage.clear();
  return (
    <div className="_form_login">
      <div className="_login_admin_section">
        <div className="d-flex">
          <MainForm />
          <p className="text-gray-dark semi-bold small">
            having a trouble?{" "}
            <spaan className="underline pointer">Click here</spaan>
          </p>
        </div>
      </div>
    </div>
  );
};
export default FormLogin;
