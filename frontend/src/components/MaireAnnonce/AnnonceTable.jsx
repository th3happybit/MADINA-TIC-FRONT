/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Table, Icon } from "semantic-ui-react";
import ModalDetails from "./ModalDetails.jsx";
import axios from "axios";

const MaireAnnonceTable = (props) => {
  const { data } = props;

  function getStatus(st) {
    switch (st) {
      case "not_validated":
        return "Not Validated";
      case "lack_of_info":
        return "Lack of info";
      case "published":
        return "Published";
      case "removed":
        return "Removed";
      case "archived":
        return "Archived";
      case "modified":
        return "Modified";
      default:
        break;
    }
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
  function TimeExtract(date) {
    let ConvertedDate,
      year,
      month,
      day,
      hour,
      minute = "";
    year = date.slice(0, 4);
    month = date.slice(5, 7);
    day = date.slice(8, 10);
    hour = date.slice(11, 13);
    minute = date.slice(14, 16);
    ConvertedDate =
      year +
      " " +
      getMonth(month) +
      " " +
      day +
      " --- " +
      hour +
      ":" +
      minute +
      " +01 GMT";
    return ConvertedDate;
  }

  return (
    <Table striped className="_maire_table">
      <Table.Header>
        <Table.HeaderCell content="Titre" width={2} />
        <Table.HeaderCell content="Service" width={2} />
        <Table.HeaderCell width={3}>
          <p onClick={props.handle_StartAt} className="sort_field pointer">
            Commence à
            {props.sortStartAt ? (
              <Icon
                name={props.sortStartAt === "asc" ? "sort up" : "sort down"}
              />
            ) : (
              <Icon name="sort" />
            )}
          </p>
        </Table.HeaderCell>
        <Table.HeaderCell width={3}>
          <p onClick={props.handle_EndAt} className="sort_field pointer">
            Fin à
            {props.sortEndAt ? (
              <Icon
                name={props.sortEndAt === "asc" ? "sort up" : "sort down"}
              />
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
            const {
              aid,
              title,
              start_at,
              end_at,
              status,
              desc,
              service,
            } = element;
            return (
              <Table.Row key={index}>
                <Table.Cell className="_table_title">{title}</Table.Cell>
                <Table.Cell>
                  {service.first_name + " " + service.last_name}
                </Table.Cell>
                <Table.Cell>{TimeExtract(start_at)}</Table.Cell>
                <Table.Cell>{TimeExtract(end_at)}</Table.Cell>
                <Table.Cell textAlign="center" className="_left">
                  <ModalDetails
                    title="Announcement Details"
                    data={{
                      aid: aid,
                      title: title,
                      description: desc,
                      start_at: start_at,
                      end_at: end_at,
                      service: service,
                      status: status,
                    }}
                    reject={props.rejectAnnonce}
                    complement={props.demandComplement}
                    validate={props.validateAnnonce}
                    TimeExtract={TimeExtract}
                    getStatus={getStatus}
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

export default MaireAnnonceTable;
