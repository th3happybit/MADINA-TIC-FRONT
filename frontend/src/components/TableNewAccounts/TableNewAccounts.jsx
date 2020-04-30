import React from "react";
import { Table, Button, Image, Modal, Dropdown } from "semantic-ui-react";

//? import css
import "./TableNewAccounts";
import axios from "axios";
import { useState } from "react";

const options = [
  {
    key: "0",
    text: "Consultation declarations",
    value: "consolutation declaration",
  },
  { key: "1", text: "Add declarations", value: "add declarations" },
  { key: "2", text: "Remove declarations", value: "remove declarations" },
];

const TableNewAccounts = (props) => {
  const { data } = props;
  const [open, setOpen] = useState(false);
  const [isHandled, setIsHandled] = useState(false);
  const handleApprove = (e) => {
    let type = parseInt(e.currentTarget.attributes["data_reject"].value);
    let uid =
      e.currentTarget.offsetParent.children[1].children[1].attributes[
        "data_uid"
      ].value;
    //? 0 approve
    //? 1 reject
    if (type === 0) {
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
            is_approved: false,
          },
        })
        .then((res) => {
          setIsHandled(true);
          setOpen(false);
        })
        .catch((err) => console.log(err.response));
    }
  };

  return (
    <>
      <Table basic="very" striped className="new_accounts_table">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell
              width={3}
              className="medium-text text-default not-bold "
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

        <Table.Body>
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
              <Table.Row key={index}>
                <Table.Cell className="medium-text text-default ">
                  <div className="fullname_new_account">
                    <Image src={image} className="_new_account-img" />
                    <p className="medium-text text-default table_element">
                      {first_name + " " + last_name}
                    </p>
                  </div>
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
                  <Modal
                    open={open}
                    onClose={() => setOpen(false)}
                    closeIcon
                    className="_add_account_modal"
                    trigger={
                      !isHandled ? (
                        <Button
                          className="button_primary btn_account_detail pointer"
                          onClick={() => setOpen(true)}
                        >
                          Account Details
                        </Button>
                      ) : (
                        <Button
                          disabled
                          className="button_primary btn_account_detail pointer"
                        >
                          Account Handled
                        </Button>
                      )
                    }
                  >
                    <Modal.Content>
                      <Modal.Content className="detail_content">
                        {" "}
                        <div className="_header_modal extra-text text-default">
                          <p>Account Details</p>
                        </div>
                        <div className="_content_modal">
                          <div>
                            <p>First Name</p>
                            <p>Last Name</p>
                            <p>Email</p>
                            <p>Phone</p>
                            <p>Adress</p>
                            <p>Role</p>
                            <p>Inscription date</p>
                          </div>
                          <div>
                            <p>{first_name}</p>
                            <p>{last_name}</p>
                            <p>{email}</p>
                            <p>{phone}</p>
                            <p>{address}</p>
                            <p>{role}</p>
                            <p>{created_on.slice(0, 10)}</p>
                          </div>
                        </div>
                      </Modal.Content>
                      {role !== "Client" && (
                        <Modal.Content
                          className={role === "citoyen" ? "hide_content" : ""}
                        >
                          <div className="_content_modal plus">
                            <div className="funct">
                              <p className="bold">Functionnalities</p>
                              <Dropdown
                                placeholder="Functionnalities"
                                fluid
                                multiple
                                selection
                                options={options}
                              />
                            </div>
                          </div>
                        </Modal.Content>
                      )}
                      <Modal.Content
                        className="content_modal_btns marginTop"
                        data_uid={uid}
                      >
                        <Button
                          className="button_primary"
                          onClick={handleApprove}
                          data_reject={0}
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
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </>
  );
};
export default TableNewAccounts;
