import React from "react";
import {Table, Image} from "semantic-ui-react";
import axios from "axios";
import ModalD from "./ModalDetails.jsx"
import ModalC from "./ModalConfirmation.jsx";

const AccountsList = (props) => {
        
    // var {AllUsers, ValidatedOnly, NotValidatedOnly} = props

    const {data} = props
    
    const handelApprove = (id) => {
        
        // console.log(String(id) + "approved")
        axios
            .patch(
                "http://13.92.195.8/api/users/" + String(id) + "/", {
                    headers : {
                        "Content-Type": "application/json",
                        Authorization : `Token : ${localStorage.getItem("admin_token")}`
                    },
                    data : {
                        is_approved : true
                    }
                }
            )
            .then((res) => {
                window.location.reload(false)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const handelBan = (id) => {
        // console.log(String(id) + "Banned")
        axios
            .patch(
                "http://13.92.195.8/api/users/" + String(id) + "/", {
                    headers : {
                        "Content-Type": "application/json",
                        Authorization : `Token : ${localStorage.getItem("admin_token")}`
                    },
                    data : {
                        is_approved : false
                    }
                }
            )
            .then((res) => {
                window.location.reload(false)
            })
            .catch((err) => {
                console.log(err.response)
            })
    }
        return (
            <>
                <Table basic="very" striped className="citoyens_accounts_table">
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
                        width={2}
                        className="medium-text text-default not-bold"
                        >
                        Joined
                        </Table.HeaderCell>
                        <Table.HeaderCell
                        width={2}
                        className="medium-text text-default not-bold"
                        >
                        Account Type
                        </Table.HeaderCell>
                        <Table.HeaderCell
                        width={2}
                        className="medium-text text-default not-bold"
                        >
                        Manage
                        </Table.HeaderCell>
                    </Table.Row>
                    </Table.Header>

                    <Table.Body>
                    {data.map((element, index) => {
                        const {
                        uid,
                        picture,
                        first_name,
                        last_name,
                        email,
                        address,
                        role,
                        date_inscription,
                        phone,
                        is_approved
                        } = element;
                        
                        return (
                        <Table.Row key={index}>
                            <Table.Cell className="medium-text text-default ">
                            <div className="fullname_new_account">
                                <Image src={picture} className="_new_account-img" />
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
                            <p className="table_element">{date_inscription}</p>
                            </Table.Cell>
                            <Table.Cell className="medium-text text-default ">
                            <p className="table_element">
                                { is_approved ? "Validated" : "Not Validated"}
                            </p>
                            </Table.Cell>{" "}
                            <Table.Cell className="medium-text text-default " id="manage_cell" >
                            {" "}
                            <ModalD
                                first_name = {first_name}
                                last_name = {last_name}
                                email = {email}
                                phone = {phone}
                                is_approved = {is_approved}
                                role = {role}
                                uid = {uid}
                                address = {address}
                                date_inscription = {date_inscription}
                                handelApprove = {handelApprove}
                            />
                            <ModalC
                                first_name = {first_name}
                                last_name = {last_name}
                                is_approved = {is_approved}
                                onConfirm = {is_approved ? handelBan : handelApprove}
                                uid = {uid}
                            />
                            </Table.Cell>
                        </Table.Row>
                        );
                    })}
                    </Table.Body>
                </Table>
            </>
        );
}

export default AccountsList;