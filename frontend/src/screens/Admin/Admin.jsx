import React, { useState } from "react";
import Backdrop from "../../components/Backdrop/Backdrop.jsx";

//? import components
import HeaderAdmin from "../../components/HeaderAdmin/HeaderAdmin.jsx";
import SidebarHeader from "../../components/SidebarHeader/SidebarHeader.jsx";

const Admin = (props) => {
  const [visible, setVisible] = useState(false);
  const handleHide = () => {
    setVisible((prevState) => !prevState);
  };
  return (
    <>
      {visible && <Backdrop click={handleHide} />}
      <HeaderAdmin show={handleHide} />
      <SidebarHeader visible={visible} click={handleHide} />
      <main className={props.fullscreen ? "_main h-full" : "_main"}>
        {props.childComponent}
      </main>
    </>
  );
};
export default Admin;
