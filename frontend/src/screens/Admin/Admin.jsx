import React, { useState } from "react";

//? import components
import Backdrop from "../../components/Backdrop/Backdrop.jsx";
import HeaderAdmin from "../../components/HeaderAdmin/HeaderAdmin.jsx";
import SidebarHeader from "../../components/SidebarHeader/SidebarHeader.jsx";
import SidebarAdmin from "../../components/SidebarAdmin/SidebarAdmin.jsx";

const Admin = (props) => {
  console.log(props);
  const [visible, setVisible] = useState(false);
  const handleHide = () => {
    setVisible((prevState) => !prevState);
  };
  return (
    <>
      {visible && <Backdrop click={handleHide} />}
      <HeaderAdmin show={handleHide} />
      <SidebarHeader visible={visible} click={handleHide} />
      <SidebarAdmin />
      <main className="_admin_main">{props.childComponent}</main>
    </>
  );
};
export default Admin;
