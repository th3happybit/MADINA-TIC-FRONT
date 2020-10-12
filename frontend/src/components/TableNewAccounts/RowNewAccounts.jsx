import React, { useState } from "react";
import { Image, Table, Button, Modal } from "semantic-ui-react";
import axios from "axios";

export default function RowNewAccounts(props) {
  const [isopen, setOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const {
    first_name,
    last_name,
    email,
    address,
    role,
    image,
    uid,
    index,
    created_on,
    phone,
  } = props.data;
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
          url: "https://madina-tic.ml/api/users/" + uid + "/",
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
        .catch((err) => {});
    } else if (type === 1) {
      axios
        .create({
          headers: {
            delete: {
              "Content-Type": "application/json",
              Authorization: `Token ${localStorage.getItem("admin_token")}`,
            },
          },
        })
        .request({
          url: "https://madina-tic.ml/api/users/" + uid + "/",
          method: "delete",
          data: {
            uid,
          },
        })
        .then((res) => {
          props.refresh();
          setLoading(false);
          setOpen(false);
        })
        .catch((err) => {});
    }
  };

  return (
    <>
      <Table.Row key={index} uid={uid}>
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
            Détails
          </Button>
        </Table.Cell>
      </Table.Row>
      <Modal open={isopen} onClose={() => setOpen(false)} closeIcon>
        <Modal.Content>
          <Modal.Content className="detail_content">
            {" "}
            <div className="_header_modal extra-text text-default">
              <p>Informations du compte</p>
            </div>
            <div className="_content_modal">
              <div>
                {first_name && <p>Nom</p>}
                {last_name && <p>Prénom</p>}
                <p>Email</p>
                <p>Numéro de téléphone</p>
                <p>Adresse</p>
                <p>Rôle</p>
                <p>Date d'inscription</p>
              </div>
              <div
                style={{
                  margin: "0 2rem",
                }}
              >
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
              Approver
            </Button>
            <Button
              onClick={handleApprove}
              className="button_secondary"
              data_reject={1}
            >
              Rejeter
            </Button>
          </Modal.Content>
        </Modal.Content>
      </Modal>
    </>
  );
}
