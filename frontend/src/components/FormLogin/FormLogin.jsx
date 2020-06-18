import React from "react";

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
        </div>
      </div>
    </div>
  );
};
export default FormLogin;
