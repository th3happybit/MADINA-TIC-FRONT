import React, { useState, useEffect } from "react";
import { Table, Icon, Button, Popup, Label } from "semantic-ui-react";
import axios from "axios";

import ModalDetailComponent from "./ModalDetailComponent.jsx";
import ConfirmModal from "./ModalConfirmComponent.jsx";
import ConfirmDeleteModal from "../CitoyenDeclarationTable/ConfirmDeleteModal.jsx";
import { Link } from "react-router-dom";

const SortedRow = (props) => {
  const { elm, handleSort, setsortDate } = props;
  const [sorttype, setSortType] = useState(props.sortdate);
  const handleTypeSort = (e) => {
    let type = e.currentTarget.attributes.name.value;

    if (elm.value !== props.orderfield) {
      setSortType("asc");
      setsortDate("asc");
    } else {
      if (sorttype === "asc") {
        setSortType("desc");
        setsortDate("desc");
      } else if (sorttype === "desc") {
        setSortType(null);
        setsortDate(null);
      } else {
        setSortType("asc");
        setsortDate("asc");
      }
    }
    handleSort(type);
  };
  return (
    <p className="sort_field pointer" name={elm.value} onClick={handleTypeSort}>
      {elm.text}
      {elm.value === props.orderfield ? (
        sorttype ? (
          <Icon name={sorttype === "asc" ? "sort up" : "sort down"} />
        ) : (
          <Icon name={"sort"} />
        )
      ) : (
        <Icon name="sort" />
      )}
    </p>
  );
};
const TableTestComponent = (props) => {
  const {
    detail,
    header,
    data,
    setOrderField,
    orderfield,
    setsortDate,
    sortdate,
    isRapport,
    token,
    title,
    url,
    activeFilter,
    refresh,
    role,
    uid,
    getStatus,
    getMonth,
  } = props;
  const [Data, setData] = useState([]);
  useEffect(() => {
    setData(data);
    return () => {
      setData([]);
    };
  }, [data]);
  const handleSort = (type) => {
    setOrderField(type);
  };
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
      year + " " + getMonth(month) + " " + day + " --- " + hour + ":" + minute;
    return ConvertedDate;
  }
  function helper(str) {
    return str < 10 ? "0" + str : str;
  }
  function isActive(end_at) {
    const date = new Date();
    const time = date.toLocaleTimeString();
    if (
      date.getFullYear() +
        "-" +
        helper(date.getMonth() + 1) +
        "-" +
        helper(date.getDate()) +
        "T" +
        time <
      end_at.substr(0, 19)
    )
      return true;
    else return false;
  }
  const DeleteReport = (report) => {
    let rid = report.rid;
    axios
      .delete(`https://madina-tic.ml/api/reports/${rid}/`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${localStorage.getItem(token)}`,
        },
      })
      .then((res) => {
        refresh();
      })
      .catch((err) => {});
  };
  return (
    <Table striped className="_service_table">
      <Table.Header>
        {header.map((elm) => {
          if (elm.value !== "desc" || isRapport)
            return elm.sort ? (
              <Table.HeaderCell width={elm.value === "desc" ? 3 : 2}>
                <SortedRow
                  elm={elm}
                  handleSort={handleSort}
                  setsortDate={setsortDate}
                  sortdate={sortdate}
                  orderfield={orderfield}
                />
              </Table.HeaderCell>
            ) : (
              <Table.HeaderCell
                className={elm.value === "desc" ? "_hide" : null}
                width={elm.value === "desc" ? 3 : 2}
                content={elm.text}
              />
            );
          else return null;
        })}
        {!isRapport && activeFilter === "published" && (
          <Table.HeaderCell content="Status" />
        )}
        <Table.HeaderCell content="Gérer" width={1} textAlign="center" />
      </Table.Header>
      {Data && (
        <Table.Body>
          {Data.map((element, index) => {
            return (
              <Table.Row>
                {header.map(
                  (elm) =>
                    (elm.value !== "desc" || isRapport) && (
                      <Table.Cell
                        className={
                          elm.value === "desc" ? "_hide _hide_td" : null
                        }
                      >
                        {elm.value === "start_at" || elm.value === "end_at" ? (
                          TimeExtract(element[elm.value])
                        ) : elm.value === "created_on" ? (
                          element[elm.value].slice(8, 10) +
                          " - " +
                          getMonth(element[elm.value].slice(5, 7)) +
                          " - " +
                          element[elm.value].slice(0, 4)
                        ) : elm.value === "desc" ? (
                          element[elm.value].length < 40 ? (
                            <p>{element[elm.value]}</p>
                          ) : (
                            <>
                              <p>{element[elm.value].slice(0, 35) + " ..."}</p>
                              <span className="full_text">
                                {element[elm.value]}
                              </span>
                            </>
                          )
                        ) : (
                          element[elm.value]
                        )}
                      </Table.Cell>
                    )
                )}
                {!isRapport && activeFilter === "published" && (
                  <Table.Cell width="1">
                    <Label
                      style={{ width: "70px", textAlign: "center" }}
                      color={isActive(element.end_at) ? "green" : "red"}
                      content={isActive(element.end_at) ? "Active" : "Expired"}
                    />
                  </Table.Cell>
                )}
                <Table.Cell>
                  <div className="btns_actionsx">
                    <ModalDetailComponent
                      archive={
                        !isRapport
                          ? !isActive(element.end_at)
                            ? true
                            : false
                          : true
                      }
                      report={element.rid}
                      data={element}
                      detail={detail}
                      activeFilter={activeFilter}
                      isRapport={isRapport}
                      title={title}
                      uid={uid}
                      role={role}
                      token={token}
                      style={{
                        margin: "0 1rem",
                      }}
                      getMonth={getMonth}
                      TimeExtract={TimeExtract}
                      getStatus={getStatus}
                      ConfirmDeleteModal={ConfirmDeleteModal}
                      refresh={refresh}
                      helper={helper}
                      fromDeclaration={false}
                    />
                    {isRapport &&
                      activeFilter === "not_validated" &&
                      role === "service" && (
                        <Button.Group>
                          <Link
                            to={{
                              pathname: "/update/rapport",
                              state: {
                                rid: element.rid,
                                did: element.declaration,
                              },
                            }}
                          >
                            <Popup
                              content="Edit"
                              trigger={
                                <Button
                                  className="shadow _hide_on_mobile _infos_btn_desktop"
                                  color="black"
                                  icon={{
                                    name: "pencil alternate",
                                    color: "white",
                                    inverted: true,
                                  }}
                                />
                              }
                            />
                            <Button
                              color={"black"}
                              className="shadow _hide_on_desktop"
                              content="Edit"
                            />
                          </Link>
                        </Button.Group>
                      )}
                    {!isRapport &&
                      activeFilter === "not_validated" &&
                      role === "service" && (
                        <Button.Group>
                          <Link
                            to={{
                              pathname: "/update/annonce",
                              state: {
                                aid: element.aid,
                              },
                              query: { aid: element.aid },
                            }}
                          >
                            <Popup
                              content="Edit"
                              trigger={
                                <Button
                                  className="shadow _hide_on_mobile _infos_btn_desktop"
                                  color="black"
                                  icon={{
                                    name: "pencil alternate",
                                    color: "white",
                                    inverted: true,
                                  }}
                                />
                              }
                            />
                            <Button
                              color={"black"}
                              className="shadow btn_account_detail pointer _show_on_mobile"
                              content="Edit"
                            />
                          </Link>
                        </Button.Group>
                      )}
                    {activeFilter === "lack_of_info" && role === "service" && (
                      <Button.Group>
                        <Link
                          to={{
                            pathname: isRapport
                              ? "/complement/rapport"
                              : "/complement/annonce",
                            state: {
                              rid: isRapport ? element.rid : element.aid,
                              did: element.declaration,
                            },
                          }}
                        >
                          <Popup
                            content="Complement"
                            trigger={
                              <Button
                                className="shadow _hide_on_mobile _infos_btn_desktop"
                                color="orange"
                                icon={{
                                  name: "sync alternate",
                                  color: "white",
                                  inverted: true,
                                }}
                              />
                            }
                          />
                          <Button
                            color={"orange"}
                            className="shadow btn_account_detail _show_on_mobile"
                            content="Complement"
                          />
                        </Link>
                      </Button.Group>
                    )}

                    {!isRapport &&
                      activeFilter === "not_validated" &&
                      role === "service" && (
                        <ConfirmDeleteModal
                          onConfirm={() => {
                            let instance = axios.create({
                              baseURL: `${url}`,
                              responseType: "json",
                              headers: {
                                "Content-Type": "application/json",
                                Authorization: `Token ${localStorage.getItem(
                                  "service_token"
                                )}`,
                              },
                            });
                            instance
                              .delete(`${element.aid}/`)
                              .then((res) => {
                                refresh();
                              })
                              .catch((err) => {});
                          }}
                        />
                      )}
                    {isRapport &&
                      (activeFilter === "work_not_finished" ||
                        activeFilter === "not_validated") &&
                      role === "service" && (
                        <ConfirmModal
                          button={{
                            icon: "times",
                            color: "red",
                            text: "Delete",
                          }}
                          text="Confirm deleting this report ?"
                          title="Confirm Delete"
                          OnConfirm={() => DeleteReport(element)}
                        />
                      )}
                  </div>
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      )}
    </Table>
  );
};

export default TableTestComponent;
