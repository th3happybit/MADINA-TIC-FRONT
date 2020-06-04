/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import axios from "axios";
import { Segment, Search, Dropdown, Pagination } from "semantic-ui-react";

import DeclarationsTable from "../ServiceDeclarationsTable/ServiceDeclarationsTable.jsx";
import "./ServiceDeclaration.css";
import { useState } from "react";
import { useEffect } from "react";

const ServiceDeclaration = (props) => {
  const [activeFilter, setactiveFilter] = useState("Validated");
  const [Loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [Data, setData] = useState([]);
  const [pages, setPages] = useState(0);
  const [perm, setPerm] = useState(false);
  const [term, setTerm] = useState(null);
  const [searchLoading, setsearchLoading] = useState(false);
  const [types, settypes] = useState([]);
  const [id, setId] = useState(null);
  const [update, setUpdate] = useState(false);

  const refresh = () => {
    page === 1 ? setUpdate((prevState) => !prevState) : setPage(1);
  };
  const handle_filter = (e) => {
    setTerm("");
    setactiveFilter(e.currentTarget.children[1].textContent);
    setPage(1);
  };
  const handlesearch = (e) => {
    setsearchLoading(true);
    setTerm(e.currentTarget.value);
    setPage(1);
  };
  const changePage = (e, pageInfo) => {
    setPage(pageInfo.activePage);
  };
  const getData = (sid) => {
    setData([]);
    setLoading(true);
    setPerm(false);
    const pa = {
      page: page,
      service: sid,
      ordering: "priority",
    };
    if (term) {
      pa["search"] = term;
    }
    switch (activeFilter) {
      case "Validated":
        pa["status"] = "validated";
        break;
      case "In progress":
        pa["status"] = "under_treatment";
        break;
      case "Treated":
        pa["status"] = "treated";
        break;
      case "Archived":
        pa["status"] = "archived";
        break;
      default:
        break;
    }
    if (sid)
      axios
        .get("http://157.230.19.233/api/declaration_nested/", {
          params: pa,
          headers: {
            "content-type": "application/json",
            Authorization: `Token ${localStorage.getItem("service_token")}`,
          },
        })
        .then((res) => {
          setData(res.data.results);
          setLoading(false);
          if (res.data.count % 10 === 0) {
            setPages(parseInt(res.data.count / 10));
          } else {
            setPages(parseInt(res.data.count / 10) + 1);
          }
          if (res.data.count === 0) {
            setPerm(true);
            //   setAllow(true);
            setsearchLoading(false);
          }
          setLoading(false);
        })
        .catch((err) => {
          console.log(err.response);
        });
  };
  const getTypes = (sid) => {
    setLoading(true);
    axios
      .get("http://157.230.19.233/api/declarations_types/", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${localStorage.getItem("service_token")}`,
        },
      })
      .then((res) => {
        getData(sid);
        settypes(res.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  useEffect(() => {
    axios
      .create({
        headers: {
          get: {
            "Content-Type": "application/json",
            Authorization: `Token ${localStorage.getItem("service_token")}`,
          },
        },
      })
      .request({
        url: "http://157.230.19.233/api/user/",
        method: "get",
      })
      .then((res) => {
        setId(res.data.uid);
        getTypes(res.data.uid);
      });
  }, []);
  useEffect(() => {
    if (id) getData(id);
  }, [page, term, activeFilter, update]);
  return (
    <div className="_service_declarations">
      <div className="_main_header">
        <div className="title_segment">
          <p className="extra-text text-default">Declarations</p>
        </div>
      </div>
      <Segment
        className="_main_body shadow"
        loading={searchLoading ? false : Loading}
      >
        <div className="row">
          <Search
            value={term}
            onSearchChange={handlesearch}
            showNoResults={false}
            results={null}
            input={{
              icon: "search",
              iconPosition: "right",
              disabled:
                Data.length < 1 && (term === null || term === "")
                  ? true
                  : false,
            }}
            placeholder="Search for declarations ..."
          />
          <Dropdown
            className="icon filter_declaration"
            icon="angle down"
            text={activeFilter}
            button
            selection
            labeled
          >
            <Dropdown.Menu>
              <Dropdown.Item
                text="Validated"
                onClick={handle_filter}
                label={{ circular: true, color: "green", empty: true }}
              />
              <Dropdown.Item
                text="In progress"
                onClick={handle_filter}
                label={{ circular: true, color: "yellow", empty: true }}
              />
              <Dropdown.Item
                text="Treated"
                onClick={handle_filter}
                label={{ circular: true, color: "green", empty: true }}
              />
              <Dropdown.Item
                text="Archived"
                onClick={handle_filter}
                label={{ circular: true, color: "black", empty: true }}
              />
            </Dropdown.Menu>
          </Dropdown>
        </div>
        {Data.length > 0 ? (
          <div className="_data_section">
            <DeclarationsTable data={Data} filter={activeFilter} refresh={refresh}/>
            {pages > 1 && (
              <Pagination
                className="_service_pagination"
                boundaryRange={0}
                activePage={page}
                onPageChange={changePage}
                firstItem={null}
                lastItem={null}
                totalPages={pages}
                pointing
                secondary
              />
            )}
          </div>
        ) : (
          perm && (
            <p class="zero-data">
              Sorry No declarations to display in this section
            </p>
          )
        )}
      </Segment>
    </div>
  );
};

export default ServiceDeclaration;
