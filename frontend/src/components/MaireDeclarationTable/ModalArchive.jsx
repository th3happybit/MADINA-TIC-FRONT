import React, { useState } from "react";
import { Modal, Button, Icon, ModalContent } from "semantic-ui-react";

import "./MaireDeclarationTable.css"


const ModalArchive = (props) => {
    const [open, setOpen] = useState(false);

    const handle_archive = () => {
        props.archive(props.data)
    }

    const handleopen = () => {
        setOpen(true);
    };

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
                    <Button onClick={handleopen} animated color="black" className="_hidden_on_mobile">
                        <Button.Content visible content="Archive" />
                        <Button.Content hidden>
                            <Icon name="archive" />
                        </Button.Content>
                    </Button>
                    <Button
                        onClick={handleopen}
                        color="black"
                        icon={{ name: "archive" }}
                        className="shadow _mobile_btn"
                    />
                </>
            }
        >
            <ModalContent>
                <ModalContent className="details_content">
                    {" "}
                    <div className="_header_modal extra-text text-default">
                        <p>Confirm Archive</p>
                    </div>
                    <div className="_redirection_content">
                        <p className="text-default">Confirm Archiving this declaration ?</p>
                    </div>
                </ModalContent>
                <ModalContent className="content_modal_btns">
                    <Button animated color="blue" className="_primary" onClick={handle_archive}>
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


export default ModalArchive;