import React from "react";
import {Image} from "semantic-ui-react";
import Logo from "../../assets/Header/logo.svg";

// Import css
import "./Header.css";


const Header = () => {
    return(
        <div>
            <Image src={Logo}/>
        </div>
    );
};

export default Header;