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

//? redux stuff
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { change_mode } from "../../actions/darkAction";
import { change_language } from "../../actions/languageAction";
import { languages } from "../../language";

const CitoyenDeclarations = (props) => {
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
    } else {
      setsortType("asc");
    }
  };
  const handle_sort_date = () => {
    setsortType(null);
    if (sortDate === "asc") {
      setsortDate("desc");
    } else if (sortDate === "desc") {
      setsortDate(null);
    } else {
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
        url: "https://www.madina-tic.ml/api/user/",
        method: "get",
      })
      .then((res) => {
        setuserid(res.data.uid);
        getdecTypes();
      })
      .catch((err) => {
        // console.log(err.response);
      });
  };
  const getdecTypes = () => {
    axios
      .get("https://www.madina-tic.ml/api/declarations_types/", {
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
      case "Draft":
        pa["status"] = "draft";
        break;
      default:
        break;
    }
    if (term) pa["search"] = term;
    pa["citizen"] = userid;

    axios
      .get("https://www.madina-tic.ml/api/declarations/", {
        params: pa,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setData(res.data.results);
        if (res.data.count % 10 === 0) {
          setPages(parseInt(res.data.count / 10));
        } else {
          setPages(parseInt(res.data.count / 10) + 1);
        }
        setLoading(false);
        setperm(true);
        setSearchLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        setSearchLoading(false);
      });
  };
  const deleteDeclaration = (id) => {
    axios
      .delete(
        "https://www.madina-tic.ml/api/declarations/" + String(id) + "/",
        {
          headers: {
            "content-type": "application/json",
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        if (page === 1) setRefresh((prevstate) => !prevstate);
        else setPage(1);
      })
      .catch((err) => {});
  };

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    if (types.length > 0) {
      getDeclarations();
    }
  }, [activeFilter, term, page, sortType, sortDate, types, refresh]);

  return (
    <div className="_main_declaration">
      <Segment
        className="_main_declaration_right shadow"
        loading={searchLoading ? false : Loading}
      >
        {Data && (
          <>
            <div className={props.language.isFrench ? "row" : "row reverse"}>
              <div className="title_segment">
                <p className="extra-text text-default">
                  {props.language.isFrench ? "Déclarations" : "تصريحات"}
                </p>
              </div>
              <Search
                loading={searchLoading}
                onSearchChange={handel_search}
                value={term}
                showNoResults={false}
                results={null}
                placeholder={
                  props.language.isFrench
                    ? "Recherche de déclarations"
                    : "ابحث عن تصريحات"
                }
                input={{
                  icon: "search",
                  iconPosition: "right",
                  disabled:
                    Data.length < 1 && (term === null || term === "")
                      ? true
                      : false,
                }}
              />
            </div>
            <div
              className="row filters"
              style={{
                flexDirection: props.language.isFrench ? "row" : "row-reverse",
              }}
            >
              <Button
                onClick={handleFilter}
                className={activeFilter === "New Declarations" ? "_active" : ""}
              >
                {props.language.isFrench
                  ? "Nouvelles déclarations"
                  : "تصريحات جديدة"}
              </Button>
              <Button
                onClick={handleFilter}
                className={activeFilter === "In progress" ? "_active" : ""}
              >
                {props.language.isFrench ? "en cours" : "في تقدم"}
              </Button>
              <Button
                onClick={handleFilter}
                className={activeFilter === "Validated" ? "_active" : ""}
              >
                {props.language.isFrench ? "Validé" : "تم التحقق من صحتها"}
              </Button>
              <Button
                onClick={handleFilter}
                className={activeFilter === "Treated" ? "_active" : ""}
              >
                {props.language.isFrench ? "Traité" : "يعالج"}
              </Button>
              <Button
                onClick={handleFilter}
                className={activeFilter === "Refused" ? "_active" : ""}
              >
                {props.language.isFrench ? "Refusé" : "رفض"}
              </Button>
              <Button
                onClick={handleFilter}
                className={activeFilter === "Archived" ? "_active" : ""}
              >
                {props.language.isFrench ? "Archivé" : "مؤرشف"}
              </Button>
              <Button
                onClick={handleFilter}
                className={activeFilter === "Lack of infos" ? "_active" : ""}
              >
                {props.language.isFrench
                  ? "Manque d'informations"
                  : "عدم وجود معلومات"}
              </Button>
              <Button
                onClick={handleFilter}
                className={activeFilter === "Draft" ? "_active" : ""}
              >
                {props.language.isFrench ? "Brouillon" : "مشروع"}
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
                    text={
                      props.language.isFrench
                        ? "Nouvelles déclarations"
                        : "تصريحات جديدة"
                    }
                    onClick={handleFilter}
                  />
                  <Dropdown.Item
                    text={props.language.isFrench ? "en cours" : "في تقدم"}
                    onClick={handleFilter}
                  />
                  <Dropdown.Item
                    text={
                      props.language.isFrench ? "Validé" : "تم التحقق من صحتها"
                    }
                    onClick={handleFilter}
                  />
                  <Dropdown.Item
                    text={props.language.isFrench ? "Traité" : "يعالج"}
                    onClick={handleFilter}
                  />
                  <Dropdown.Item
                    text={props.language.isFrench ? "Refusé" : "رفض"}
                    onClick={handleFilter}
                  />
                  <Dropdown.Item
                    text={props.language.isFrench ? "Archivé" : "مؤرشف"}
                    onClick={handleFilter}
                  />
                  <Dropdown.Item
                    text={
                      props.language.isFrench
                        ? "Manque d'informations"
                        : "عدم وجود معلومات"
                    }
                    onClick={handleFilter}
                  />
                  <Dropdown.Item
                    text={props.language.isFrench ? "Brouillon" : "مشروع"}
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
              <div className="_data_section">
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
                {pages > 1 && (
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
                )}
              </div>
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
    </div>
  );
};

CitoyenDeclarations.propTypes = {
  isDark: PropTypes.bool.isRequired,
  change_mode: PropTypes.func.isRequired,
  language: PropTypes.object.isRequired,
  change_language: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isDark: state.mode.isDark,
  language: state.language,
});

export default connect(mapStateToProps, { change_mode, change_language })(
  CitoyenDeclarations
);
