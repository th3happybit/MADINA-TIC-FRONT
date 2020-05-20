import React from "react";
import { Container } from "semantic-ui-react";

//? import component
import MainForm from "../../components/ServiceLogin/MainForm.jsx";

const ServiceLogin = () => {
  return (
    <div className="_admin_login">
      <Container>
        <div
          className="_admin_card"
          style={{
            minHeight: "490px",
            display: "flex",
          }}
        >
          <div className="row">
            <MainForm />
          </div>
        </div>
      </Container>
    </div>
  );
};
export default ServiceLogin;
