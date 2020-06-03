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
    var ret = { status: "" };
    switch (st) {
      case "validated":
        ret["status"] = "Validated";
        return ret;
      case "under_treatment":
        ret["status"] = "In progress";
        return ret;
      case "treated":
        ret["status"] = "Treated";
        return ret;
      case "archived":
        ret["status"] = "Archived";
        return ret;
      default:
        break;
    }
  }

  function getPriority(p) {
    switch (p) {
      case 1:
        return {
          priority: "Critical",
          color: "red",
        };
      case 4:
        return {
          priority: "Low",
          color: "blue",
        };
      case 3:
        return {
          priority: "Normal",
          color: "green",
        };
      case 2:
        return {
          priority: "Important",
          color: "yellow",
        };
      default:
        break;
    }
  }

  return (
    <Table striped className="_service_table">
      <Table.Header>
        <Table.HeaderCell content="Title" width={3} />
        <Table.HeaderCell content="Address" width={5} className="_hide" />
        <Table.HeaderCell width={2} content="Validated at" />
        <Table.HeaderCell width={1} content="Priority" />
        <Table.HeaderCell content="Manage" width={1} textAlign="center" />
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
