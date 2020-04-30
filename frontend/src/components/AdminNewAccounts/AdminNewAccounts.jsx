import React, { useState, useEffect } from "react";
import { Segment } from "semantic-ui-react";
import axios from "axios";

//? import css
import "./AdminNewAccounts.css";

//? import components
import TableNewAccounts from "../TableNewAccounts/TableNewAccounts.jsx";

const AdminNewAccounts = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios
      .create({
        headers: {
          get: {
            "Content-Type": "application/json",
            Authorization: `Token ${localStorage.getItem("admin_token")}`,
          },
        },
      })
      .request({
        url: "http://13.92.195.8/api/users/",
        method: "get",
      })

      .then((res) => {
        setData(
          res.data.results.filter((elm) => {
            return elm.is_approved === false;
          })
        );
        setIsLoading(false);
      })
      .catch((err) => console.log(err.response));
  }, []);
  console.log(data);
  return (
    <Segment loading={isLoading} className="_new_accounts shadow">
      <div className="row">
        <div className="title_segment">
          <p className="extra-text text-default">New Accounts</p>
          {!isLoading && data.length > 0 && (
            <div className="number_new_accounts">
              <span className="extra-small">{data.length}</span>
            </div>
          )}
        </div>
      </div>
      <div className="row_t">
        <TableNewAccounts data={data} />
      </div>
    </Segment>
  );
};
export default AdminNewAccounts;
