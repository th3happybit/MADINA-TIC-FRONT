import React from "react";
import { Table, Button, Image } from "semantic-ui-react";

//? import css
import "./TableNewAccounts";

//? import image
import Alex from "../../assets/images/alex.jpg";

const TableNewAccounts = () => {
  return (
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
        <Table.Row>
          <Table.Cell className="medium-text text-default ">
            <div className="fullname_new_account">
              <Image src={Alex} className="_new_account-img" />
              <p className="medium-text text-default table_element">
                Bensaber djamel
              </p>
            </div>
          </Table.Cell>
          <Table.Cell className="medium-text text-default ">
            <p className="table_element"> o.bengoudifa@es-sba.dz</p>
          </Table.Cell>
          <Table.Cell className="medium-text text-default element_hide_mobile">
            <p className="table_element"> Mostaganem,rue 400 logts</p>
          </Table.Cell>
          <Table.Cell className="medium-text text-default ">
            <p className="table_element">Citoyens</p>
          </Table.Cell>{" "}
          <Table.Cell className="medium-text text-default ">
            {" "}
            <Button className="button_primary btn_account_detail">
              Account Details
            </Button>
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell className="medium-text text-default ">
            <div className="fullname_new_account">
              <Image src={Alex} className="_new_account-img" />
              <p className="medium-text text-default table_element">
                Bensaber djamel
              </p>
            </div>
          </Table.Cell>
          <Table.Cell className="medium-text text-default ">
            <p className="table_element"> o.bengoudifa@es-sba.dz</p>
          </Table.Cell>
          <Table.Cell className="medium-text text-default element_hide_mobile">
            <p className="table_element"> Mostaganem,rue 400 logts</p>
          </Table.Cell>
          <Table.Cell className="medium-text text-default ">
            <p className="table_element">Citoyens</p>
          </Table.Cell>{" "}
          <Table.Cell className="medium-text text-default ">
            {" "}
            <Button className="button_primary btn_account_detail">
              Account Details
            </Button>
          </Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  );
};
export default TableNewAccounts;
