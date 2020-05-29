import React, { useState, useEffect } from "react";
import { Table, Icon, Button, Popup } from "semantic-ui-react";
import axios from "axios";

import DeleteModal from "../MaireDeclarationTable/ModalDelete.jsx";
import ModalDetailComponent from "./ModalDetailComponent.jsx";
import ConfirmDeleteModal from "../CitoyenDeclarationTable/ConfirmDeleteModal.jsx";
import { Link } from "react-router-dom";

const SortedRow = (props) => {
  const { elm, handleSort, setsortDate } = props;
  const [sorttype, setSortType] = useState("asc");
  const handleTypeSort = (e) => {
    let type = e.currentTarget.attributes.name.value;
    sorttype === "asc" ? setSortType("desc") : setSortType("asc");
    sorttype === "asc" ? setsortDate("desc") : setsortDate("asc");
    handleSort(type);
  };
  return (
    <p className="sort_field pointer" name={elm.value} onClick={handleTypeSort}>
      {elm.text}
      <Icon name={sorttype === "asc" ? "sort up" : "sort down"} />
    </p>
  );
};
const TableTestComponent = (props) => {
  const {
    detail,
    header,
    data,
    setOrderField,
    setsortDate,
    isRapport,
    token,
    title,
    url,
    activeFilter,
    refresh,
    role,
    uid,
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

  return (
    <Table striped className="_service_table">
      <Table.Header>
        {header.map((elm) => {
          return elm.sort ? (
            <Table.HeaderCell width={elm.value === "desc" ? 3 : 2}>
              <SortedRow
                elm={elm}
                handleSort={handleSort}
                setsortDate={setsortDate}
              />
            </Table.HeaderCell>
          ) : (
            <Table.HeaderCell
              content={elm.text}
              width={elm.value === "desc" ? 3 : 2}
            />
          );
        })}
        <Table.HeaderCell content="Manage" width={1} textAlign="center" />
      </Table.Header>
      {Data && (
        <Table.Body>
          {Data.map((element, index) => {
            if (role === "service" && !isRapport) {
              console.log(element);
            }
            return (
              <Table.Row>
                {header.map((elm) => (
                  <Table.Cell>{element[elm.value]}</Table.Cell>
                ))}

                <Table.Cell>
                  <div className="btns_actionsx">
                    <ModalDetailComponent
                      report={element.rid}
                      data={element}
                      detail={detail}
                      activeFilter={activeFilter}
                      isRapport={isRapport}
                      title={title}
                      role={role}
                      token={token}
                      style={{
                        margin: "0 1rem",
                      }}
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
                              className="shadow btn_account_detail pointer _show_on_mobile"
                              content="Edit"
                            />
                          </Link>
                        </Button.Group>
                      )}
                    {activeFilter === "not_validated" && role === "service" && (
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
                    {activeFilter === "lack_of_info" && (
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

                    {activeFilter === "not_validated" && role === "maire" && (
                      <DeleteModal
                        modal
                        icon
                        reject={(data, motif) => {
                          const instance = axios.create({
                            baseURL: `url`,
                            responseType: "json",
                            headers: {
                              "Content-Type": "application/json",
                              Authorization: `Token ${localStorage.getItem(
                                token
                              )}`,
                            },
                          });
                          instance
                            .patch(`${url}${element.rid}/`, {
                              status: "refused",
                            })
                            .then((res) => {
                              let instance2 = axios.create({
                                responseType: "json",
                                baseURL: "http://157.230.19.233/api/",
                                headers: {
                                  "Content-Type": "application/json",
                                  Authorization: `Token ${localStorage.getItem(
                                    token
                                  )}`,
                                },
                              });
                              let body = {
                                maire: uid,
                                reason: motif,
                                report: element.rid,
                              };
                              instance2
                                .post("reports_rejection/", body)
                                .then((res) => {
                                  console.log(res);
                                  refresh();
                                });
                            })
                            .catch((err) => {
                              console.log(err.response);
                            });
                        }}
                      />
                    )}

                    {isRapport &&
                      activeFilter === "not_validated" &&
                      role === "service" && (
                        <ConfirmDeleteModal
                          onConfirm={() => {
                            axios
                              .create({
                                headers: {
                                  patch: {
                                    "Content-Type": "application/json",
                                    Authorization: `Token ${localStorage.getItem(
                                      token
                                    )}`,
                                  },
                                },
                              })
                              .request({
                                url: `${url}${element.rid}/`,
                                method: "patch",
                                data: {
                                  status: "archived",
                                },
                              })
                              .then((res) => {
                                console.log(res);
                                refresh();
                              })
                              .catch((err) => {
                                console.log(err.response);
                              });
                          }}
                        />
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
                            let body = {
                              status: "archived",
                            };
                            instance
                              .patch(`${element.aid}/`, body)
                              .then((res) => {
                                console.log(res);
                                refresh();
                              })
                              .catch((err) => {
                                console.log(err.response);
                              });
                          }}
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
