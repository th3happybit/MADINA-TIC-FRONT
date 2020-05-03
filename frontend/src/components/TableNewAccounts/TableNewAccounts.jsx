import React, { useEffect } from "react";
import { Table, Button, Image, Modal, Pagination } from "semantic-ui-react";

//? import css
import "./TableNewAccounts";
import axios from "axios";
import { useState } from "react";

const TableNewAccounts = (props) => {
  const [data, setData] = useState(null);
  const [isopen, setOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [activePage, setActivePage] = useState(1);

  const handlePagination = (e, { activePage }) => {
    setActivePage(activePage);
    props.update(activePage);
  };

  useEffect(() => {
    setData(props.data);
  }, [props]);
  const handleApprove = (e) => {
    let type = parseInt(e.currentTarget.attributes["data_reject"].value);
    let uid =
      e.currentTarget.offsetParent.children[1].children[1].attributes[
        "data_uid"
      ].value;
    //? 0 approve
    //? 1 reject
    if (type === 0) {
      setLoading(true);
      axios
        .create({
          headers: {
            patch: {
              "Content-Type": "application/json",
              Authorization: `Token ${localStorage.getItem("admin_token")}`,
            },
          },
        })
        .request({
          url: "http://13.92.195.8/api/users/" + uid + "/",
          method: "patch",
          data: {
            is_approved: true,
          },
        })
        .then((res) => {
          props.refresh();
          setLoading(false);
          setOpen(false);
        })
        .catch((err) => console.log(err.response));
    } else if (type === 1) {
      setOpen(false);
    }
  };

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
                    .then((res) => console.log(res))
                    .catch((err) => console.log(err.response));
                }}
              >
                Fullname
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
                Address
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
                Manage
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body className="table_body_new_users">
            {data.map((element, index) => {
              const {
                first_name,
                last_name,
                email,
                address,
                role,
                created_on,
                phone,
                image,
                uid,
              } = element;
              return (
                <>
                  <Table.Row key={index}>
                    <Table.Cell className="medium-text text-default ">
                      {(first_name || last_name) && (
                        <div className="fullname_new_account">
                          <Image src={image} className="_new_account-img" />
                          <p className="medium-text text-default table_element">
                            {first_name + " " + last_name}
                          </p>
                        </div>
                      )}
                      {!(first_name || last_name) && (
                        <div className="fullname_new_account">
                          <Image src={image} className="_new_account-img" />
                          <p
                            className="medium-text text-default table_element"
                            style={{
                              marginLeft: "2rem",
                            }}
                          >
                            /
                          </p>
                        </div>
                      )}
                    </Table.Cell>
                    <Table.Cell className="medium-text text-default ">
                      <p className="table_element">{email}</p>
                    </Table.Cell>
                    <Table.Cell className="medium-text text-default element_hide_mobile">
                      <p className="table_element">{address}</p>
                    </Table.Cell>
                    <Table.Cell className="medium-text text-default ">
                      <p className="table_element">
                        {role.charAt(0).toUpperCase() + role.substring(1)}
                      </p>
                    </Table.Cell>{" "}
                    <Table.Cell className="medium-text text-default ">
                      {" "}
                      <Button
                        className="button_primary btn_account_detail pointer"
                        onClick={() => setOpen(true)}
                      >
                        Account Details
                      </Button>
                    </Table.Cell>
                  </Table.Row>

                  <Modal open={isopen} onClose={() => setOpen(false)} closeIcon>
                    <Modal.Content>
                      <Modal.Content className="detail_content">
                        {" "}
                        <div className="_header_modal extra-text text-default">
                          <p>Account Details</p>
                        </div>
                        <div className="_content_modal">
                          <div>
                            {first_name && <p>First Name</p>}
                            {last_name && <p>Last Name</p>}
                            <p>Email</p>
                            <p>Phone</p>
                            <p>Adress</p>
                            <p>Role</p>
                            <p>Inscription date</p>
                          </div>
                          <div>
                            {first_name && <p>{first_name}</p>}
                            {last_name && <p>{last_name}</p>}
                            <p>{email}</p>
                            <p>{phone}</p>
                            <p>{address}</p>
                            <p>{role}</p>
                            <p>{created_on.slice(0, 10)}</p>
                          </div>
                        </div>
                      </Modal.Content>
                      <Modal.Content
                        className="content_modal_btns marginTop"
                        data_uid={uid}
                      >
                        <Button
                          className="button_primary"
                          onClick={handleApprove}
                          data_reject={0}
                          loading={isLoading}
                        >
                          Approve
                        </Button>
                        <Button
                          onClick={handleApprove}
                          className="button_secondary"
                          data_reject={1}
                        >
                          Reject
                        </Button>
                      </Modal.Content>
                    </Modal.Content>
                  </Modal>
                </>
              );
            })}
          </Table.Body>
          <Pagination
            className="_margin_vertical_lg"
            activePage={activePage}
            onPageChange={handlePagination}
            totalPages={props.count}
            firstItem={null}
            lastItem={null}
            pointing
            secondary
          />
        </Table>
      )}
    </>
  );
};
export default TableNewAccounts;
