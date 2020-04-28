import React from "react";
import {Form, Input} from "semantic-ui-react";


import "./CitoyenInfosForm.css";


const InfosForm = () => {
    return(
        <Form id="iform" className="_margin_vertical_lg">
            <Form.Group widths="equal">
                <Form.Field>
                    <label>Full Name</label>
                    <Input fluid placeholder="Full Name..." />
                </Form.Field>
                <Form.Field>
                    <label>Birthday</label>
                    <Input fluid placeholder="Birthday..." />
                </Form.Field>
            </Form.Group>
            <Form.Group widths="equal">
                <Form.Field>
                    <label>Email</label>
                    <Input fluid placeholder="Email..." />
                </Form.Field>
                <Form.Field>
                    <label>Phone Number</label>
                    <Input fluid placeholder="Phone Number..." />
                </Form.Field>
            </Form.Group>
            <Form.Group widths="equal">
                <Form.Field>
                    <label>Address</label>
                    <Input fluid placeholder="Address..." />
                </Form.Field>
                <Form.Field>
                    <label>National ID</label>
                    <Input fluid placeholder="National ID..." />
                </Form.Field>
            </Form.Group>
        </Form>
    );
};

export default InfosForm;