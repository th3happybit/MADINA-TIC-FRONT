import React from 'react';
import { Button, Message } from "semantic-ui-react";
import { ReactComponent as Image } from "../../assets/images/zane-lee-BWDX6jXTHME-unsplash@2x.png";

import CitoyenHeader from "../CitoyenHeader/CitoyenHeader.jsx"
import "./CitoyenDeclarationInfo.css";

const CitoyenDeclarationInfo = () => {
 return (
  <div className="bg-white _container_declaration_info">
   <p className="text-gray-dark _intitulé"> Declaration details</p>
   <div className="d-flex _content">
    <p className="bold">Coupure de courant</p>
   </div>

    <div className="d-flex _info_container">

     <div className="_row1">
    <p className="text-gray-light _content2">- Electricity problem -</p>
    <p className=" _content2">Date de dépot : 14 juillet 2020</p>
    <p className="_content2">adresse : sidi bel abbes, el wiam</p>
    <p className="_content3">description :<br/> Depuis un jour notre quartier est plongé dans un noir 
    total et nous arrivons plus à résister sans électricité sa commence a devenir insupportable.</p>
    <div className="_button1">
     <Button
     className="_noir"
     type="submit"
     >
      Modify 
     </Button>
      <Button
       className="_rouge"
       type="submit"
      >
       Deleate 
     </Button>
    </div>
    </div>

    <div className="_row1">
     <div class="ui small image">
      <img src="../../assets/images/zane-lee-BWDX6jXTHME-unsplash.png" />
     </div>
    </div>


    </div>
   </div>
 );
};

export default CitoyenDeclarationInfo;