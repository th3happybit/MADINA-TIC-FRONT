import React, { useEffect, useState } from "react";
import { Table, Icon } from "semantic-ui-react";
import axios from "axios";
import MaireRow from "./MaireRow";
const MaireDeclarationTable = (props) => {
  const { data, isRegroup } = props;
  const [services, setServices] = useState([]);

  useEffect(() => {
    axios
      .get("https://madina-tic.ml/api/users/?role=Service", {
        headers: {
          "content-type": "application/json",
          Authorization: `Token ${localStorage.getItem("maire_token")}`,
        },
      })
      .then((res) => {
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
        return "Janvier";
      case "02":
        return "Février";
      case "03":
        return "Mars";
      case "04":
        return "Avril";
      case "05":
        return "Mai";
      case "06":
        return "Juin";
      case "07":
        return "Juillet";
      case "08":
        return "Août";
      case "09":
        return "Septembre";
      case "10":
        return "Octobre";
      case "11":
        return "Novembre";
      case "12":
        return "Decembre";
      default:
        break;
    }
  }
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
        ret["color"] = "green";
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
    <Table striped className="_maire_table">
      <Table.Header>
        {isRegroup && <Table.HeaderCell width={1} />}
        <Table.HeaderCell content="Nom citoyen" width={2} />
        <Table.HeaderCell width={2} content="Titre"></Table.HeaderCell>
        <Table.HeaderCell content="Adresse" width={3} className="_hide" />
        <Table.HeaderCell width={2}>
          <p onClick={props.handlesortDate} className="sort_field pointer">
            Ajoutée le
            {props.sortdate ? (
              <Icon name={props.sortdate === "asc" ? "sort up" : "sort down"} />
            ) : (
              <Icon name="sort" />
            )}
          </p>
        </Table.HeaderCell>
        <Table.HeaderCell content="Gérer" width={1} textAlign="center" />
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
                validateDeclaration={props.validateDeclaration}
                rejectDeclaration={props.rejectDeclaration}
                demandComplement={props.demandComplement}
                archiveDeclaration={props.archiveDeclaration}
                maire={props.maire}
              />
            );
          })}
        </Table.Body>
      )}
    </Table>
  );
};
export default MaireDeclarationTable;
