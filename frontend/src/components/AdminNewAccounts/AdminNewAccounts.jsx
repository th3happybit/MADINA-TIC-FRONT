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
  const [count, setCount] = useState(null);

  const updateData = (pageNumber) => {
    let url = `http://13.92.195.8/api/users/?page=${pageNumber}`;
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
        url: url,
        method: "get",
      })
      .then((res) => {
        setData(res.data.results);
        setIsLoading(false);
      })
      .catch((err) => console.log(err.response));
  };
  useEffect(() => {
    setIsLoading(true);
    getData();
  }, []);
  const getData = () => {
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
        url: "http://13.92.195.8/api/users/?is_approved=false",
        method: "get",
      })
      .then((res) => {
        setData(res.data.results);
        setIsLoading(false);
        if (res.data.count % 5 !== 0) {
          setCount(Math.floor(res.data.count / 5) + 1);
        } else setCount(Math.floor(res.data.count / 5));
      })
      .catch((err) => console.log(err.response));
  };
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
        <TableNewAccounts
          data={data}
          count={count}
          refresh={getData}
          update={updateData}
        />
      </div>
    </Segment>
  );
};
export default AdminNewAccounts;
