/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Table, Icon } from "semantic-ui-react";
import ModalDetails from "./ModalDetails.jsx";
import axios from "axios";

const MaireDeclarationTable = (props) => {
  const { data } = props
    const [names, setNames] = useState([]);
    const [services, setServices] = useState([])
  useEffect(() => {
    setNames(props.names);
    axios
      .get(("http://157.230.19.233/api/users/?role=Service"),{
        headers : {
          "content-type" : "application/json",
          Authorization : `Token ${localStorage.getItem("maire_token")}`
        }
      })
      .then((res)=> {
        // console.log(res)
        setServices(res.data.results)
      })
}, [props.names, props.data])
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

  return (
    <Table striped className="_maire_table">
      <Table.Header>
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
            const {
              did,
              citizen,
              title,
              dtype,
              address,
              created_on,
              status,
              desc,
              validated_at,
              attachments,
              first_name,
              last_name,
            } = element;
            return (
              <Table.Row key={index}>
                <Table.Cell className="_table_title">
                  {names[index]}
                </Table.Cell>
                <Table.Cell>{title}</Table.Cell>
                <Table.Cell className="_hide _hide_td">
                  {address.length < 40 ? (
                    <p>{address}</p>
                  ) : (
                    <>
                      <p>{address.slice(0, 35) + " ..."}</p>
                      <span className="full_text">{address}</span>
                    </>
                  )}
                </Table.Cell>
                <Table.Cell>{created_on.slice(0, 10)}</Table.Cell>
                <Table.Cell textAlign="center" className="_left">
                  <ModalDetails
                    fullname={names[index]}
                    did={did}
                    citizen={citizen}
                    title={title}
                    type={editType(dtype)}
                    dtype={dtype}
                    address={address}
                    description={desc}
                    attachements={filterAttachments(attachments)}
                    created_on={created_on.slice(0, 10)}
                    validated_at={
                      validated_at ? validated_at.slice(0, 10) : "/"
                    }
                    services={services}
                    // rejected_at = {rejected_at ? rejected_at.slice(0,10) : "/"}
                    status={getStatus(status).status}
                    reject={props.rejectDeclaration}
                    archive={props.archiveDeclaration}
                    complement={props.demandComplement}
                    validate={props.validateDeclaration}
                    maire={props.maire}
                  />
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      )}
    </Table>
  );
};

export default MaireDeclarationTable;
