/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Dropdown, Pagination, Segment, Search } from "semantic-ui-react";
import axios from "axios";

import CitoyenList from "../../components/AdminCitoyenList/AdminCitoyenList.jsx";

import "./AdminCitoyen.css";

const AdminCitoyen = (props) => {
  const [isloading, setisloading] = useState(true);
  const [Data, setData] = useState([]);
  const [count, setcount] = useState(0);
  const [activeFilter, setactiveFilter] = useState("Active");
  const [page, setpage] = useState(1);
  const [sort, setsort] = useState("Trier");
  const [term, setterm] = useState("");
  const [searchLoading, setSearchLoading] = useState(false);
  const [stat, setstat] = useState(false);

  const onChange = (e, pageInfo) => {
    setSearchLoading(true);
    setpage(pageInfo.activePage);
  };

  const handelApprove = (id) => {
    axios
      .create({
        headers: {
          patch: {
            "Content-Type": "application/json",
            Authorization: `Token ${localStorage.getItem("admin_token")}`,
          },
        },
      })
      .request({
        url: "https://madina-tic.ml/api/users/" + id + "/",
        method: "patch",
        data: {
          is_active: true,
        },
      })
      .then((res) => {
        setstat(true);
        if (activeFilter !== "Tout les citoyens") setpage(1);
      })
      .catch((err) => {});
  };

  const handelBan = (id) => {
    axios
      .create({
        headers: {
          patch: {
            "Content-Type": "application/json",
            Authorization: `Token ${localStorage.getItem("admin_token")}`,
          },
        },
      })
      .request({
        url: "https://madina-tic.ml/api/users/" + id + "/",
        method: "patch",
        data: {
          is_active: false,
        },
      })
      .then((res) => {
        setstat(true);
        if (activeFilter !== "Tout les citoyens") setpage(1);
      })
      .catch((err) => {});
  };

  const handel_search = (e) => {
    setSearchLoading(true);
    setterm(e.currentTarget.value);
    setpage(1);
  };
  const getData = (p, filter, sortP) => {
    let pa = {
      page: p,
      is_approved: true,
    };

    if (filter === "Désactivée") {
      pa["is_active"] = false;
    } else if (filter === "Active") {
      pa["is_active"] = true;
    }

    if (sortP === "Nom A-Z") pa["ordering"] = "first_name";
    else if (sortP === "Name Z-A") pa["ordering"] = "-first_name";
    else if (sortP === "Plus récent") pa["ordering"] = "-created_on";
    else if (sortP === "Plus ancien") pa["ordering"] = "created_on";

    if (term !== "") {
      pa["search"] = term;
    }

    pa["role"] = "Client";

    axios
      .get("https://madina-tic.ml/api/users/", {
        params: pa,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${localStorage.getItem("admin_token")}`,
        },
      })
      .then((res) => {
        setData(res.data.results);
        if (res.data.count < 6) {
          setpage(1);
          setcount(1);
        } else {
          if (res.data.count % 5 === 0) {
            setcount(parseInt(res.data.count / 5));
          } else {
            setcount(parseInt(res.data.count / 5) + 1);
          }
        }
        setSearchLoading(false);
        setisloading(false);
      })
      .catch((err) => {});
  };
  useEffect(() => {
    getData(page, activeFilter, sort);
    setstat(false);
  }, [page, activeFilter, sort, term, stat]);

  const handel_all = () => {
    setactiveFilter("Tout les citoyens");
  };

  const handel_onlyvalidated = () => {
    setactiveFilter("Active");
    setpage(1);
  };

  const handel_notvalidated = () => {
    setactiveFilter("Désactivée");
    setpage(1);
  };

  const sortNameAZ = () => {
    setsort("Nom A-Z");
  };
  const sortNameZA = () => {
    setsort("Name Z-A");
  };
  const sortDateN = () => {
    setsort("Plus récent");
  };
  const sortDateO = () => {
    setsort("Plus ancien");
  };
  const noSort = () => {
    setsort("Trier");
  };

  return (
    <Segment className="_admin_accounts shadow" loading={isloading}>
      <div className="row">
        <div className="title_segment">
          <p className="extra-text text-default">Liste des citoyens</p>
        </div>

        <div class="_filters">
          <Search
            id="search_filter"
            loading={searchLoading}
            onSearchChange={handel_search}
            value={term}
            showNoResults={false}
            results={null}
            placeholder="Recherche..."
            input={{ icon: "search", iconPosition: "left" }}
          />
          <Dropdown
            text={sort}
            icon="angle down"
            floating
            labeled
            button
            className="icon filter_admin_citoyen"
            id="sort_filter"
          >
            <Dropdown.Menu id="filter_menu_sort">
              <Dropdown.Item
                label={{ color: "blue", empty: true, circular: true }}
                text="Aléatoire"
                onClick={noSort}
              />
              <Dropdown.Item
                label={{ color: "green", empty: true, circular: true }}
                text="Nom A-Z"
                onClick={sortNameAZ}
              />
              <Dropdown.Item
                label={{ color: "green", empty: true, circular: true }}
                text="Nom Z-A"
                onClick={sortNameZA}
              />
              <Dropdown.Item
                label={{ color: "red", empty: true, circular: true }}
                text="Plus récent"
                onClick={sortDateN}
              />
              <Dropdown.Item
                label={{ color: "red", empty: true, circular: true }}
                text="Plus ancien"
                onClick={sortDateO}
              />
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown
            text={activeFilter}
            icon="angle down"
            floating
            labeled
            button
            className="icon filter_admin_citoyen"
          >
            <Dropdown.Menu id="filter_menu_">
              <Dropdown.Item
                label={{ color: "blue", empty: true, circular: true }}
                text="Tous les utilisateurs"
                onClick={handel_all}
              />
              <Dropdown.Item
                label={{ color: "green", empty: true, circular: true }}
                text="Active"
                onClick={handel_onlyvalidated}
              />
              <Dropdown.Item
                label={{ color: "red", empty: true, circular: true }}
                text="Désactivée"
                onClick={handel_notvalidated}
              />
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
      {!isloading && (
        <div className="row_t">
          <CitoyenList
            data={Data}
            handelApprove={handelApprove}
            handelBan={handelBan}
          />
          <Pagination
            className="_admin_citoyen_pagin"
            boundaryRange={0}
            activePage={page}
            onPageChange={onChange}
            firstItem={null}
            lastItem={null}
            totalPages={count}
            pointing
            secondary
          />
        </div>
      )}
    </Segment>
  );
};

export default AdminCitoyen;
