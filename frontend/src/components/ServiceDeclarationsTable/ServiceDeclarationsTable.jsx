import React from "react";
import { Table, Button, Popup, Label } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import DetailsModal from "./ModalDetails.jsx";
import "./ServiceDeclarationTable.css";

const ServiceDesclarationTable = (props) => {
  const [Data, setData] = useState(null);

  const { data, refresh } = props;

  useEffect(() => {
    setData(data);
  }, [data]);

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
    var ret = { status: "" };
    switch (st) {
      case "validated":
        ret["status"] = "Validée";
        return ret;
      case "under_treatment":
        ret["status"] = "En cours";
        return ret;
      case "treated":
        ret["status"] = "Traitée";
        return ret;
      case "archived":
        ret["status"] = "Archivée";
        return ret;
      default:
        break;
    }
  }

  function getPriority(p) {
    switch (p) {
      case 1:
        return {
          priority: "Critique",
          color: "red",
        };
      case 4:
        return {
          priority: "Faible",
          color: "blue",
        };
      case 3:
        return {
          priority: "Normal",
          color: "green",
        };
      case 2:
        return {
          priority: "Importante",
          color: "yellow",
        };
      default:
        break;
    }
  }

  return (
    <Table striped className="_service_table">
      <Table.Header>
        <Table.HeaderCell content="Titre" width={3} />
        <Table.HeaderCell content="Adresse" width={5} className="_hide" />
        <Table.HeaderCell width={2} content="Validé à" />
        <Table.HeaderCell width={1} content="Priorité" />
        <Table.HeaderCell content="Gérer" width={1} textAlign="center" />
      </Table.Header>
      {Data && (
        <Table.Body>
          {Data.map((element, index) => {
            const {
              did,
              title,
              created_on,
              validated_at,
              address,
              attachments,
              dtype,
              desc,
              status,
              priority,
            } = element;

            return (
              <Table.Row>
                <Table.Cell>{title}</Table.Cell>
                <Table.Cell className="_hide">
                  {address.length < 55 ? (
                    <p>{address}</p>
                  ) : (
                    <>
                      <p>{address.slice(0, 47) + " ..."}</p>
                      <span className="full_text">{address}</span>
                    </>
                  )}
                </Table.Cell>
                <Table.Cell>
                  {validated_at
                    ? validated_at.slice(8, 10) +
                      " - " +
                      getMonth(validated_at.slice(5, 7)) +
                      " - " +
                      validated_at.slice(0, 4)
                    : "/"}
                </Table.Cell>
                <Table.Cell>
                  <Label
                    color={getPriority(priority).color}
                    style={{ width: "80px", "text-align": "center" }}
                  >
                    {getPriority(priority).priority}
                  </Label>
                </Table.Cell>
                <Table.Cell id="_manage_cell" textAlign="center">
                  <DetailsModal
                    did={did}
                    title={title}
                    dtype={dtype}
                    address={address}
                    description={desc}
                    refresh={refresh}
                    attachements={filterAttachments(attachments)}
                    priority={getPriority(priority).priority}
                    created_on={
                      created_on.slice(8, 10) +
                      " - " +
                      getMonth(created_on.slice(5, 7)) +
                      " - " +
                      created_on.slice(0, 4)
                    }
                    validated_at={
                      validated_at
                        ? validated_at.slice(8, 10) +
                          " - " +
                          getMonth(validated_at.slice(5, 7)) +
                          " - " +
                          validated_at.slice(0, 4)
                        : "/"
                    }
                    status={getStatus(status).status}
                    getMonth={getMonth}
                    getStatus={getStatus}
                  />
                  {status === "under_treatment" && (
                    <Link
                      to={{
                        pathname: "/add/rapport",
                        state: { did: did },
                      }}
                    >
                      <Popup
                        content="Attach rapport"
                        trigger={
                          <Button
                            color="green"
                            icon={{ name: "add" }}
                            className="shadow _hide_on_mobile"
                          />
                        }
                      />
                      <Button
                        color="green"
                        className="shadow mobile_button _hide_on_desktop"
                        content="Attach report"
                      />
                    </Link>
                  )}
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      )}
    </Table>
  );
};

export default ServiceDesclarationTable;
