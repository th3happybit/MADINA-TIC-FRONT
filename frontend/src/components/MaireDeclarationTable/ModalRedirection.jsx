import React, { useState } from "react";
import { Modal, Button, Icon, ModalContent, Select } from "semantic-ui-react";

import "./MaireDeclarationTable.css"
import { useEffect } from "react";


const Modalredirect = (props) => {
    const [open, setOpen] = useState(false);
    const [service, setService] = useState(null);
    const [options, setOptions] = useState([]);

    const handleopen = () => {
        setOpen(true);
    };
    const handlechange = (e, {value}) => {
        setService(value);
    }
    const handlevalidate = () => {
        let dt = props.data;
        dt["service"] = service;
        dt["validated_at"] = new Date().toJSON().substr(0,19)+"+01:00";
        props.validate(dt)
    }
    const handleclose = () => {
        setOpen(false);
    };
    useEffect(() => {
        let arr = [];
        props.services.map((elem, index) => {
            arr.push({
                key : index,
                value : elem.uid,
                text : elem.first_name + " " + elem.last_name,
            })
        })
        setOptions(arr);
    }, [props.services])
    return (
        <Modal
            open={open}
            onClose={handleclose}
            className="_redirect_modal"
            trigger={
                <>
                    <Button onClick={handleopen} animated color="blue" className="_primary _hidden_on_mobile">
                        <Button.Content visible content="Validate" />
                        <Button.Content hidden>
                            <Icon name="checkmark" />
                        </Button.Content>
                    </Button>
                    <Button
                        onClick={handleopen}
                        color="blue"
                        icon={{ name: "checkmark" }}
                        className="shadow _mobile_btn _primary"
                    />
                </>
            }
        >
            <ModalContent>
                <ModalContent className="details_content">
                    <div className="_header_modal extra-text text-default">
                        <p>Confirm validation {"&"} redirect</p>
                    </div>
                    <div className="_redirection_content">
                        <div>
                            <label className="text-default">Redirect to :</label>
                            <Select
                                className="shadow"
                                placeholder="Service"
                                options={options}
                                onChange={handlechange}
                            />
                        </div>
                    </div>
                </ModalContent>
                <ModalContent className="content_modal_btns">
                    <Button animated color="blue" className="_primary" onClick={handlevalidate}>
                        <Button.Content visible content="Confirm" />
                        <Button.Content hidden>
                            <Icon name="checkmark" />
                        </Button.Content>
                    </Button>
                    <Button animated onClick={handleclose} color="orange">
                        <Button.Content visible content="Cancel" />
                        <Button.Content hidden>
                            <Icon name="delete" />
                        </Button.Content>
                    </Button>
                </ModalContent>
            </ModalContent>
        </Modal>
    );
}


export default Modalredirect;