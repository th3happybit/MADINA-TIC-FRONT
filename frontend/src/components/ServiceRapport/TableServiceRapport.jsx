import React, { useState, useEffect } from "react";
import { Table, Icon } from "semantic-ui-react";
import ModalDetail from "./ModalDetail.jsx";

const TableServiceRapport = (props) => {
  const [Data, setData] = useState([]);
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
  useEffect(() => {
    setData(props.data);
    return () => {
      setData([]);
    };
  }, [props.data]);
  return (
    <Table striped className="_service_table">
      <Table.Header>
        <Table.HeaderCell content="Title" width={2} />
        <Table.HeaderCell content="Description" width={3} className="_hide" />
        <Table.HeaderCell width={2}>
          <p onClick={props.handlesortDate} className="sort_field pointer">
            Created on
            {props.sortdate ? (
              <Icon name={props.sortdate === "asc" ? "sort up" : "sort down"} />
            ) : (
              <Icon name="sort" />
            )}
          </p>
        </Table.HeaderCell>
        <Table.HeaderCell content="Manage" width={1} textAlign="center" />
      </Table.Header>
      {Data && (
        <Table.Body>
          {Data.map((element, index) => {
            const { title, created_on, validated_at, desc, status } = element;

            return (
              <Table.Row>
                <Table.Cell>{title}</Table.Cell>
                <Table.Cell>{desc}</Table.Cell>
                <Table.Cell>
                  {created_on
                    ? created_on.slice(8, 10) +
                      " - " +
                      getMonth(created_on.slice(5, 7)) +
                      " - " +
                      created_on.slice(0, 4)
                    : "/"}
                </Table.Cell>
                <Table.Cell>
                  <ModalDetail data={element} />
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      )}
    </Table>
  );
};

export default TableServiceRapport;
