import React, { useState, useEffect } from "react";
import { Table, Modal, Checkbox, Button } from "semantic-ui-react";
import ModalDetails from "./ModalDetails.jsx";

import "./MaireDeclarationTable.css";

//? redux stuff
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { add_parent, add_childs } from "../../actions/regroupAction.js";

import { withRouter } from "react-router-dom";
const MaireRow = (props) => {
  useEffect(() => {
    props.add_parent(null)
  }, []);
  const {
    services,
    getMonth,
    getStatus,
    filterAttachments,
    editType,
    isRegroup,
    parent,
  } = props;
  const [isChecked, setIsChecked] = useState(false);
  const [openParent, setOpenParent] = useState(false);

  const {
    did,
    citizen,
    title,
    dtype,
    address,
    created_on,
    status,
    desc,
    service,
    validated_at,
    attachments,
    priority,
  } = props.element;
  const handleClick = () => {
    setIsChecked((prevState) => !prevState);
    const data = { did, status, service };
    if (!parent) {
      props.add_parent(data);
      setOpenParent(true);
    }
    if (parent) {
      props.add_childs(data);
    }
  };

  return (
    <Table.Row
      disabled={parent && did === parent.did}
      key={props.index}
      className={
        isRegroup ? (isChecked ? "activated_row" : "normal") : "normal"
      }
    >
      <Modal open={openParent} className="_success_modal">
        <Modal.Header>Success Message</Modal.Header>
        <Modal.Content>
          <p
            style={{
              fontSize: 18,
              fontWeight: 600,
            }}
            className="text-default"
          >
            Vous avez choisi la déclaration principale ,maintenant choisis les
            sous déclarations
          </p>
        </Modal.Content>
        <Modal.Actions>
          <Button
            className="_primary"
            color="blue"
            onClick={() => {
              setIsChecked(false);
              setOpenParent(false);
            }}
          >
            Got it !
          </Button>
        </Modal.Actions>
      </Modal>

      {isRegroup && (
        <Table.Cell>
          <Checkbox checked={isChecked} onClick={handleClick} />
        </Table.Cell>
      )}
      <Table.Cell className="_table_title">
        {citizen.first_name + " " + citizen.last_name}
      </Table.Cell>
      <Table.Cell>{title}</Table.Cell>
      <Table.Cell className="_hide _hide_td">
        {address.length < 40 ? (
          <p>{address}</p>
        ) : (
            <>
              <p>{address.slice(0, 35) + " ..."}</p>
              <span className="full_text">{address}</span>
            </>
          )}
      </Table.Cell>
      <Table.Cell>
        {created_on.slice(8, 10) +
          " - " +
          getMonth(created_on.slice(5, 7)) +
          " - " +
          created_on.slice(0, 4)}
      </Table.Cell>
      <Table.Cell textAlign="center" className="_left">
        <ModalDetails
          setRefresh={props.setRefresh}
          title="Declarations Details"
          data={{
            fullname: citizen.first_name + " " + citizen.last_name,
            did: did,
            citizen: citizen.uid,
            title: title,
            type: editType(dtype),
            dtype: dtype,
            address: address,
            service: service,
            description: desc,
            attachements: filterAttachments(attachments),
            created_on: created_on
              ? created_on.slice(8, 10) +
              " - " +
              getMonth(created_on.slice(5, 7)) +
              " - " +
              created_on.slice(0, 4)
              : "/",
            priority: priority,
            validated_at: validated_at
              ? validated_at.slice(8, 10) +
              " - " +
              getMonth(validated_at.slice(5, 7)) +
              " - " +
              validated_at.slice(0, 4)
              : "/",
            services: services,
            status: getStatus(status).status,
          }}
          getMonth={getMonth}
          getStatus={getStatus}
          Maire
          reject={props.rejectDeclaration}
          archive={props.archiveDeclaration}
          complement={props.demandComplement}
          validate={props.validateDeclaration}
          maire={props.maire}
        />
      </Table.Cell>
    </Table.Row>
  );
};
MaireRow.propTypes = {
  parent: PropTypes.string.isRequired,
  childs: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  parent: state.regroup.parent,
  childs: state.regroup.childs,
});

export default connect(mapStateToProps, { add_parent, add_childs })(
  withRouter(MaireRow)
);
