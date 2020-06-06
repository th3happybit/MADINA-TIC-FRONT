import React, { useEffect, useState } from "react";
import { Table, Icon, Modal } from "semantic-ui-react";
import ModalDetails from "./ModalDetails.jsx";
import axios from "axios";
import MaireRow from "./MaireRow";
const MaireDeclarationTable = (props) => {
  const { data, isRegroup } = props;
  const [services, setServices] = useState([]);

  useEffect(() => {
    axios
      .get("http://157.230.19.233/api/users/?role=Service", {
        headers: {
          "content-type": "application/json",
          Authorization: `Token ${localStorage.getItem("maire_token")}`,
        },
      })
      .then((res) => {
        // console.log(res)
        setServices(res.data.results);
      });
  }, [props.names, props.data]);
  const editType = (type) => {
    for (let j = 0; j < props.types.length; j++) {
      if (type === props.types[j].dtid) return props.types[j].name;
    }
  };
  function filterAttachments(att) {
    var ret = [];
    for (let i = 0; i < att.length; i++) {
      if (att[i].filetype === "image") ret.push(att[i]);
    }

    return ret;
  }
  function getMonth(month) {
    switch (month) {
      case "01":
        return "January";
      case "02":
        return "February";
      case "03":
        return "March";
      case "04":
        return "April";
      case "05":
        return "May";
      case "06":
        return "June";
      case "07":
        return "July";
      case "08":
        return "August";
      case "09":
        return "September";
      case "10":
        return "October";
      case "11":
        return "November";
      case "12":
        return "December";
      default:
        break;
    }
  }
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
      default:
        break;
    }
  }

  return (
    <Table striped className="_maire_table">
      <Table.Header>
        {isRegroup && <Table.HeaderCell width={1} />}
        <Table.HeaderCell content="Citizen Name" width={2} />
        <Table.HeaderCell width={2} content="Title"></Table.HeaderCell>
        <Table.HeaderCell content="Address" width={3} className="_hide" />
        <Table.HeaderCell content="Submitted On" width={1}>
          <p onClick={props.handlesortDate} className="sort_field pointer">
            Added On
            {props.sortdate ? (
              <Icon name={props.sortdate === "asc" ? "sort up" : "sort down"} />
            ) : (
              <Icon name="sort" />
            )}
          </p>
        </Table.HeaderCell>
        <Table.HeaderCell content="Manage" width={1} textAlign="center" />
      </Table.Header>
      {data && (
        <Table.Body>
          {data.map((element, index) => {
            return (
              <MaireRow
                setRefresh={props.setRefresh}
                getMonth={getMonth}
                editType={editType}
                filterAttachments={filterAttachments}
                getStatus={getStatus}
                services={services}
                element={element}
                index={index}
                isRegroup={isRegroup}
              />
            );
          })}
        </Table.Body>
      )}
    </Table>
  );
};
export default MaireDeclarationTable;
