import React, { useState, useEffect } from "react";
import { Table, Icon, Button, Popup } from "semantic-ui-react";
import axios from "axios";

import ModalDetailComponent from "./ModalDetailComponent.jsx";
import ConfirmDeleteModal from "../CitoyenDeclarationTable/ConfirmDeleteModal.jsx";
<<<<<<< HEAD
import ModalComplement from "../MaireDeclarationTable/ModalComplement";
import ModalArchive from "../MaireDeclarationTable/ModalArchive.jsx";
import ModalDetail from "../MaireDeclarationTable/ModalDetails.jsx";
=======
import { Link } from "react-router-dom";
>>>>>>> 494dbbae8c35621ced178c369bd5ad46c6f0d43c

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
    role,
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
  } = props;
  const [Data, setData] = useState([]);
  console.log({ activeFilter });
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
            return (
              <Table.Row>
                {header.map((elm) => (
                  <Table.Cell>{element[elm.value]}</Table.Cell>
                ))}

                <Table.Cell>
                  <div className="btns_actionsx">
                    <ModalDetailComponent
                      data={element}
                      detail={detail}
                      isRapport={isRapport}
                      title={title}
                      token={token}
                      style={{
                        margin: "0 1rem",
                      }}
                    />
                    {isRapport && activeFilter === "not_validated" && (
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
                    {isRapport && activeFilter === "lack_of_info" && (
                      <Button.Group>
                        <Link
                          to={{
                            pathname: "/complement/rapport",
                            state: {
                              rid: element.rid,
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
                    {activeFilter === "not_validated" && (
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
                    {role === "service" && (
                      <>
                        {activeFilter === "not_validated" && (
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
                      </>
                    )}
                    {role === "maire" && (
                      <>
                        {activeFilter === "not_validated" && (
                          <>
                            <ModalDetail
                              status={activeFilter}
                              attachements={[]}
                            />
                          </>
                        )}
                      </>
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
