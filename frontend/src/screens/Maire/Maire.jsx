import React, { useEffect, useState } from "react";
import axios from "axios";
import { Message } from "semantic-ui-react";
import { UserProvider } from "./MaireContext.jsx";

import MaireSideBar from "../../components/MaireSideBar/MaireSideBar.jsx";
import Backdrop from "../../components/Backdrop/Backdrop.jsx";
import HeaderMaire from "../../components/MaireHeader/MaireHeader.jsx";
import MaireHeaderSideBar from "../../components/MaireHeaderSideBar/MaireHeaderSideBar.jsx";

const Maire = (props) => {

    const [isLogin, setIsLogin] = useState(false);
    const [verified, setVerified] = useState(false);
    const [maire, setMaire] = useState(null)

    useEffect(() => {
        if (localStorage.getItem("maire_token"))
        axios
            .create({
                headers: {
                    get: {
                        "Content-Type": "application/json",
                        Authorization: `Token ${localStorage.getItem("maire_token")}`,
                    },
                },
            })
            .request({
                url: "http://157.230.19.233/api/user/",
                method: "get",
            })
            .then((res) => {
                if (res.data.role === "Maire"){
                    setIsLogin(true);
                    setMaire(res.data.uid)
                }
                else {
                    setIsLogin(false)
                }
                setVerified(true);
            })
            .catch((err) => {});
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
                <MaireSideBar active={active} />
                <HeaderMaire active={active} show={handleHide} />
                <MaireHeaderSideBar visible={visible} active={active} click={handleHide} />
                <>{<props.childComponent maire={maire}/>}</>
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
                    Go to login page?<a href="/maire/login">click here</a>
                </p>
            </Message>
        </div>)
        }</>
    );
}

export default Maire;