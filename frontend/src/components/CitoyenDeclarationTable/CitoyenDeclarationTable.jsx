/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import ModalDelete from "./ConfirmDeleteModal.jsx";
import { Table, Button, Icon, Popup } from "semantic-ui-react";
import { Link } from "react-router-dom";

import "./CitoyenDeclarationsTable.css";

const CitoyenDeclarationTable = (props) => {
  const {
    data,
    filter,
    handlesortDate,
    handlesortType,
    sortdate,
    sorttype,
    handledelete,
    types,
    isDark
  } = props;

  const [Data, setData] = useState(data);
  const [Filter, setFilter] = useState(null);
  const [sortDate, setsortDate] = useState(null);
  const [sortType, setsortType] = useState(null);

  const handlesorttype = () => {
    handlesortType();
    props.refresh();
  };

  const handlesortdate = () => {
    handlesortDate();
    props.refresh();
  };

  useEffect(() => {
    setFilter(filter);
    setsortDate(sortdate);
    setsortType(sorttype);
    setData(data);
  });
  const editType = (type) => {
    for (let j = 0; j < types.length; j++) {
      if (type === types[j].dtid) return types[j].name;
    }
  };
  function getMonth(month) {
    switch (month) {
      case "01":
        return props.language.isFrench ? "January" : "جوان";
      case "02":
        return props.language.isFrench ? "February" : "فيفري";
      case "03":
        return props.language.isFrench ? "March" : "مارس";
      case "04":
        return props.language.isFrench ? "April" : "أفريل";
      case "05":
        return props.language.isFrench ? "May" : "ماي";
      case "06":
        return props.language.isFrench ? "June" : "جوان";
      case "07":
        return props.language.isFrench ? "July" : "جويلية";
      case "08":
        return props.language.isFrench ? "August" : "أوت";
      case "09":
        return props.language.isFrench ? "September" : "سبتمبر";
      case "10":
        return props.language.isFrench ? "October" : "أكتوبر";
      case "11":
        return props.language.isFrench ? "November" : "نوفمبر";
      case "12":
        return props.language.isFrench ? "December" : "ديسمبر";
      default:
        break;
    }
  }

  return (
    <Table striped className={`${props.language.isFrench ? "" : "rtl"} ${isDark ? "dark" : ""}`}>
      <Table.Header className="table_header">
        <Table.Row>
          <Table.HeaderCell width={2}>
            {props.language.isFrench ? "Title" : "العنوان"}
          </Table.HeaderCell>
          <Table.HeaderCell width={2} onClick={handlesorttype}>
            <p className="sort_field pointer">
              {props.language.isFrench ? "Type" : "النوع"}
              {sortType ? <Icon name="sort down" /> : <Icon name="sort" />}
            </p>
          </Table.HeaderCell>
          <Table.HeaderCell width={3} id="address_h">
            {props.language.isFrench ? "Address" : "العنوان"}
          </Table.HeaderCell>
          <Table.HeaderCell width={3} id="geo_loc_h">
            {props.language.isFrench ? "Geo-Coordinates" : "الإحداثيات"}
          </Table.HeaderCell>
          <Table.HeaderCell width={2} onClick={handlesortdate}>
            <p className="sort_field pointer">
              {props.language.isFrench ? "Depo. Date" : "تاريخ الإضافة"}
              {sortDate ? (
                <Icon name={sortDate === "desc" ? "sort down" : "sort up"} />
              ) : (
                <Icon name="sort" />
              )}
            </p>
          </Table.HeaderCell>
          <Table.HeaderCell width={2} textAlign={"center"}>
            {props.language.isFrench ? "Manage" : "إدارة"}
          </Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {Data.map((element, index) => {
          const { title, dtype, address, geo_cord, created_on, did } = element;

          return (
            <Table.Row key={index}>
              <Table.Cell>{title}</Table.Cell>
              <Table.Cell>{editType(dtype)}</Table.Cell>
              <Table.Cell id="address">
                {address.length < 28 ? (
                  <p>{address}</p>
                ) : (
                  <>
                    <p>{address.slice(0, 25) + " ..."}</p>
                    <span className="full_text">{address}</span>
                  </>
                )}
              </Table.Cell>
              <Table.Cell id="geo_loc">
                {geo_cord.length < 25 ? (
                  geo_cord
                ) : (
                  <>
                    {geo_cord.slice(0, 21) + " ..."}
                    <span className="full_text">{geo_cord}</span>
                  </>
                )}
              </Table.Cell>
              <Table.Cell>
                {created_on.slice(8, 10) +
                  " - " +
                  getMonth(created_on.slice(5, 7)) +
                  " - " +
                  created_on.slice(0, 4)}
              </Table.Cell>
              <Table.Cell id="manage_cell">
                <Button.Group className="manage_button">
                  <Link to={{ pathname: "/infos", state: { id: did } }}>
                    <Popup
                      content={
                        props.language.isFrench ? "Infos" : "معلومات إضافية"
                      }
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
                  <Link to={{ pathname: "/infos", state: { id: did } }}>
                    <Button
                      className="shadow btn_account_detail pointer primary _show_on_mobile"
                      content={
                        props.language.isFrench ? "Details" : "معلومات إضافية"
                      }
                    />
                  </Link>
                </Button.Group>
                {(Filter === "Nouvelles déclarations" ||
                  Filter === "تصريحات جديدة") && (
                  <Link
                    to={{
                      pathname: "/update/declaration/",
                      state: { data: element },
                    }}
                  >
                    <Button.Group className="manage_button">
                      <Popup
                        content={props.language.isFrench ? "Modifier" : "تعديل"}
                        trigger={
                          <Button
                            icon
                            color={"black"}
                            className="shadow _hide_on_mobile"
                          >
                            <Icon name="pencil alternate" color="white" />
                          </Button>
                        }
                      />
                      <Button
                        color={"black"}
                        className="shadow btn_account_detail pointer _show_on_mobile"
                        content={props.language.isFrench ? "Modifier" : "تعديل"}
                      />
                    </Button.Group>
                  </Link>
                )}
                {(Filter === "Manque d'informations" ||
                  Filter === "معلومات غير كافية") && (
                  <Link
                    to={{
                      pathname: "/complement/declaration",
                      state: { data: element },
                    }}
                  >
                    <Button.Group className="manage_button">
                      <Popup
                        content={
                          props.language.isFrench ? "Ajouter Infos" : "تكملة"
                        }
                        trigger={
                          <Button
                            icon
                            color={"green"}
                            className="shadow _hide_on_mobile"
                          >
                            <Icon name="plus" color="white" />
                          </Button>
                        }
                      />
                      <Button
                        color={"green"}
                        className="shadow btn_account_detail pointer _show_on_mobile"
                        content={
                          props.language.isFrench ? "Ajouter infos" : "تكملة"
                        }
                      />
                    </Button.Group>
                  </Link>
                )}
                {(Filter === "Nouvelles déclarations" ||
                  Filter === "Refusées" ||
                  Filter === "Manque d'informations" ||
                  Filter === "تصريحات جديدة" ||
                  Filter === "مرفوضة" ||
                  Filter === "معلزمات غير كافية") && (
                  <ModalDelete
                    onConfirm={handledelete}
                    did={did}
                    isArabe={props.language.isFrench ? false : true}
                  />
                )}
              </Table.Cell>
            </Table.Row>
          );
        })}
      </Table.Body>
    </Table>
  );
};

export default CitoyenDeclarationTable;
