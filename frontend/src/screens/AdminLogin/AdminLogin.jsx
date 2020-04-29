import React from "react";
import { Container } from "semantic-ui-react";
import "./AdminLogin.css";

//? import component
import MainForm from "../../components/FormLogin/MainForm.jsx";

const AdminLogin = () => {
  return (
    <div className="_admin_login">
      <Container>
        <div className="_admin_card">
          <div className="row">
            <MainForm />
          </div>
        </div>
      </Container>
    </div>
  );
};
export default AdminLogin;