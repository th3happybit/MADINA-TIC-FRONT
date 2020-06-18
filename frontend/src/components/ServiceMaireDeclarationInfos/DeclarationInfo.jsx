import React, { useEffect, useState } from "react";
import axios from "axios";
import { Image, Segment } from "semantic-ui-react";
import Status from "../CitoyenDeclarationInfo/StatusLabel.jsx";

const InfoScreen = (props) => {
  const [Data, setData] = useState([]);
  const [Reason, setReason] = useState([]);
  const [Loading, setLoading] = useState(true);
  const [types, setTypes] = useState([]);
  const [id, setId] = useState(null);
  const [token, setToken] = useState("");

  const getData = (did) => {
    if (did)
      axios
        .get(
          "https://www.madina-tic.ml/api/declarations/" + String(did) + "/",
          {
            headers: {
              "content-type": "application/json",
              Authorization: `Token ${localStorage.getItem(token)}`,
            },
          }
        )
        .then((res) => {
          setData(res.data);
          setLoading(false);
          if (res.data.status === "lack_of_info")
            axios
              .get(
                `https://www.madina-tic.ml/api/declarations_complement_demand/`,
                {
                  params: {
                    declaration: did,
                    ordering: "-created_on",
                  },
                  headers: {
                    "content-type": "application/json",
                    Authorization: `Token ${localStorage.getItem(token)}`,
                  },
                }
              )
              .then((ress) => {
                setReason(ress.data.results[0].reason);
              })
              .catch((errr) => {});
        })
        .catch((err) => {});
  };

  const getTypes = () => {
    axios
      .get("https://www.madina-tic.ml/api/declarations_types/", {
        headers: {
          "content-type": "application/json",
          Authorization: `Token ${localStorage.getItem(token)}`,
        },
      })
      .then((res) => {
        setTypes(res.data);
      });
  };

  useEffect(() => {
    if (props.dec_data.props.location.state) {
      setToken(props.dec_data.props.location.state.token);
      setId(props.dec_data.props.location.state.id);
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
    <Segment
      loading={Loading}
      className={`bg-white _container_declaration screen admin`}
    >
      {id ? (
        <>
          <p className="text-gray-dark _intitulé extra-text">
            {" "}
            Détails de la déclaration
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
                {`- ${editType(Data.dtype)} problème -`}
              </p>
              <p className=" _content2">
                Date de dépot : &nbsp;{" "}
                {Data.created_on && Data.created_on.slice(0, 10)}
              </p>
              <p className="_content2">Adresse : {Data.address}</p>
              {Data.status &&
                getStatus(Data.status).status === "Lack of infos" && (
                  <p className="_content2">Cause du demande : &nbsp;{Reason}</p>
                )}
              <p className="_content3">
                Déscription :
                <br /> {Data.desc}
              </p>
            </div>

            <div className="_row2">
              <div class="ui small image">
                {Data.attachments &&
                  Data.attachments.map((element, index) => {
                    return (
                      element.filetype === "image" && (
                        <Image
                          onClick={() => {
                            window.open(element.src);
                          }}
                          src={element.src}
                          key={index}
                          rounded
                          className="pointer"
                        />
                      )
                    );
                  })}
              </div>
            </div>
          </div>
        </>
      ) : (
        <p className="text-gray-dark _intitulé extra-text">
          Un erreur s'est produit ...
        </p>
      )}
    </Segment>
  );
};

export default InfoScreen;
