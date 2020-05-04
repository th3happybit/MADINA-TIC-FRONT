import React, { useState, useEffect } from "react";
import { Segment, Search } from "semantic-ui-react";
import axios from "axios";

//? import css
import "./AdminNewAccounts.css";

//? import components
import TableNewAccounts from "../TableNewAccounts/TableNewAccounts.jsx";

const AdminNewAccounts = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [count, setCount] = useState(null);
  const [searchValue, setsearchValue] = useState("");
  const [searchLoading, setSearchLoading] = useState(false);

  const handleSearch = (e, { value }) => {
    setsearchValue(value);
    searchRequest();
  };

  const searchRequest = () => {
    if (searchValue.length > 3 || searchValue.length === 1) {
      setSearchLoading(true);
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
          url: `http://13.92.195.8/api/users/?search=${searchValue}?is_approved=false`,
          method: "get",
        })
        .then((res) => {
          if (res.count <= 5) {
            setCount(res.data.count);
          } else {
            if (res.data.count % 5 !== 0) {
              setCount(Math.floor(res.data.count / 5) + 1);
            } else setCount(Math.floor(res.data.count / 5));
          }
          setData(res.data.results);
          setSearchLoading(false);
        })
        .catch((err) => {
          console.log(err.response);
          setSearchLoading(false);
        });
    }
  };
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
      .catch((err) => {
        console.log(err.response);
        setIsLoading(false);
      });
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
        console.log(res);
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

          <Search
            loading={searchLoading}
            className="search_table"
            onSearchChange={handleSearch}
            value={searchValue}
            showNoResults={false}
            results={null}
            placeholder="Search for anything"
            input={{ icon: "search", iconPosition: "left" }}
          />
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
