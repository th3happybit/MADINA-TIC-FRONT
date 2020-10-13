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
  const [activeFilter, setactiveFilter] = useState(props.language.isFrench ? "Nouvelles déclarations" : "تصريحات جديدة");
  const [Loading, setLoading] = useState(true);
  const [Data, setData] = useState(null);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(0);
  const [term, setterm] = useState("");
  const [searchLoading, setSearchLoading] = useState(false);
  const [sortType, setsortType] = useState(null);
  const [sortDate, setsortDate] = useState(null);
  const [sortMobile, setsortMobile] = useState(
    props.language.isFrench ? "Aléatoire" : "عشوائي"
  );
  const [userid, setuserid] = useState(null);
  const [types, settypes] = useState([]);
  const [perm, setperm] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const { isDark } = props;

  const handlemobileTypeSortAZ = () => {
    setsortDate(null);
    setPage(1);
    setsortType("asc");
    props.language.isFrench
      ? setsortMobile("Par type")
      : setsortMobile("حسب النوع");
  };
  const handlemobileNewFirst = () => {
    setsortType(null);
    setPage(1);
    setsortDate("desc");
    props.language.isFrench
      ? setsortMobile("Par date (Asc)")
      : setsortMobile("الأحدث");
  };
  const handlemobileOldFirst = () => {
    setsortType(null);
    setPage(1);
    setsortDate("asc");
    props.language.isFrench
      ? setsortMobile("Par date (Desc)")
      : setsortMobile("الأقدم");
  };
  const handleRandomSort = () => {
    setsortType(null);
    setsortType(null);
    props.language.isFrench
      ? setsortMobile("Aléatoire")
      : setsortMobile("عشوائي");
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
        url: "https://madina-tic.ml/api/user/",
        method: "get",
      })
      .then((res) => {
        setuserid(res.data.uid);
        getdecTypes();
      })
      .catch((err) => {
      });
  };
  const getdecTypes = () => {
    axios
      .get("https://madina-tic.ml/api/declarations_types/", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        settypes(res.data);
      })
      .catch((err) => {
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
      pa["ordering"] = "dtype";
    }
    switch (activeFilter) {
      case "Nouvelles déclarations":
        pa["status"] = "not_validated";
        break;
      case "تصريحات جديدة":
        pa["status"] = "not_validated";
        break;
      case "Manque d'informations":
        pa["status"] = "lack_of_info";
        break;
      case "معلومات غير كافية":
        pa["status"] = "lack_of_info";
        break;
      case "Validées":
        pa["status"] = "validated";
        break;
      case "تم التحقق من صحتها":
        pa["status"] = "validated";
        break;
      case "Refusées":
        pa["status"] = "refused";
        break;
      case "مرفوضة":
        pa["status"] = "refused";
        break;
      case "En cours":
        pa["status"] = "under_treatment";
        break;
      case "في تقدم":
        pa["status"] = "under_treatment";
        break;
      case "Traitées":
        pa["status"] = "treated";
        break;
      case "معالجة":
        pa["status"] = "treated";
        break;
      case "Archivées":
        pa["status"] = "archived";
        break;
      case "مؤرشفة":
        pa["status"] = "archived";
        break;
      case "Brouillons":
        pa["status"] = "draft";
        break;
      case "مسودات":
        pa["status"] = "draft";
        break;
      default:
        break;
    }
    if (term) pa["search"] = term;
    pa["citizen"] = userid;

    axios
      .get("https://madina-tic.ml/api/declarations/", {
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
        "https://madina-tic.ml/api/declarations/" + String(id) + "/",
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
    <div
      className={`_main_declaration ${props.language.isFrench ? "" : "rtl"} ${
        isDark ? "dark" : ""
      }`}
    >
      <Segment
        className={`_main_declaration_right shadow ${isDark ? "dark" : ""}`}
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
                className={
                  activeFilter === "Nouvelles déclarations" ||
                  activeFilter === "تصريحات جديدة"
                    ? "_active"
                    : ""
                }
              >
                {props.language.isFrench
                  ? "Nouvelles déclarations"
                  : "تصريحات جديدة"}
              </Button>
              <Button
                onClick={handleFilter}
                className={
                  activeFilter === "En cours" || activeFilter === "في تقدم"
                    ? "_active"
                    : ""
                }
              >
                {props.language.isFrench ? "En cours" : "في تقدم"}
              </Button>
              <Button
                onClick={handleFilter}
                className={
                  activeFilter === "Validées" ||
                  activeFilter === "تم التحقق من صحتها"
                    ? "_active"
                    : ""
                }
              >
                {props.language.isFrench ? "Validées" : "تم التحقق من صحتها"}
              </Button>
              <Button
                onClick={handleFilter}
                className={
                  activeFilter === "Traitées" || activeFilter === "معالجة"
                    ? "_active"
                    : ""
                }
              >
                {props.language.isFrench ? "Traitées" : "معالجة"}
              </Button>
              <Button
                onClick={handleFilter}
                className={
                  activeFilter === "Refusées" || activeFilter === "مرفوضة"
                    ? "_active"
                    : ""
                }
              >
                {props.language.isFrench ? "Refusées" : "مرفوضة"}
              </Button>
              <Button
                onClick={handleFilter}
                className={
                  activeFilter === "Archivées" || activeFilter === "مؤرشفة"
                    ? "_active"
                    : ""
                }
              >
                {props.language.isFrench ? "Archivées" : "مؤرشفة"}
              </Button>
              <Button
                onClick={handleFilter}
                className={
                  activeFilter === "Manque d'informations" ||
                  activeFilter === "معلومات غير كافية"
                    ? "_active"
                    : ""
                }
              >
                {props.language.isFrench
                  ? "Manque d'informations"
                  : "معلومات غير كافية"}
              </Button>
              <Button
                onClick={handleFilter}
                className={
                  activeFilter === "Draft" || activeFilter === "مسودات"
                    ? "_active"
                    : ""
                }
              >
                {props.language.isFrench ? "Brouillons" : "مسودات"}
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
                    text={props.language.isFrench ? "En cours" : "في تقدم"}
                    onClick={handleFilter}
                  />
                  <Dropdown.Item
                    text={
                      props.language.isFrench
                        ? "Validées"
                        : "تم التحقق من صحتها"
                    }
                    onClick={handleFilter}
                  />
                  <Dropdown.Item
                    text={props.language.isFrench ? "Traitées" : "معالجة"}
                    onClick={handleFilter}
                  />
                  <Dropdown.Item
                    text={props.language.isFrench ? "Refusées" : "مرفوضة"}
                    onClick={handleFilter}
                  />
                  <Dropdown.Item
                    text={props.language.isFrench ? "Archivées" : "مؤرشفة"}
                    onClick={handleFilter}
                  />
                  <Dropdown.Item
                    text={
                      props.language.isFrench
                        ? "Manque d'informations"
                        : "معلومات غير كافية"
                    }
                    onClick={handleFilter}
                  />
                  <Dropdown.Item
                    text={props.language.isFrench ? "Brouillons" : "مسودات"}
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
                  <Dropdown.Item
                    text={props.language.isFrench ? "Aléatoire" : "عشوائي"}
                    onClick={handleRandomSort}
                  />
                  <Dropdown.Item
                    text={props.language.isFrench ? "Par type" : "حسب النوع"}
                    onClick={handlemobileTypeSortAZ}
                  />
                  <Dropdown.Item
                    text={props.language.isFrench ? "Par date (Asc)" : "الأحدث"}
                    onClick={handlemobileNewFirst}
                  />
                  <Dropdown.Item
                    text={
                      props.language.isFrench ? "Par date (Desc)" : "الأقدم"
                    }
                    onClick={handlemobileOldFirst}
                  />
                </Dropdown.Menu>
              </Dropdown>
            </div>
            {Data.length > 0 ? (
              <div
                className={`_data_section ${
                  props.language.isFrench ? null : "rtl"
                } ${isDark ? "dark" : null}`}
              >
                <DecTable
                  data={Data}
                  filter={activeFilter}
                  refresh={getDeclarations}
                  handlesortDate={handle_sort_date}
                  handlesortType={handle_sort_type}
                  sorttype={sortType}
                  sortdate={sortDate}
                  types={types}
                  isDark={props.isDark}
                  handledelete={deleteDeclaration}
                  language={props.language}
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
                    {props.language.isFrench
                      ? "Désolé, cette section ne contient aucun informations"
                      : "للأسف، هذه الصفحة لا تحتوي على معلومات"}
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
