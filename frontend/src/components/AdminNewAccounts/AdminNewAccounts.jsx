import React from "react";
import { Segment, Button } from "semantic-ui-react";

//? import css
import "./AdminNewAccounts.css";

//? import components
import TableNewAccounts from "../TableNewAccounts/TableNewAccounts.jsx";

const AdminNewAccounts = () => {
  return (
    <Segment className="_new_accounts shadow">
      <div className="row">
        <div className="title_segment">
          <p className="extra-text text-default">New Accounts</p>
          <div className="number_new_accounts">
            <span className="extra-small">12</span>
          </div>
        </div>
        <div className="btn_segment">
          <Button className="">Add account</Button>
        </div>
      </div>
      <div className="row_t">
        <TableNewAccounts />
      </div>
    </Segment>
  );
};
export default AdminNewAccounts;
