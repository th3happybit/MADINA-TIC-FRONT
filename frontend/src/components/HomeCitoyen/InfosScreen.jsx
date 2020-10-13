import React, { useEffect, useState } from "react";
import axios from "axios";
import { Image, Segment } from "semantic-ui-react";
import Status from "../CitoyenDeclarationInfo/StatusLabel.jsx";

import { connect } from "react-redux";
import PropTypes from "prop-types";
import { change_mode } from "../../actions/darkAction";
import {change_language} from "../../actions/languageAction";

const InfoScreen = (props) => {
 const {language} = props;
 const [Data, setData] = useState([]);
 const [Reason, setReason] = useState([]);
 const [Loading, setLoading] = useState(true);
 const [types, setTypes] = useState([]);
 const [id, setId] = useState(null);

 const getData = (did) => {
  if (did)
   axios
    .get("https://madina-tic.ml/api/declarations/" + String(did) + "/", {
     headers: {
      "content-type": "application/json",
      Authorization: `Token ${localStorage.getItem("token")}`,
     },
    })
    .then((res) => {
     setData(res.data);
     setLoading(false);
     if (res.data.status === "lack_of_info")
      axios
       .get(
        `https://madina-tic.ml/api/declarations_complement_demand/`,
        {
         params: {
          declaration: did,
          ordering: "-created_on",
         },
         headers: {
          "content-type": "application/json",
          Authorization: `Token ${localStorage.getItem("token")}`,
         },
        }
       )
       .then((ress) => {
        setReason(ress.data.results[0].reason);
       })
       .catch((errr) => {
       });
    })
    .catch((err) => {
    });
 };

 const getTypes = () => {
  axios
   .get("https://madina-tic.ml/api/declarations_types/", {
    headers: {
     "content-type": "application/json",
     Authorization: `Token ${localStorage.getItem("token")}`,
    },
   })
   .then((res) => {
    setTypes(res.data);
   });
 };

 useEffect(() => {
  if (props.props.location.state) {
   setId(props.props.location.state.id);
   getData(id);
   getTypes();
  } else {
   setLoading(false);
  }
 }, [id]);

 const editType = (tid) => {
  for (let i = 0; i < types.length; i++) {
   if (tid === types[i].dtid) {
    return types[i].name;
   }
  }
 };

//  function getStatus(st) {
//   var ret = { status: "", color: "" };
//   switch (st) {
//    case "validated":
//     ret["status"] = props.language.isFrench ? "Validée" : "تم التحقق منها";
//     ret["color"] = "green";
//     return ret;
//    case "under_treatment":
//     ret["status"] = props.language.isFrench ? "En cours" : "في تقدم";
//     ret["color"] = props.language.isFrench ? "yellow" : "";
//     return ret;
//    case "treated":
//     ret["status"] = props.language.isFrench ? "Traitée" : "معالجة";
//     ret["color"] = "pink";
//     return ret;
//    default:
//     break;
//   }
//  }
  function getStatus(st) {
    var ret = { status: "", color: "" };
    switch (st) {
      case "not_validated":
        ret["status"] = "Non validée";
        ret["color"] = "blue";
        return ret;
      case "lack_of_info":
        ret["status"] = "Manque d'informations";
        ret["color"] = "orange";
        return ret;
      case "validated":
        ret["status"] = "Validée";
        ret["color"] = "green";
        return ret;
      case "refused":
        ret["status"] = "Refusée";
        ret["color"] = "red";
        return ret;
      case "under_treatment":
        ret["status"] = "En cours";
        ret["color"] = "yellow";
        return ret;
      case "treated":
        ret["status"] = "Traitée";
        ret["color"] = "pink";
        return ret;
      case "archived":
        ret["status"] = "Archivée";
        ret["color"] = "black";
        return ret;
      default:
        break;
    }
  }

 return (
  <Segment loading={Loading} 
  className={`bg-white _container_declaration screen ${
    props.isDark ? "dark" : ""
    } ${props.language.isFrench ? "" : "rtl"}`}>
   {id ? (
    <>
     <p className="text-gray-dark _intitulé extra-text">
      {" "}
      {language.isFrench ? "Détails de la déclaration" : "تفاصيل تصريح"}
          </p>
     <div className="d-flex _info_container">
      <div className="_row1">
       <div className="d-flex _content">
        <p className="bold">{Data.title}</p>
        {Data.status && (
         <Status
          content={getStatus(Data.status).status}
          color={getStatus(Data.status).color}
         />
        )}
       </div>
       <p className="text-gray-light _content2">
       {language.isFrench
                  ? `- ${editType(Data.dtype)} problème -`
                  : `- مشكل ${editType(Data.dtype)} -`}
              </p>
       <p className=" _content2">
       {language.isFrench ? "Date de dépot :" : "تاريخ الإضافة :"}{" "}
        &nbsp; {Data.created_on && Data.created_on.slice(0, 10)}
       </p>
       <p className="_content2">Adresse : {Data.address}</p>
       {Data.status &&
        getStatus(Data.status).status === "Lack of infos" && (
         <p className="_content2">
           {language.isFrench ? "Cause du demande :" : "سبب طلب التكملة :"} &nbsp;{Reason}
         </p>
        )}
       <p className="_content3">
       {language.isFrench ? "Description :" : "التفاصيل :"}<br /> {Data.desc}
       </p>
      </div>

      <div className="_row2">
       <div class="ui small image">
        {Data.attachments &&
         Data.attachments.map((element, index) => {
          return (
           element.filetype === "image" &&
           <Image
            onClick={() => {
             window.open(element.src);
            }}
            src={element.src}
            key={index}
            rounded
            className="pointer"
           />
          );
         })}
       </div>
      </div>
     </div>
    </>
   ) : (
     <p className="text-gray-dark _intitulé extra-text">
      {language.isFrench? "Un erreur s'est produit ..." : "حدث خطأ ما"}
     </p>
    )}
  </Segment>
 );
};
InfoScreen.propTypes = {
  isDark: PropTypes.bool.isRequired,
  change_mode: PropTypes.func.isRequired,
  language: PropTypes.object.isRequired,
  change_language: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isDark: state.mode.isDark,
  language: state.language,
});

export default connect(mapStateToProps, { change_mode, change_language })(
  InfoScreen
);
