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
  const [activeFilter, setactiveFilter] = useState("Validée");
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
      has_parent: false,
    };
    if (term) {
      pa["search"] = term;
    }
    switch (activeFilter) {
      case "Validée":
        pa["status"] = "validated";
        break;
      case "En cours":
        pa["status"] = "under_treatment";
        break;
      case "Traité":
        pa["status"] = "treated";
        break;
      case "Archivé":
        pa["status"] = "archived";
        break;
      default:
        break;
    }
    if (sid)
      axios
        .get("https://madina-tic.ml/api/declaration_nested/", {
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
            setsearchLoading(false);
          }
          setLoading(false);
        })
        .catch((err) => {});
  };
  const getTypes = (sid) => {
    setLoading(true);
    axios
      .get("https://madina-tic.ml/api/declarations_types/", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${localStorage.getItem("service_token")}`,
        },
      })
      .then((res) => {
        getData(sid);
        settypes(res.data);
      })
      .catch((err) => {});
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
        url: "https://madina-tic.ml/api/user/",
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
          <p className="extra-text text-default">Déclarations</p>
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
            placeholder="Recherche des déclarations ..."
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
                text="Validée"
                onClick={handle_filter}
                label={{ circular: true, color: "green", empty: true }}
              />
              <Dropdown.Item
                text="En cours"
                onClick={handle_filter}
                label={{ circular: true, color: "yellow", empty: true }}
              />
              <Dropdown.Item
                text="Traité"
                onClick={handle_filter}
                label={{ circular: true, color: "green", empty: true }}
              />
              <Dropdown.Item
                text="Archivé"
                onClick={handle_filter}
                label={{ circular: true, color: "black", empty: true }}
              />
            </Dropdown.Menu>
          </Dropdown>
        </div>
        {Data.length > 0 ? (
          <div className="_data_section">
            <DeclarationsTable
              data={Data}
              filter={activeFilter}
              refresh={refresh}
            />
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
            <p class="zero-data">Désolé, aucun informations à afficher ici</p>
          )
        )}
      </Segment>
    </div>
  );
};

export default ServiceDeclaration;
