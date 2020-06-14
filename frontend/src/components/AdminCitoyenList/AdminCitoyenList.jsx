import React from "react";
import { Table, Image } from "semantic-ui-react";
import ModalD from "./ModalDetails.jsx";
import ModalC from "./ModalConfirmation.jsx";

const AccountsList = (props) => {
  const { data, handelApprove, handelBan } = props;

  return (
    <>
      <Table basic="very" striped className="citoyens_accounts_table">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell
              width={3}
              className="medium-text text-default not-bold "
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
              className="medium-text text-default not-bold element_hide_mobile"
            >
              Adresse
            </Table.HeaderCell>
            <Table.HeaderCell
              width={2}
              className="medium-text text-default not-bold"
            >
              Date Inscription
            </Table.HeaderCell>
            <Table.HeaderCell
              width={2}
              className="medium-text text-default not-bold"
            >
              état du compte
            </Table.HeaderCell>
            <Table.HeaderCell
              width={2}
              className="medium-text text-default not-bold"
            >
              Gérer
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {data.map((element, index) => {
            const {
              uid,
              image,
              first_name,
              last_name,
              email,
              address,
              role,
              created_on,
              phone,
              is_active,
            } = element;

            return (
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
                </Table.Cell>
                <Table.Cell className="medium-text text-default ">
                  <p className="table_element">{email}</p>
                </Table.Cell>
                <Table.Cell className="medium-text text-default element_hide_mobile">
                  <p className="table_element">{address}</p>
                </Table.Cell>
                <Table.Cell className="medium-text text-default ">
                  <p className="table_element">{created_on.slice(0, 10)}</p>
                </Table.Cell>
                <Table.Cell className="medium-text text-default ">
                  <p className="table_element">
                    {is_active ? "Active" : "Descativated"}
                  </p>
                </Table.Cell>{" "}
                <Table.Cell
                  className="medium-text text-default "
                  id="manage_cell"
                >
                  {" "}
                  <ModalD
                    first_name={first_name}
                    last_name={last_name}
                    email={email}
                    phone={phone}
                    is_active={is_active}
                    role={role}
                    uid={uid}
                    address={address}
                    date_inscription={created_on.slice(0, 10)}
                    handelApprove={handelApprove}
                  />
                  <ModalC
                    first_name={first_name}
                    last_name={last_name}
                    is_active={is_active}
                    onConfirm={is_active ? handelBan : handelApprove}
                    uid={uid}
                  />
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </>
  );
};

export default AccountsList;
