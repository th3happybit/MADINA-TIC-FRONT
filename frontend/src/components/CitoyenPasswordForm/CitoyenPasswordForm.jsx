import React from "react";

import {Form} from "semantic-ui-react";

import "./CitoyenPasswordForm.css";

const PasswordForm = () => {
    return (
        <div>
            <Form id="pform" className="_margin_vertical_lg">
              <Form.Group>
                <Form.Input
                  type="password"
                  label="Current Password"
                  placeholder="Current Password"
                />
              </Form.Group>
              <Form.Group>
                <Form.Input
                  type="password"
                  label="New Password"
                  placeholder="New Password"
                />
              </Form.Group>
              <Form.Group>
                <Form.Input
                  type="password"
                  label="Confirm Password"
                  placeholder="Confirm Password"
                />
              </Form.Group>
            </Form>
        </div>
    );
}

export default PasswordForm;