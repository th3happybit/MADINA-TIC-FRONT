import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Image, Icon, Segment } from "semantic-ui-react";
import Status from "./StatusLabel.jsx";

import "./CitoyenDeclarationInfo.css";
import { Link, useHistory } from "react-router-dom";

const CitoyenDeclarationInfo = (props) => {
  const [Data, setData] = useState([]);
  const [Reason, setReason] = useState([]);
  const [Loading, setLoading] = useState(true);
  const [types, setTypes] = useState([]);
  const [id, setId] = useState(null);
  let history = useHistory();

  const deleteDecla = () => {
    axios
      .delete("http://157.230.19.233/api/declarations/" + id + "/", {
        headers: {
          "content-type": "application/json",
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        history.push("/citoyen/declaration");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getData = (did) => {
    if (did)
      axios
        .get("http://157.230.19.233/api/declarations/" + String(did) + "/", {
          headers: {
            "content-type": "application/json",
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          setData(res.data);
          setLoading(false);
          console.log(res.data);
          if (res.data.status === "lack_of_info")
            axios
              .get(
                `http://157.230.19.233/api/declarations_complement_demand/`,
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
                console.log(errr);
              });
        })
        .catch((err) => {
          console.log(err);
        });
  };

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

  const UpdateState = () => {
    axios
      .create({
        headers: {
          patch: {
            "Content-type": "application/json",
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
        },
      })
      .request("http://157.230.19.233/api/declarations/" + id + "/", {
        method: "patch",
        data: {
          title: Data.title,
          desc: Data.desc,
          citizen: Data.citizen,
          status: "not_validated",
          dtype: Data.dtype,
        },
      })
      .then((res) => {
        history.push("/citoyen/declaration");
        console.log("hello");
      })
      .catch((err) => {
        console.log(err);
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
  useEffect(() => {
    console.log(Data);
  }, []);

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

  return (
    <Segment loading={Loading} className="bg-white _container_declaration_info">
      {id ? (
        <>
          <p className="text-gray-dark _intitulé extra-text">
            {" "}
            Declaration details
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
                - {editType(Data.dtype)} problem -
              </p>
              <p className=" _content2">
                Date de dépot :{" "}
                {Data.created_on && Data.created_on.slice(0, 10)}
              </p>
              <p className="_content2">Adresse : {Data.address}</p>
              {Data.status &&
                getStatus(Data.status).status === "Lack of infos" && (
                  <p className="_content2">
                    Cause of complement demand : {Reason}
                  </p>
                )}
              <p className="_content3">
                Description :<br /> {Data.desc}
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

          <div className="_button1">
            {Data.status &&
              (getStatus(Data.status).status === "Not Validated" ||
                getStatus(Data.status).status === "Draft") && (
                <Link
                  to={{
                    pathname: "/update/declaration",
                    state: { data: Data },
                  }}
                >
                  <Button animated color="black" className="action_button">
                    <Button.Content visible content="Modifiy" />
                    <Button.Content hidden icon>
                      <Icon name="pencil alternate" />
                    </Button.Content>
                  </Button>
                </Link>
              )}
            {Data.status && getStatus(Data.status).status === "Refused" && (
              <Button animated color="yellow" className="action_button">
                <Button.Content visible content="Resend" />
                <Button.Content hidden icon>
                  <Icon name="sync alternate" />
                </Button.Content>
              </Button>
            )}
            {Data.status && getStatus(Data.status).status === "Lack of infos" && (
              <Link
                to={{
                  pathname: "/complement/declaration",
                  state: { data: Data },
                }}
              >
                <Button animated color="green" className="action_button">
                  <Button.Content visible content="Complete" />
                  <Button.Content hidden icon>
                    <Icon name="add" />
                  </Button.Content>
                </Button>
              </Link>
            )}
            {Data.status && getStatus(Data.status).status === "Draft" && (
              <>
                <Button
                  animated
                  color="yellow"
                  className="action_button"
                  onClick={UpdateState}
                >
                  <Button.Content visible content="send" />
                  <Button.Content hidden icon>
                    <Icon name="paper plane alternate" />
                  </Button.Content>
                </Button>
              </>
            )}
            <Button
              animated
              color="red"
              type="submit"
              className="action_button delete_button"
              onClick={deleteDecla}
            >
              <Button.Content visible content="Delete" />
              <Button.Content icon hidden>
                {" "}
                <Icon name="times" />{" "}
              </Button.Content>
            </Button>
          </div>
        </>
      ) : (
        <p className="text-gray-dark _intitulé extra-text">
          Error 404 : Page Not Found
        </p>
      )}
    </Segment>
  );
};

export default CitoyenDeclarationInfo;
