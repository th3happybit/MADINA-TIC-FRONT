/* eslint-disable no-unused-vars */
import React from "react";
import axios from "axios";
import { Table, Icon, Popup } from "semantic-ui-react";
import ModalDetails from "./ModalDetails.jsx";
import { useEffect } from "react";
import { useState } from "react";


const MaireDeclarationTable = (props) => {

    const { data } = props
    const [names, setNames] = useState([])
    
    function getStatus(st) {
        var ret = { status: "", color: "" }
        switch (st) {
            case "not_validated":
                ret["status"] = "Not Validated";
                ret["color"] = "blue"
                return ret
            case "lack_of_info":
                ret["status"] = "Lack of infos";
                ret["color"] = "orange"
                return ret
            case "validated":
                ret["status"] = "Validated";
                ret["color"] = "green"
                return ret
            case "refused":
                ret["status"] = "Refused";
                ret["color"] = "red"
                return ret
            case "under_treatment":
                ret["status"] = "In progress";
                ret["color"] = "yellow"
                return ret
            case "treated":
                ret["status"] = "Treated";
                ret["color"] = "green"
                return ret
            case "archived":
                ret["status"] = "Archived";
                ret["color"] = "black"
                return ret
            default:
                break;
        }
    }
    const editType = (type) => {
        for (let j = 0; j < props.types.length; j++) {
            if (type === props.types[j].dtid)
                return props.types[j].name
        }
    }
    useEffect(() => {
        setNames(props.names);
    }, [props.names, props.data])

    function filterAttachments(att) {
        var ret = []
        for (let i = 0; i < att.length; i++) {
            if (att[i].filetype === "image")
                ret.push(att[i])
        }

        return ret
    }

    return (
        <Table striped className="_maire_table">
            <Table.Header>
                <Table.HeaderCell
                    content="Citizen Name"
                    width={2}
                />
                <Table.HeaderCell
                    width={2}
                    content="Title"
                >
                </Table.HeaderCell>
                <Table.HeaderCell
                    content="Address"
                    width={3}
                    className="_hide"
                />
                <Table.HeaderCell
                    content="Submitted On"
                    width={1}
                >
                    <p onClick={props.handlesortDate} className="sort_field pointer">Added On
                            {props.sortdate ? (
                            <Icon name={props.sortdate === "asc" ? "sort up" : "sort down"} />) :
                            <Icon name="sort" />}
                    </p>
                </Table.HeaderCell>
                <Table.HeaderCell
                    content="Manage"
                    width={1}
                    textAlign="center"
                />
            </Table.Header>
            <Table.Body>
                {data.map((element, index) => {

                    const {
                        did,
                        citizen,
                        title,
                        dtype,
                        address,
                        created_on,
                        status,
                        desc,
                        validated_at,
                        attachments
                    } = element
                    return (
                        <Table.Row key={index}>
                            <Table.Cell className="_table_title">
                                {names[index]}
                            </Table.Cell>
                            <Table.Cell>
                                {title}
                            </Table.Cell>
                            <Table.Cell className="_hide _hide_td">
                                {address.length < 40 ? (<p>{address}</p>) : (
                                    <>
                                        <p>{address.slice(0, 35) + " ..."}</p>
                                        <span className="full_text">{address}</span>
                                    </>
                                )}
                            </Table.Cell>
                            <Table.Cell>
                                {created_on.slice(0, 10)}
                            </Table.Cell>
                            <Table.Cell textAlign="center" className="_left">
                                <ModalDetails
                                    did={did}
                                    citizen={citizen}
                                    title={title}
                                    type={editType(dtype)}
                                    address={address}
                                    description={desc}
                                    attachements={filterAttachments(attachments)}
                                    created_on={created_on.slice(0, 10)}
                                    validated_at={validated_at ? validated_at.slice(0, 10) : "/"}
                                    // rejected_at = {rejected_at ? rejected_at.slice(0,10) : "/"}
                                    status={getStatus(status).status}
                                    reject={props.rejectDeclaration}
                                    archive={props.archiveDeclaration}
                                    complement={props.demandComplement}
                                    validate={props.validateDeclaration}
                                    maire={props.maire}
                                />
                            </Table.Cell>
                        </Table.Row>
                    )
                })}
            </Table.Body>
        </Table>
    )

}

export default MaireDeclarationTable;