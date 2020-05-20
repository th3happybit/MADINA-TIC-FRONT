/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import {
  Segment,
  Search,
  Button,
  Pagination,
  Dropdown,
} from "semantic-ui-react";
import axios from "axios";

import DecTable from "../../components/CitoyenDeclarationTable/CitoyenDeclarationTable.jsx";

import "./CitoyenDeclarations.css";

const CitoyenDeclarations = () => {
  const [activeFilter, setactiveFilter] = useState("New Declarations");
  const [Loading, setLoading] = useState(true);
  const [Data, setData] = useState(null);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(0);
  const [term, setterm] = useState("");
  const [searchLoading, setSearchLoading] = useState(false);
  const [sortType, setsortType] = useState(null);
  const [sortDate, setsortDate] = useState(null);
  const [sortMobile, setsortMobile] = useState("Random");
  const [userid, setuserid] = useState(null);
  const [types, settypes] = useState([]);
  const [perm, setperm] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const handlemobileTypeSortAZ = () => {
    setsortDate(null);
    setPage(1);
    setsortType("asc");
    setsortMobile("Group by type");
  };
  const handlemobileNewFirst = () => {
    setsortType(null);
    setPage(1);
    setsortDate("desc");
    setsortMobile("Newer First");
  };
  const handlemobileOldFirst = () => {
    setsortType(null);
    setPage(1);
    setsortDate("asc");
    setsortMobile("Newer First");
  };
  const handleRandomSort = () => {
    setsortType(null);
    setsortType(null);
    setsortMobile("Random");
  };
  const handle_sort_type = () => {
    setsortDate(null);
    if (sortType === "asc") {
      setsortType(null);
      setPage(1);
    } else {
      setsortType("asc");
      setPage(1);
    }
  };
  const handle_sort_date = () => {
    setsortType(null);
    if (sortDate === "asc") {
      setsortDate("desc");
      setPage(1);
    } else if (sortDate === "desc") {
      setsortDate(null);
      setPage(1);
    } else {
      setPage(1);
      setsortDate("asc");
    }
  };
  const handleFilter = (e) => {
    setactiveFilter(e.currentTarget.firstChild.textContent);
    setterm("");
    setPage(1);
  };
  const onChange = (e, pageInfo) => {
    setSearchLoading(true);
    setPage(pageInfo.activePage);
  };
  const handel_search = (e) => {
    setSearchLoading(true);
    setLoading(true);
    setterm(e.currentTarget.value);
    setPage(1);
  };
  const getUser = () => {
    axios
      .create({
        headers: {
          get: {
            "Content-Type": "application/json",
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
        },
      })
      .request({
        url: "http://157.230.19.233/api/user/",
        method: "get",
      })
      .then((res) => {
        setLoading(false);
        setuserid(res.data.uid);
        getdecTypes();
      })
      .catch((err) => {
        // console.log(err.response);
      });
  };
  const getdecTypes = () => {
    axios
      .get("http://157.230.19.233/api/declarations_types/", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        // console.log(res.data)
        settypes(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getDeclarations = () => {
    setData([]);
    setLoading(true);
    setperm(false);
    let pa = {
      page: page,
    };
    if (sortDate) {
      if (sortDate === "asc") pa["ordering"] = "created_on";
      else pa["ordering"] = "-created_on";
    } else if (sortType) {
      if (sortType === "asc") pa["ordering"] = "dtype";
      else pa["ordering"] = "-dtype";
    }
    switch (activeFilter) {
      case "New Declarations":
        pa["status"] = "not_validated";
        break;
      case "Lack of infos":
        pa["status"] = "lack_of_info";
        break;
      case "Validated":
        pa["status"] = "validated";
        break;
      case "Refused":
        pa["status"] = "refused";
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
    const getDeclarations = () => {
        setData([]);
        setLoading(true);
        setperm(false)
        let pa = {
            page: page,
        }
        if (sortDate) {
            if (sortDate === "asc") pa["ordering"] = "created_on"
            else pa["ordering"] = "-created_on"
        }
        else if (sortType) {
            if (sortType === "asc") pa["ordering"] = "dtype"
            else pa["ordering"] = "-dtype"
        }
        switch (activeFilter) {
            case "New Declarations":
                pa["status"] = "not_validated";
                break;
            case "Lack of infos":
                pa["status"] = "lack_of_info";
                break;
            case "Validated":
                pa["status"] = "validated";
                break;
            case "Refused":
                pa["status"] = "refused";
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
        if (term) pa["search"] = term;
        pa["citizen"] = userid;

        axios
            .get("http://157.230.19.233/api/declarations/", {
                params: pa,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Token ${localStorage.getItem("token")}`,
                }
            })
            .then((res) => {
                setData(res.data.results);
                if (res.data.count % 10 === 0) {
                    setPages(parseInt(res.data.count / 10));
                } else {
                    setPages(parseInt(res.data.count / 10) + 1);
                }
                setLoading(false)
                setperm(true)
                setSearchLoading(false);
            })
            .catch((err) => {
                setLoading(false);
                setSearchLoading(false);
            })
    }
    const deleteDeclaration = (id) => {
        axios
            .delete("http://157.230.19.233/api/declarations/" + String(id) + "/", {
                headers: {
                    "content-type": "application/json",
                    Authorization: `Token ${localStorage.getItem("token")}`,
                }
            })
            .then((res) => {
                if (page === 1)
                    setRefresh((prevstate) => !prevstate)
                else
                    setPage(1);
            })
            .catch((err) => {

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    if (types.length > 0) {
      getDeclarations();
    }
  }, [activeFilter, term, page, sortType, sortDate, types, refresh]);

  return (
    <>
      <main className="_main">
        <Segment
          className="_main_right shadow"
          loading={searchLoading ? false : Loading}
        >
          {Data && (
            <>
              <div className="row">
                <div className="title_segment">
                  <p className="extra-text text-default">Declarations</p>
                </div>
                <Search
                  loading={searchLoading}
                  onSearchChange={handel_search}
                  value={term}
                  showNoResults={false}
                  results={null}
                  placeholder="Search for declarations ..."
                  input={{ icon: "search", iconPosition: "right" }}
                />
              </div>
              <div className="row filters">
                <Button
                  onClick={handleFilter}
                  className={
                    activeFilter === "New Declarations" ? "_active" : ""
                  }
                >
                  New Declarations
                </Button>
                <Button
                  onClick={handleFilter}
                  className={activeFilter === "In progress" ? "_active" : ""}
                >
                  In progress
                </Button>
                <Button
                  onClick={handleFilter}
                  className={activeFilter === "Validated" ? "_active" : ""}
                >
                  Validated
                </Button>
                <Button
                  onClick={handleFilter}
                  className={activeFilter === "Treated" ? "_active" : ""}
                >
                  Treated
                </Button>
                <Button
                  onClick={handleFilter}
                  className={activeFilter === "Refused" ? "_active" : ""}
                >
                  Refused
                </Button>
                <Button
                  onClick={handleFilter}
                  className={activeFilter === "Archived" ? "_active" : ""}
                >
                  Archived
                </Button>
                <Button
                  onClick={handleFilter}
                  className={activeFilter === "Lack of infos" ? "_active" : ""}
                >
                  Lack of infos
                </Button>
              </div>
              <div className="show_mobile ">
                <Dropdown
                  icon="angle down"
                  text={activeFilter}
                  floating
                  labeled
                  button
                  className="icon filter_declaration"
                >
                  <Dropdown.Menu>
                    <Dropdown.Item
                      text="New Declarations"
                      onClick={handleFilter}
                    />
                    <Dropdown.Item text="In progress" onClick={handleFilter} />
                    <Dropdown.Item text="Validated" onClick={handleFilter} />
                    <Dropdown.Item text="Treated" onClick={handleFilter} />
                    <Dropdown.Item text="Refused" onClick={handleFilter} />
                    <Dropdown.Item text="Archived" onClick={handleFilter} />
                    <Dropdown.Item
                      text="Lack of infos"
                      onClick={handleFilter}
                    />
                  </Dropdown.Menu>
                </Dropdown>
                <Dropdown
                  icon="angle down"
                  text={sortMobile}
                  floating
                  labeled
                  button
                  className="icon filter_declaration _sorts"
                >
                  <Dropdown.Menu>
                    <Dropdown.Item text="Random" onClick={handleRandomSort} />
                    <Dropdown.Item
                      text="Group by type"
                      onClick={handlemobileTypeSortAZ}
                    />
                    <Dropdown.Item
                      text="Newer First"
                      onClick={handlemobileNewFirst}
                    />
                    <Dropdown.Item
                      text="Older first"
                      onClick={handlemobileOldFirst}
                    />
                  </Dropdown.Menu>
                </Dropdown>
              </div>
              {Data.length > 0 ? (
                <>
                  <DecTable
                    data={Data}
                    filter={activeFilter}
                    refresh={getDeclarations}
                    handlesortDate={handle_sort_date}
                    handlesortType={handle_sort_type}
                    sorttype={sortType}
                    sortdate={sortDate}
                    types={types}
                    handledelete={deleteDeclaration}
                  />
                  <Pagination
                    className="citoyen_declar_pagin"
                    boundaryRange={0}
                    activePage={page}
                    onPageChange={onChange}
                    firstItem={null}
                    lastItem={null}
                    totalPages={pages}
                    pointing
                    secondary
                  />
                </>
              ) : (
                perm && (
                  <>
                    <p class="zero-data">
                      Sorry No declarations to display in this section
                    </p>
                  </>
                )
              )}{" "}
            </>
          )}
        </Segment>
      </main>
    </>
  );
};

export default CitoyenDeclarations;
