import React, { useState } from "react";
import { Modal, Button, Icon, ModalContent, Select } from "semantic-ui-react";

import "./MaireDeclarationTable.css"


const Modalredirect = (props) => {
    const [open, setOpen] = useState(false);
    const [service, setService] = useState(null);

    const handleopen = () => {
        setOpen(true);
    };

    const handlechange = (e) => {
        setService(e.currentTarget.firstChild.textContent);
    }

    const options = [
        { key: '1', value: "Service1", text: "service 1" },
        { key: '2', value: "Service2", text: "service 2" },
        { key: '3', value: "Service3", text: "service 3" },
        { key: '4', value: "Service4", text: "service 4" },
        { key: '5', value: "Service5", text: "service 5" }
    ]

    const handlevalidate = () => {
        props.validate(props.data, service)
    }

    const handleclose = () => {
        setOpen(false);
    };

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