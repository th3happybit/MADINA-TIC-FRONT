import React, { useState, useEffect } from "react";
import { Table, Icon } from "semantic-ui-react";
import axios from "axios";

import ModalDetailComponent from "./ModalDetailComponent.jsx";
import ConfirmDeleteModal from "../CitoyenDeclarationTable/ConfirmDeleteModal.jsx";

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
                    //? hna dir test taek b isRapport w status w hot props taw3k
                    nrml
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
