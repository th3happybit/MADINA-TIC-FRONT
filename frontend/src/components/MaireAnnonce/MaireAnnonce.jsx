/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Segment, Search, Dropdown, Pagination } from "semantic-ui-react";

import AnnonceTable from "./AnnonceTable.jsx";
import "./MaireAnnonce.css";
import axios from "axios";

const MaireAnnonce = (props) => {
  const [activeFilter, setactiveFilter] = useState("Pas validé");
  const [Loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [Data, setData] = useState([]);
  const [pages, setPages] = useState(0);
  const [perm, setPerm] = useState(false);
  const [term, setTerm] = useState(null);
  const [searchLoading, setsearchLoading] = useState(false);
  const [sortEndAt, setSortEndAt] = useState(null);
  const [sortStartAt, setSortStartAt] = useState(null);
  const [sortMobile, setsortMobile] = useState("Aléatoire");
  const [allow, setAllow] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const handle_RandomSort = () => {
    setsortMobile("Aléatoire");
    setSortEndAt(null);
    setSortStartAt(null);
    setPage(1);
  };
  const handle_StartAtFirst = () => {
    setSortStartAt("asc");
    setsortMobile("Debut à (Asc)");
    setSortEndAt(null);
    setPage(1);
  };
  const handle_StartAtLast = () => {
    setSortStartAt("desc");
    setsortMobile("Debut à (Desc)");
    setSortEndAt(null);
    setPage(1);
  };
  const handle_EndAtFirst = () => {
    setSortEndAt("asc");
    setsortMobile("Fin à (Asc)");
    setSortStartAt(null);
    setPage(1);
  };
  const handle_EndAtLast = () => {
    setSortEndAt("desc");
    setsortMobile("Fin à (Desc)");
    setSortStartAt(null);
    setPage(1);
  };
  const handle_StartAt = () => {
    if (!sortStartAt) handle_StartAtFirst();
    else if (sortStartAt === "asc") handle_StartAtLast();
    else {
      setSortStartAt(null);
      setPage(1);
    }
  };
  const handle_EndAt = () => {
    if (!sortEndAt) handle_EndAtFirst();
    else if (sortEndAt === "asc") handle_EndAtLast();
    else {
      setSortEndAt(null);
      setPage(1);
    }
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
    getData();
  };
  const getData = () => {
    setLoading(true);
    setAllow(false);
    setPerm(false);
    const pa = {
      page: page,
    };

    if (sortEndAt)
      sortEndAt === "asc"
        ? (pa["ordering"] = "end_at")
        : (pa["ordering"] = "-end_at");
    else if (sortStartAt)
      sortStartAt === "asc"
        ? (pa["ordering"] = "start_at")
        : (pa["ordering"] = "-start_at");

    switch (activeFilter) {
      case "Pas validé":
        pa["status"] = "not_validated";
        break;
      case "Manque d'informations":
        pa["status"] = "lack_of_info";
        break;
      case "Publié":
        pa["status"] = "published";
        break;
      case "Supprimé":
        pa["status"] = "removed";
        break;
      case "Modifié":
        pa["status"] = "modified";
        break;
      case "Archivé":
        pa["status"] = "archived";
        break;
      default:
        break;
    }
    if (term) {
      pa["search"] = term;
    }

    axios
      .get("https://madina-tic.ml/api/announce_nested/", {
        params: pa,
        headers: {
          "content-type": "application/json",
          Authorization: `Token ${localStorage.getItem("maire_token")}`,
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
        setAllow(true);
        setPerm(true);
        setsearchLoading(false);
        setLoading(false);
      })
      .catch((err) => {
      });
  };
  const updateAnnStatus = (data, aid) => {
    axios
      .create({
        headers: {
          patch: {
            "Content-type": "application/json",
            Authorization: `Token ${localStorage.getItem("maire_token")}`,
          },
        },
      })
      .request("https://madina-tic.ml/api/announces/" + aid + "/", {
        method: "patch",
        data: data,
      })
      .then((res) => {
        setRefresh((prevState) => !prevState);
        setPage(1);
      })
      .catch((err) => {
        setRefresh((prevState) => !prevState);
        setPage(1);
      });
  };
  const addComplement = (data) => {
    axios
      .create({
        headers: {
          post: {
            "Content-type": "application/json",
            Authorization: `Token ${localStorage.getItem("maire_token")}`,
          },
        },
      })
      .request("https://madina-tic.ml/api/announces_complement_demand/", {
        method: "post",
        data: data,
      })
      .then((res) => {
        setRefresh((prevState) => !prevState);
        setPage(1);
      })
      .catch((err) => {
        setRefresh((prevState) => !prevState);
        setPage(1);
      });
  };
  const rejectAnnonce = (annData) => {
    const data = {
      title: annData.title,
      desc: annData.desc,
      status: "removed",
      start_at: annData.start_at,
      end_at: annData.end_at,
    };
    updateAnnStatus(data, annData.aid);
  };
  const demandComplement = (annData, reason) => {
    annData["reason"] = reason;
    const complementData = {
      maire: props.maire,
      announce: annData.aid,
      reason: reason,
    };
    const data = {
      title: annData.title,
      desc: annData.desc,
      status: "lack_of_info",
      start_at: annData.start_at,
      end_at: annData.end_at,
    };
    addComplement(complementData);
    updateAnnStatus(data, annData.aid);
  };
  const validateAnnonce = (annData) => {
    const data = {
      title: annData.title,
      desc: annData.desc,
      status: "published",
      start_at: annData.start_at,
      end_at: annData.end_at,
    };
    updateAnnStatus(data, annData.aid);
  };
  const changePage = (e, pageInfo) => {
    setPage(pageInfo.activePage);
  };
  useEffect(() => {
    getData();
  }, [page, activeFilter, term, refresh, sortStartAt, sortEndAt]);

  return (
    <div className="_maire_annonces">
      <div className="_main_header">
        <div className="title_segment">
          <p className="extra-text text-default">Annonces</p>
        </div>
      </div>
      <Segment
        loading={searchLoading ? false : Loading}
        className="_main_body shadow"
      >
        <div className="row">
          <Search
            loading={searchLoading}
            onSearchChange={handlesearch}
            value={term}
            showNoResults={false}
            input={{
              icon: "search",
              iconPosition: "right",
              disabled:
                Data.length < 1 && (term === null || term === "")
                  ? true
                  : false,
            }}
            placeholder="Recherche des announces ..."
          />
          <Dropdown
            className="icon filter_annonce _mobile"
            icon="angle down"
            text={sortMobile}
            button
            selection
            labeled
          >
            <Dropdown.Menu>
              <Dropdown.Item text="Aléatoire" onClick={handle_RandomSort} />
              <Dropdown.Item text="Ends at (Asc)" onClick={handle_EndAtFirst} />
              <Dropdown.Item text="Ends at (Desc)" onClick={handle_EndAtLast} />
              <Dropdown.Item
                text="Debut à (Asc)"
                onClick={handle_StartAtFirst}
              />
              <Dropdown.Item
                text="Debut à (Desc)"
                onClick={handle_StartAtLast}
              />
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown
            className="icon filter_annonce"
            icon="angle down"
            text={activeFilter}
            button
            selection
            labeled
          >
            <Dropdown.Menu>
              <Dropdown.Item
                text="Pas validé"
                onClick={handle_filter}
                label={{ circular: true, color: "blue", empty: true }}
              />
              <Dropdown.Item
                text="Publié"
                onClick={handle_filter}
                label={{ circular: true, color: "green", empty: true }}
              />
              <Dropdown.Item
                text="Manque d'informations"
                onClick={handle_filter}
                label={{ circular: true, color: "yellow", empty: true }}
              />
              <Dropdown.Item
                text="Modifié"
                onClick={handle_filter}
                label={{ circular: true, color: "yellow", empty: true }}
              />
              <Dropdown.Item
                text="Supprimé"
                onClick={handle_filter}
                label={{ circular: true, color: "red", empty: true }}
              />
              <Dropdown.Item
                text="Archivé"
                onClick={handle_filter}
                label={{ circular: true, color: "black", empty: true }}
              />
            </Dropdown.Menu>
          </Dropdown>
        </div>
        {Data.length > 0 && allow ? (
          <div className="_data_section">
            <AnnonceTable
              data={Data}
              filter={activeFilter}
              validateAnnonce={validateAnnonce}
              rejectAnnonce={rejectAnnonce}
              demandComplement={demandComplement}
              handle_StartAt={handle_StartAt}
              handle_EndAt={handle_EndAt}
              sortEndAt={sortEndAt}
              sortStartAt={sortStartAt}
            />
            {pages > 1 && (
              <Pagination
                className="_maire_pagination"
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
              Désolé, aucun informations à afficher ici
            </p>
          )
        )}
      </Segment>
    </div>
  );
};

export default MaireAnnonce;
