/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import ModalDelete from "./ConfirmDeleteModal.jsx"
import { Table, Button, Icon, Popup } from "semantic-ui-react";
import { Link } from "react-router-dom";



const CitoyenDeclarationTable = (props) => {

    const { data, filter, handlesortDate, handlesortType, sortdate, sorttype, handledelete, types } = props;

    const [Data, setData] = useState(data);
    const [Filter, setFilter] = useState(null);
    const [sortDate, setsortDate] = useState(null);
    const [sortType, setsortType] = useState(null);

    const handlesorttype = () => {
        handlesortType();
        props.refresh();
    }

    const handlesortdate = () => {
        handlesortDate();
        props.refresh()
    }

    useEffect(() => {
        setFilter(filter);
        setsortDate(sortdate);
        setsortType(sorttype);
        setData(data)
    });
    const editType = (type) => {
        for (let j = 0; j < types.length; j++) {
            if (type === types[j].dtid)
                return types[j].name
        }
    }

    return (
        <Table striped >
            <Table.Header className="table_header" >
                <Table.Row>
                    <Table.HeaderCell width={2}>
                        Title
                    </Table.HeaderCell>
                    <Table.HeaderCell width={2} onClick={handlesorttype}>
                        <p className="sort_field pointer">Type
                            {sortType ? (
                                <Icon name={sortType === "asc" ? "sort up" : "sort down"} />) : (<Icon name="sort" />)}
                        </p>
                    </Table.HeaderCell>
                    <Table.HeaderCell width={3} id="address_h">
                        Address
                    </Table.HeaderCell>
                    <Table.HeaderCell width={3} id="geo_loc_h">
                        Geo-Coordinates
                    </Table.HeaderCell>
                    <Table.HeaderCell width={2} onClick={handlesortdate}>
                        <p className="sort_field pointer">Depo. Date
                        {sortDate ? (
                                <Icon name="sort down" />) : (<Icon name="sort" />)}</p>
                    </Table.HeaderCell>
                    <Table.HeaderCell width={3} textAlign={"center"}>
                        Manage
                    </Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {Data.map((element, index) => {
                    const {
                        title,
                        dtype,
                        address,
                        geo_cord,
                        created_on,
                        did,
                    } = element;

                    return (
                        <Table.Row key={index}>
                            {console.log(did)}
                            <Table.Cell>
                                {title}
                            </Table.Cell>
                            <Table.Cell>
                                {editType(dtype)}
                            </Table.Cell>
                            <Table.Cell id="address">
                                {address.length < 28 ? (<p>{address}</p>) : (
                                    <>
                                        <p>{address.slice(0, 25) + " ..."}</p>
                                        <span className="full_text">{address}</span>
                                    </>
                                )}
                            </Table.Cell>
                            <Table.Cell id="geo_loc">
                                {geo_cord.length < 32 ? geo_cord : (
                                    <>
                                        {geo_cord.slice(0, 28) + " ..."}
                                        <span className="full_text">{geo_cord}</span>
                                    </>
                                )}
                            </Table.Cell>
                            <Table.Cell>
                                {created_on.slice(0, 10)}
                            </Table.Cell>
                            <Table.Cell id="manage_cell">

                                <Button.Group className="manage_button">
                                    <Link to={{ pathname: "/infos", state: { id: did } }} >
                                        <Popup
                                            content="Infos"
                                            trigger={
                                                <Button icon id="infos_btn" className="shadow _hide_on_mobile _infos_btn_desktop">
                                                    <Icon name="info" color="black" />
                                                </Button>
                                            }
                                        />

                                    </Link>
                                    <Link to={{ pathname: "/infos", state: { id: did } }} >
                                        <Button
                                            className="shadow btn_account_detail pointer primary _show_on_mobile"
                                            content="Details"
                                        />
                                    </Link>
                                </Button.Group>

                                {Filter === "Refused" && (
                                    <Button.Group className="manage_button">
                                        <Popup
                                            content="Resend"
                                            trigger={
                                                <Button icon color={"yellow"} className="shadow _hide_on_mobile">
                                                    <Icon name="sync alternate" color="white" />
                                                </Button>
                                            }
                                        />
                                        <Button
                                            color={"yellow"}
                                            className="shadow btn_account_detail pointer _show_on_mobile"
                                            content="Resend"
                                        />
                                    </Button.Group>
                                )}
                                {Filter === "New Declarations" && (
                                    <Button.Group className="manage_button">
                                        <Popup
                                            content="Edit"
                                            trigger=
                                            {
                                                <Button icon color={"black"} className="shadow _hide_on_mobile">
                                                    <Icon name="pencil alternate" color="white" />
                                                </Button>
                                            }
                                        />
                                        <Button
                                            color={"black"}
                                            className="shadow btn_account_detail pointer _show_on_mobile"
                                            content="Edit"
                                        />
                                    </Button.Group>
                                )}
                                {Filter === "Lack of infos" && (
                                    <Button.Group className="manage_button">
                                        <Popup
                                            content="Add Infos"
                                            trigger=
                                            {
                                                <Button icon color={"green"} className="shadow _hide_on_mobile">
                                                    <Icon name="plus" color="white" />
                                                </Button>
                                            }
                                        />
                                        <Button
                                            color={"green"}
                                            className="shadow btn_account_detail pointer _show_on_mobile"
                                            content="Add infos"
                                        />
                                    </Button.Group>
                                )}
                                {((Filter === "New Declarations") || (Filter === "Refused") || (Filter === "Lack of infos")) && (
                                    <ModalDelete
                                        onConfirm={handledelete}
                                        did={did}
                                    />
                                )}
                            </Table.Cell>
                        </Table.Row>
                    );
                })}
            </Table.Body>
        </Table>
    );

}

export default CitoyenDeclarationTable