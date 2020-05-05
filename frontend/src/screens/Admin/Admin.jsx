import React, { useState, useEffect } from "react";
import { Message } from "semantic-ui-react";
import { UserProvider } from "./AdminContext.jsx";
//? import components
import Backdrop from "../../components/Backdrop/Backdrop.jsx";
import HeaderAdmin from "../../components/HeaderAdmin/HeaderAdmin.jsx";
import SidebarHeader from "../../components/SidebarHeader/SidebarHeader.jsx";
import SidebarAdmin from "../../components/SidebarAdmin/SidebarAdmin.jsx";

const Admin = (props) => {
  const [isLogin, setIsLogin] = useState("null");
  useEffect(() => {
    if (localStorage.getItem("admin_token")) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, []);
  const { active } = props;
  const [visible, setVisible] = useState(false);

  //? data of context
  const dataContext = { isUploaded: false };

  const handleHide = () => {
    setVisible((prevState) => !prevState);
  };
  return (
    <>
      {isLogin ? (
        <UserProvider value={dataContext}>
          {visible && <Backdrop click={handleHide} />}
          <HeaderAdmin active={active} show={handleHide} />
          <SidebarHeader visible={visible} active={active} click={handleHide} />
          <SidebarAdmin active={active} />
          <main className="_admin_main">{props.childComponent}</main>
        </UserProvider>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100vw",
            height: "100vh",
          }}
        >
          {" "}
          <Message negative>
            <Message.Header>
              We're sorry you can't access this route
            </Message.Header>
            <p
              className="text-default title _margin_vertical_sm pointer "
              style={{
                ccolor: "#912d2b",
              }}
            >
              Go to login page?<a href="/admin/login">click here</a>
            </p>
          </Message>
        </div>
      )}
    </>
  );
};
export default Admin;
