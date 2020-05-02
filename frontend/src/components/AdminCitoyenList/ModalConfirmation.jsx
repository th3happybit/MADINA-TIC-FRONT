import React, {useState} from "react";
import {Modal, Button, Icon} from "semantic-ui-react";


const ModalC = (props) => {

        const [openC, setopenC] = useState(false);

        const {
            is_approved,
            first_name,
            last_name,
            onConfirm,
            uid
        } = props;

        return (
            <Modal          
                            
                            open={openC}
                            closeIcon
                            onClose={() => {
                                setopenC(false);
                            }}
                            className="_change_approval"
                            trigger={
                                    !is_approved ? 
                                    (
                                    <Button.Group onClick={() => {
                                        setopenC(true);
                                    }}>
                                    <Button icon color="green" className="_reject_btn shadow _hide_on_mobile" >
                                        <Icon name="checkmark"/>
                                    </Button>
                                    <Button color="green" className="shadow _show_on_mobile _mobile_actions" content="Validate"/>
                                    </Button.Group>) 
                                    : 
                                    (
                                    <Button.Group onClick={() => {
                                        setopenC(true);
                                    }}>
                                    <Button icon color="red" className="_approve_btn shadow _hide_on_mobile" >
                                        <Icon name="remove"/>
                                    </Button>
                                    <Button color="red" className="shadow _show_on_mobile _mobile_actions"  content="Ban"/>
                                    </Button.Group>
                                    )
                            }
                            >
                                <Modal.Content className="_confirm_action_citoyen">
                                    {" "}
                                    <div className="_header_modal extra-text text-default">
                                    <p>Confirm Your Action</p>
                                    </div>
                                    <div className="_content_modal_approve">
                                    <p>Confirm {is_approved ? "Ban" : "Approve"} {first_name}  {last_name} ?</p>
                                    </div>
                                <div
                                    className="content_modal_btns"
                                >
                                    <Button className="button_primary" onClick={ () => {
                                        if (openC) onConfirm(uid)}
                                    }>Confirm</Button>
                                    <Button className="button_secondary" onClick={
                                        () => {
                                            setopenC(false)
                                        }
                                    }>Cancel</Button>
                                </div>
                                </Modal.Content>
                            </Modal>
        );
}

export default ModalC;