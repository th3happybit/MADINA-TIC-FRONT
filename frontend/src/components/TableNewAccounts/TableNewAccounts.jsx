import React, { useEffect, useState } from "react";
import { Table, Pagination } from "semantic-ui-react";
import RowNewAccounts from "./RowNewAccounts.jsx";

//? import css
import "./TableNewAccounts";
import axios from "axios";

const TableNewAccounts = (props) => {
  const [data, setData] = useState(null);
  useEffect(() => {
    setData(props.data);
  }, [props]);

  return (
    <>
      {data && (
        <Table basic="very" striped className="new_accounts_table">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell
                width={3}
                className="medium-text text-default not-bold "
                onClick={() => {
                  axios
                    .create({
                      headers: {
                        get: {
                          "Content-Type": "application/json",
                          Authorization: `Token ${localStorage.getItem(
                            "admin_token"
                          )}`,
                        },
                      },
                    })
                    .request({
                      url: props.next,
                      method: "get",
                    })
                    .then((res) => {})
                    .catch((err) => {});
                }}
              >
                Nom complet
              </Table.HeaderCell>
              <Table.HeaderCell
                width={3}
                className="medium-text text-default not-bold"
              >
                Email
              </Table.HeaderCell>
              <Table.HeaderCell
                width={3}
                className="medium-text text-default not-bold element_hide_mobile address"
              >
                Adresse
              </Table.HeaderCell>
              <Table.HeaderCell
                width={3}
                className="medium-text text-default not-bold role"
              >
                Rôle
              </Table.HeaderCell>
              <Table.HeaderCell
                width={3}
                className="medium-text text-default not-bold"
              >
                Gérer
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body className="table_body_new_users">
            {data.map((element, index) => {
              return (
                <RowNewAccounts
                  data={element}
                  index={index}
                  refresh={props.refresh}
                />
              );
            })}
          </Table.Body>
          {data.length > 0 && (
            <Pagination
              className="_maPgin_vertical_lg"
              activePage={props.activePage}
              onPageChange={props.handlePagination}
              totalPages={props.count}
              firstItem={null}
              lastItem={null}
              pointing
              secondary
            />
          )}
        </Table>
      )}
    </>
  );
};
export default TableNewAccounts;
