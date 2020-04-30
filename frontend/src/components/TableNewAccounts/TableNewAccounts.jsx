import React, { useState, useEffect } from "react";
import { Table, Button, Image, Modal, Dropdown } from "semantic-ui-react";
import axios from "axios";

//? import css
import "./TableNewAccounts";

//? import image
import Alex from "../../assets/images/alex.jpg";

const options = [
  {
    key: "0",
    text: "Consultation declarations",
    value: "consolutation declaration",
  },
  { key: "1", text: "Add declarations", value: "add declarations" },
  { key: "2", text: "Remove declarations", value: "remove declarations" },
];

const TableNewAccounts = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .create({
        headers: {
          get: {
            "Content-Type": "application/json",
            Authorization: `Token ${localStorage.getItem("admin_token")}`,
          },
        },
      })
      .request({
        url: "http://13.92.195.8/api/users/",
        method: "get",
      })

      .then((res) => setData(res.data.results))
      .catch((err) => console.log(err.response));
  }, []);
  console.log(data);
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
              className="medium-text text-default not-bold element_hide_mobile"
            >
              Address
            </Table.HeaderCell>
            <Table.HeaderCell
              width={3}
              className="medium-text text-default not-bold"
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
              picture,
              first_name,
              last_name,
              email,
              address,
              role,
              date_inscription,
              phone,
              image,
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
                    closeIcon
                    className="_add_account_modal"
                    trigger={
                      <Button className="button_primary btn_account_detail pointer">
                        Account Details
                      </Button>
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
                            <p>{date_inscription}</p>
                          </div>
                        </div>
                      </Modal.Content>
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
                      <Modal.Content
                        className={
                          role === "citoyen"
                            ? "content_modal_btns marginTop"
                            : "content_modal_btns"
                        }
                      >
                        <Button className="button_primary">Approve</Button>
                        <Button className="button_secondary">Reject</Button>
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
