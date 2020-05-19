import React from "react";
import { Table, Icon } from "semantic-ui-react";
import { useEffect, useState } from "react";

import DetailsModal from "./ModalDetails.jsx";
import "./ServiceDeclarationTable.css";


const ServiceDesclarationTable = (props) => {
    const [Data, setData] = useState(null)
    useEffect(() => {
        setData(props.data)
    }, [props.data])

    function filterAttachments(att) {
        var ret = [];
        for (let i = 0; i < att.length; i++) {
            if (att[i].filetype === "image") ret.push(att[i]);
        }

        return ret;
    }


    const editType = (type) => {
        for (let j = 0; j < props.types.length; j++) {
            if (type === props.types[j].dtid) return props.types[j].name;
        }
    };

    function getMonth(month) {
        switch (month) {
            case "01":
                return "Janvier"
            case "02":
                return "Février"
            case "03":
                return "Mars"
            case "04":
                return "Avril"
            case "05":
                return "Mai"
            case "06":
                return "Juin"
            case "07":
                return "Juillet"
            case "08":
                return "Août"
            case "09":
                return "Septembre"
            case "10":
                return "Octobre"
            case "11":
                return "November"
            case "12":
                return "December"
            default:
                break;
        }
    }

    function getStatus(st) {
        var ret = { status: "" };
        switch (st) {
            case "validated":
                ret["status"] = "Validated";
                return ret;
            case "under_treatment":
                ret["status"] = "In progress";
                return ret;
            case "treated":
                ret["status"] = "Treated";
                return ret;
            case "archived":
                ret["status"] = "Archived";
                return ret;
            default:
                break;
        }
    }

    return (
        <Table striped className="_service_table">
            <Table.Header>
                <Table.HeaderCell content="Title" width={2} />
                <Table.HeaderCell content="Address" width={3} className="_hide" />
                <Table.HeaderCell width={2} content="Geo-Coordinates" className="_hide" />
                <Table.HeaderCell width={2}>
                    <p
                        onClick={props.handlesortDate}
                        className="sort_field pointer">
                        Validated At
                        {props.sortdate ? (
                            <Icon name={props.sortdate === "asc" ? "sort up" : "sort down"} />
                        ) : (
                                <Icon name="sort" />
                            )}
                    </p>
                </Table.HeaderCell>
                <Table.HeaderCell content="Manage" width={1} textAlign="center" />
            </Table.Header>
            {Data &&
                <Table.Body>
                    {
                        Data.map((element, index) => {
                            const {
                                title,
                                created_on,
                                validated_at,
                                address,
                                geo_cord,
                                attachments,
                                dtype,
                                desc,
                                status,
                            } = element;

                            return (
                                <Table.Row>
                                    <Table.Cell>
                                        {title}
                                    </Table.Cell>
                                    <Table.Cell className="_hide">
                                        {address.length < 42 ? (
                                            <p>{address}</p>
                                        ) : (
                                                <>
                                                    <p>{address.slice(0, 37) + " ..."}</p>
                                                    <span className="full_text">{address}</span>
                                                </>
                                            )}
                                    </Table.Cell>
                                    <Table.Cell className="_hide">
                                        {geo_cord ?
                                            (geo_cord.length < 20
                                                ?
                                                <p>{geo_cord}</p>
                                                :
                                                <>
                                                    <p>{geo_cord.slice(0, 15) + " ..."}</p>
                                                    <span className="full_text">{geo_cord}</span></>)
                                            :
                                            "/"}
                                    </Table.Cell>
                                    <Table.Cell>
                                        {validated_at ?
                                            validated_at.slice(8, 10) + " - " + getMonth(validated_at.slice(5, 7)) + " - " + validated_at.slice(0, 4) 
                                            : "/"}
                                    </Table.Cell>
                                    <Table.Cell textAlign="center">
                                        <DetailsModal
                                            title={title}
                                            // type={editType(dtype)}
                                            dtype={dtype}
                                            address={address}
                                            description={desc}
                                            attachements={filterAttachments(attachments)}
                                            created_on={
                                                created_on.slice(8, 10) + " - " + getMonth(created_on.slice(5, 7)) + " - " + created_on.slice(0, 4)
                                            }
                                            validated_at={
                                                validated_at ? 
                                                validated_at.slice(8, 10) + " - " + getMonth(validated_at.slice(5, 7)) + " - " + validated_at.slice(0, 4) 
                                                : "/"
                                            }
                                            // rejected_at = {rejected_at ? rejected_at.slice(0,10) : "/"}
                                            status={getStatus(status).status}
                                        />
                                    </Table.Cell>
                                </Table.Row>
                            )
                        })
                    }
                </Table.Body>
            }
        </Table>
    );
}

export default ServiceDesclarationTable;