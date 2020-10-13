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
  const [activePage, setActivePage] = useState(1);

  const handlePagination = (e, { activePage }) => {
    setActivePage(activePage);
  };

  const handleSearch = (e, { value }) => {
    setsearchValue(value);
  };
  const getData = () => {
    setIsLoading(true);
    let url = `https://madina-tic.ml/api/users/`;
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
        url,
        method: "get",
        params: {
          page: activePage,
          search: searchValue,
          is_approved: false,
        },
      })
      .then((res) => {
        setData(res.data.results);
        setIsLoading(false);
        if (res.data.count % 5 !== 0) {
          setCount(Math.floor(res.data.count / 5) + 1);
        } else setCount(Math.floor(res.data.count / 5));
        setSearchLoading(false);
      })
      .catch((err) => {});
  };
  useEffect(() => {
    setIsLoading(true);
    let url = `https://madina-tic.ml/api/users/`;
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
        url,
        method: "get",
        params: {
          page: activePage,
          search: searchValue,
          is_approved: false,
        },
      })
      .then((res) => {
        setData(res.data.results);
        setIsLoading(false);
        if (res.data.count % 5 !== 0) {
          setCount(Math.floor(res.data.count / 5) + 1);
        } else setCount(Math.floor(res.data.count / 5));
        setSearchLoading(false);
      })
      .catch((err) => {});
  }, [searchValue, activePage]);

  return (
    <Segment loading={isLoading} className="_new_accounts shadow">
      <div className="row">
        <div className="title_segment">
          <p className="extra-text text-default">Nouveaux Comptes</p>

          <Search
            loading={searchLoading}
            className="search_table"
            onSearchChange={handleSearch}
            value={searchValue}
            showNoResults={false}
            results={null}
            placeholder="Recherche..."
            input={{ icon: "search", iconPosition: "left" }}
          />
        </div>
      </div>
      <div className="row_t">
        {data.length > 0 ? (
          <TableNewAccounts
            data={data}
            count={count}
            activePage={activePage}
            handlePagination={handlePagination}
            refresh={getData}
          />
        ) : (
          <p className="p_no">Désolé, aucun nouveau compte n'est disponible </p>
        )}
      </div>
    </Segment>
  );
};
export default AdminNewAccounts;
