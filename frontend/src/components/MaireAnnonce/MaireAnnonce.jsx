/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Segment, Search, Dropdown, Pagination } from "semantic-ui-react";

import AnnonceTable from "./AnnonceTable.jsx";
import "./MaireAnnonce.css";
import axios from "axios";

const MaireAnnonce = (props) => {
  const [activeFilter, setactiveFilter] = useState("Not validated");
  const [Loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [Data, setData] = useState([]);
  const [pages, setPages] = useState(0);
  const [perm, setPerm] = useState(false);
  const [term, setTerm] = useState(null);
  const [searchLoading, setsearchLoading] = useState(false);
  const [sortEndAt, setSortEndAt] = useState(null);
  const [sortStartAt, setSortStartAt] = useState(null);
  const [sortMobile, setsortMobile] = useState("Random");
  const [allow, setAllow] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const handle_RandomSort = () => {
    setsortMobile("Random");
    setSortEndAt(null);
    setSortStartAt(null);
    setPage(1);
  };
  const handle_StartAtFirst = () => {
    setSortStartAt("asc");
    setsortMobile("Start at (Asc)");
    setSortEndAt(null);
    setPage(1);
  };
  const handle_StartAtLast = () => {
    setSortStartAt("desc");
    setsortMobile("Start at (Desc)");
    setSortEndAt(null);
    setPage(1);
  };
  const handle_EndAtFirst = () => {
    setSortEndAt("asc");
    setsortMobile("End at (Asc)");
    setSortStartAt(null);
    setPage(1);
  };
  const handle_EndAtLast = () => {
    setSortEndAt("desc");
    setsortMobile("End at (Desc)");
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
    setTerm("")
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
      case "Not validated":
        pa["status"] = "not_validated";
        break;
      case "Lack of info":
        pa["status"] = "lack_of_info";
        break;
      case "Published":
        pa["status"] = "published";
        break;
      case "Removed":
        pa["status"] = "removed";
        break;
      case "Modified":
        pa["status"] = "modified";
        break;
      case "Archived":
        pa["status"] = "archived";
        break;
      default:
        break;
    }
    if (term) {
      pa["search"] = term;
    }

    axios
      .get("http://157.230.19.233/api/announce_nested/", {
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
        console.log(err);
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
      .request("http://157.230.19.233/api/announces/" + aid + "/", {
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
        console.log(err);
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
      .request("http://157.230.19.233/api/announces_complement_demand/", {
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
        console.log(err);
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
          <p className="extra-text text-default">Announcements</p>
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
            placeholder="Search for announces ..."
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
              <Dropdown.Item text="Random" onClick={handle_RandomSort} />
              <Dropdown.Item text="Ends at (Asc)" onClick={handle_EndAtFirst} />
              <Dropdown.Item text="Ends at (Desc)" onClick={handle_EndAtLast} />
              <Dropdown.Item
                text="Start at (Asc)"
                onClick={handle_StartAtFirst}
              />
              <Dropdown.Item
                text="Start at (Desc)"
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
                text="Not validated"
                onClick={handle_filter}
                label={{ circular: true, color: "blue", empty: true }}
              />
              <Dropdown.Item
                text="Published"
                onClick={handle_filter}
                label={{ circular: true, color: "green", empty: true }}
              />
              <Dropdown.Item
                text="Lack of info"
                onClick={handle_filter}
                label={{ circular: true, color: "yellow", empty: true }}
              />
              <Dropdown.Item
                text="Modified"
                onClick={handle_filter}
                label={{ circular: true, color: "yellow", empty: true }}
              />
              <Dropdown.Item
                text="Removed"
                onClick={handle_filter}
                label={{ circular: true, color: "red", empty: true }}
              />
              <Dropdown.Item
                text="Archived"
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
              Sorry No Announcements to display in this section
            </p>
          )
        )}
      </Segment>
    </div>
  );
};

export default MaireAnnonce;
