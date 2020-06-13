import React from "react"
import { Segment, Image, Popup, Button, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";

import "./HomeCitoyen.css"
import { useEffect, useState } from "react";
import axios from "axios";
import Status from "../CitoyenDeclarationInfo/StatusLabel.jsx";

const HomeCitoyen = (props) => {
  const {
    filter,
  } = props;



  const [Data, setData] = useState([]);
  const [types, setTypes] = useState([]);
  const [Filter, setFilter] = useState(null);

  useEffect(() => {
    axios
      .get(
        "http://157.230.19.233/api/declarations/",
        {
          headers: {
            "content-type": "application/json",
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    getTypes();
    setFilter(filter);
  }, []);

  const getTypes = () => {
    axios
      .get("http://157.230.19.233/api/declarations_types/", {
        headers: {
          "content-type": "application/json",
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setTypes(res.data);
        // console.log(res)
      });
  };


  function getStatus(st) {
    var ret = { status: "", color: "" };
    switch (st) {
      case "not_validated":
        ret["status"] = "Not Validated";
        ret["color"] = "blue";
        return ret;
      case "lack_of_info":
        ret["status"] = "Lack of infos";
        ret["color"] = "orange";
        return ret;
      case "validated":
        ret["status"] = "Validated";
        ret["color"] = "green";
        return ret;
      case "refused":
        ret["status"] = "Refused";
        ret["color"] = "red";
        return ret;
      case "under_treatment":
        ret["status"] = "In progress";
        ret["color"] = "yellow";
        return ret;
      case "treated":
        ret["status"] = "Treated";
        ret["color"] = "green";
        return ret;
      case "archived":
        ret["status"] = "Archived";
        ret["color"] = "black";
        return ret;
      case "draft":
        ret["status"] = "Draft";
        ret["color"] = "gray";
        return ret;
      default:
        break;
    }
  }

  const editType = (tid) => {
    for (let i = 0; i < types.length; i++) {
      if (tid === types[i].dtid) {
        return types[i].name;
      }
    }
  };

  return (
    <div>
      {Data.results && Data.results.map((element, index) => {
        return (
          <Segment className="d-flex bg-white _container_declaration" key={index}>
              <>
              <div className="_row_mobile">
                <div class="ui small image">
                  {Data.results[index].attachments &&
                    Data.results[index].attachments.map((element, index) => {
                      return (
                        element.filetype === "image" &&
                        <Image
                          onClick={() => {
                            window.open(element.src);
                          }}
                          src={element.src}
                          key={index}
                          rounded
                          className="pointer _pic"
                        />
                      );
                    })}
                </div>
              </div>

            <div className="roww">
              <div class="ui small image">
                {Data.results[index].attachments[0] && (
                  <Image
                    className="pointer"
                    src={Data.results[index].attachments[0].src}
                  />
                )}
              </div>

            </div>
            <div className="_row">
              <div className="_contentt">
                <p className="bold titre">{Data.results[index].title}</p>
                  {Data.results[index].status && (
                    <Status
                      className = "_label_status"
                      content={getStatus(Data.results[index].status).status}
                      color={getStatus(Data.results[index].status).color}
                    />
                  )}
              </div>
                <div className="_contentt">
                <p className="text-gray-light _contentt">
                  - {editType(Data.results[index].dtype)} problem -</p>
                  </div>
              <p className=" _contenttt">
                Date de dépot :{" "}
                {Data.results[index].created_on &&
                  Data.results[index].created_on.slice(0, 10)}
              </p>
              <p className="_contenttt">Adresse : {Data.results[index].address}</p>
              <p className="_contenttt">
                Description :<br /> {Data.results[index].desc}
              </p>
            </div>
            <div className="_roww">
            <Link to={{ pathname: "/InfosScreen", state: { id: Data.results[index].did } }}>
              <Popup
                content="Infos"
                trigger={
                  <Button
                    icon
                    id="infos_btn"
                    className="shadow _hide_on_mobile _infos_btn_desktop"
                  >
                    <Icon name="info" color="black" />
                  </Button>
                }
              />
            </Link>
              </div>
            </>
          </Segment>)}
              
        )
      }
    </div>
  );
}

export default HomeCitoyen;