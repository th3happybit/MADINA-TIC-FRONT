import React, { useEffect, useState } from "react";
import axios from "axios";
import { Message } from "semantic-ui-react";
import { UserProvider } from "./ServiceContext.jsx";

import ServiceSideBar from "../../components/ServiceSideBar/ServiceSideBar.jsx";
import Backdrop from "../../components/Backdrop/Backdrop.jsx";
import HeaderService from "../../components/ServiceHeader/ServiceHeader.jsx";
import ServiceHeaderSideBar from "../../components/ServiceHeaderSideBar/ServiceHeaderSideBar.jsx";

const Service = (props) => {

    const [isLogin, setIsLogin] = useState(false);
    const [verified, setVerified] = useState(false);
    const [service, setService] = useState(null)

    useEffect(() => {
        if (localStorage.getItem("service_token"))
            axios
                .create({
                    headers: {
                        get: {
                            "Content-Type": "application/json",
                            Authorization: `Token ${localStorage.getItem("service_token")}`,
                        },
                    },
                })
                .request({
                    url: "http://157.230.19.233/api/user/",
                    method: "get",
                })
                .then((res) => {
                    if (res.data.role === "Service") {
                        setIsLogin(true);
                        setService(res.data.uid)
                    }
                    else {
                        setIsLogin(false);
                        setVerified(true);
                    }
                })
                .catch((err) => {console.log(err)});
        else{
            setVerified(true)
        }
    }, []);


    const dataContext = { isUploaded: false };
    const { active } = props;
    const [visible, setVisible] = useState(false);
    const handleHide = () => {
        setVisible((prevState) => !prevState);
    };
    return (
        <>{isLogin ? (
            <UserProvider value={dataContext}>
                {visible && <Backdrop click={handleHide} />}
                <ServiceSideBar active={active} />
                <HeaderService active={active} show={handleHide} />
                <ServiceHeaderSideBar visible={visible} active={active} click={handleHide} />
                <main> {<props.childComponent />} </main>
            </UserProvider>
        ) : (verified && <div
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
                    Go to login page?<a href="/service/login">click here</a>
                </p>
            </Message>
        </div>)
        }</>
    );
}

export default Service;