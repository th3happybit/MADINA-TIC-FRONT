/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import {
  Segment,
  Search,
  Dropdown,
  Pagination,
  Button,
  Modal,
} from "semantic-ui-react";

import MaireDeclarationTable from "../MaireDeclarationTable/MaireDeclarationTable.jsx";
import "./MaireDeclarations.css";
import axios from "axios";

//? redux stuff
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { add_parent } from "../../actions/regroupAction.js";

const MaireDeclarations = (props) => {
  const [activeFilter, setactiveFilter] = useState("Nouvelles déclarations");
  const [Loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [Data, setData] = useState([]);
  const [pages, setPages] = useState(0);
  const [perm, setPerm] = useState(false);
  const [term, setTerm] = useState(null);
  const [searchLoading, setsearchLoading] = useState(false);
  const [sortDate, setsortDate] = useState(null);
  const [sortMobile, setsortMobile] = useState("Aléatoire");
  const [types, settypes] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [open, setOpen] = useState(false);
  const [openErr, setOpenErr] = useState(false);

  //? for regroupement
  const [isRegroup, setIsRegroup] = useState(false);
  const handleRegroup = () => {
    setIsRegroup((prevState) => !prevState);
  };

  const fetchRegroupement = () => {
    props.childs.map((elm) => {
      let instance = axios.create({
        baseURL: "https://madina-tic.ml/api/",
        responseType: "json",
        headers: {
          "content-type": "application/json",
          Authorization: `Token ${localStorage.getItem("maire_token")}`,
        },
      });
      let body = {
        parent_declaration: props.parent.did,
        status: elm.status,
        service: elm.service,
      };
      instance
        .patch(`declarations/${elm.did}/`, body)
        .then((res) => {
          setRefresh((prevState) => !prevState);
          props.add_parent(null);
        })
        .catch((err) => {});
    });
  };
  const handlesortRandom = () => {
    setsortDate(null);
    setsortMobile("Aléatoire");
    setPage(1);
  };
  const handlesortOldFirst = () => {
    setsortDate("asc");
    setsortMobile("Date (desc)");
    setPage(1);
  };
  const handlesortNewFirst = () => {
    setsortDate("desc");
    setsortMobile("Date (asc)");
    setPage(1);
  };
  const handle_sort_date = () => {
    if (sortDate === "asc") {
      setsortDate("desc");
      setPage(1);
    } else if (sortDate === "desc") {
      setsortDate(null);
      setPage(1);
    } else {
      setsortMobile("Random");
      setPage(1);
      setsortDate("asc");
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
    setPerm(false);
    setData([]);
    setLoading(true);
    const pa = {
      page: page,
    };
    if (term) {
      pa["search"] = term;
    }
    if (sortDate) {
      if (sortDate === "asc") pa["ordering"] = "created_on";
      else pa["ordering"] = "-created_on";
    }
    switch (activeFilter) {
      case "Nouvelles déclarations":
        pa["status"] = "not_validated";
        break;
      case "Manque d'informations":
        pa["status"] = "lack_of_info";
        break;
      case "Validée":
        pa["status"] = "validated";
        break;
      case "Refusé":
        pa["status"] = "refused";
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
    pa["has_parent"] = false;
    axios
      .get("https://madina-tic.ml/api/declaration_nested/", {
        params: pa,
        headers: {
          "content-type": "application/json",
          Authorization: `Token ${localStorage.getItem("maire_token")}`,
        },
      })
      .then((res) => {
        setData(res.data.results);
        getTypes();
        setLoading(false);
        setsearchLoading(false);
        if (res.data.count % 10 === 0) {
          setPages(parseInt(res.data.count / 10));
        } else {
          setPages(parseInt(res.data.count / 10) + 1);
        }
        if (res.data.count === 0) {
          setPerm(true);
        }
      })
      .catch((err) => {
      });
  };
  const getTypes = () => {
    setLoading(true);
    axios
      .get("https://madina-tic.ml/api/declarations_types/", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${localStorage.getItem("maire_token")}`,
        },
      })
      .then((res) => {
        settypes(res.data);
      })
      .catch((err) => {
      });
  };
  const updateDecStatus = (data, did) => {
    axios
      .create({
        headers: {
          patch: {
            "Content-type": "application/json",
            Authorization: `Token ${localStorage.getItem("maire_token")}`,
          },
        },
      })
      .request("https://madina-tic.ml/api/declarations/" + did + "/", {
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
  const addRejection = (data) => {
    axios
      .create({
        headers: {
          post: {
            "Content-type": "application/json",
            Authorization: `Token ${localStorage.getItem("maire_token")}`,
          },
        },
      })
      .request("https://madina-tic.ml/api/declarations_rejection/", {
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
      .request(
        "https://madina-tic.ml/api/declarations_complement_demand/",
        {
          method: "post",
          data: data,
        }
      )
      .then((res) => {
        setRefresh((prevState) => !prevState);
        setPage(1);
      })
      .catch((err) => {
        setRefresh((prevState) => !prevState);
        setPage(1);
      });
  };
  const rejectDeclaration = (maire, id, reason) => {
    const rejectionData = {
      maire: maire,
      declaration: id,
      reason: reason,
    };
    addRejection(rejectionData);
  };
  const demandComplement = (maire, id, reason) => {
    const complementData = {
      maire: maire,
      declaration: id,
      reason: reason,
    };
    addComplement(complementData);
  };
  const archiveDeclaration = (id) => {
    const data = {
      status: "archived",
    };
    updateDecStatus(data, id);
  };
  const handleAnnule = ()=>{
    setIsRegroup(false);
    setRefresh((prevState) => !prevState);
  }
  const validateDeclaration = (decData, id) => {
    const data = {
      status: "validated",
      service: decData.service,
      validated_at: decData.validated_at,
      priority: decData.priority,
    };
    updateDecStatus(data, id);
  };
  const changePage = (e, pageInfo) => {
    setPage(pageInfo.activePage);
  };
  useEffect(() => {
    setData([]);
    getData();
  }, [page, activeFilter, term, sortDate, refresh]);

  return (
    <div className="_maire_declarations">
      <div className="_main_header">
        <div className="title_segment">
          <p className="extra-text text-default">Declarations</p>
        </div>
      </div>
      <Modal open={open} className="_success_modal info">
        <Modal.Header>Info Message</Modal.Header>
        <Modal.Content>
          <p
            style={{
              fontSize: 18,
              fontWeight: 600,
            }}
            className="text-default"
          >
            First choose the declaration parent
          </p>
        </Modal.Content>
        <Modal.Actions>
          <Button
            className="_primary"
            style={{
              background: "#794b02",
              color: "white",
            }}
            onClick={() => {
              setOpen(false);
            }}
          >
            Got it !
          </Button>
        </Modal.Actions>
      </Modal>

      <Modal open={openErr} className="_success_modal err info">
        <Modal.Header>Err Message</Modal.Header>
        <Modal.Content>
          <p
            style={{
              fontSize: 18,
              fontWeight: 600,
            }}
            className="text-default"
          >
            Please choose the childs before submiting
          </p>
        </Modal.Content>
        <Modal.Actions>
          <Button
            className="_primary"
            style={{
              background: "#794b02",
              color: "white",
            }}
            onClick={() => {
              setOpenErr(false);
            }}
          >
            Got it !
          </Button>
        </Modal.Actions>
      </Modal>
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
            results={null}
            input={{
              icon: "search",
              iconPosition: "right",
              disabled:
                Data.length < 1 && (term === null || term === "")
                  ? true
                  : false,
            }}
            placeholder="Recherche des declarations ..."
          />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {
            activeFilter === "Validée" && (
              <Button
                style={{
                  margin: "0 1rem",
                  background: "var(--secondary)",
                  color: "white",
                }}
                onClick={() => {
                  handleRegroup();
                  if (!props.parent && !props.childs.length > 0 && !isRegroup) {
                    setOpen(true);
                  }
                  if (props.parent && props.childs.length > 0) {
                    setIsRegroup(false);
                  }
                  if (props.parent && props.childs.length === 0) {
                    setOpenErr(true);
                  }
                  if (props.parent && props.childs.length > 0) {
                    fetchRegroupement();
                  }
                }}
              >
                {isRegroup ? "Confirmer" : "Regrouper"}
              </Button>
            )}
            {
              isRegroup && <Button
              onClick={handleAnnule}
              style={{
                marginRight: "1rem",
                background: "var(--primary)",
                color: "white",
              }}
              content="Annuler" />
            }
            <Dropdown
              className="icon filter_declaration _mobile"
              icon="angle down"
              text={sortMobile}
              button
              selection
              labeled
            >
              <Dropdown.Menu>
                <Dropdown.Item text="Randomly" onClick={handlesortRandom} />
                <Dropdown.Item
                  text="Newer first"
                  onClick={handlesortNewFirst}
                />
                <Dropdown.Item text="Old first" onClick={handlesortOldFirst} />
              </Dropdown.Menu>
            </Dropdown>
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
                  text="Nouvelles déclarations"
                  onClick={handle_filter}
                  label={{ circular: true, color: "blue", empty: true }}
                />
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
                  text="Refusé"
                  onClick={handle_filter}
                  label={{ circular: true, color: "red", empty: true }}
                />
                <Dropdown.Item
                  text="Archivé"
                  onClick={handle_filter}
                  label={{ circular: true, color: "black", empty: true }}
                />
                <Dropdown.Item
                  text="Manque d'informations"
                  onClick={handle_filter}
                  label={{ circular: true, color: "orange", empty: true }}
                />
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
        {Data.length > 0
          ? types && (
              <div className="_data_section">
                <MaireDeclarationTable
                  isRegroup={isRegroup}
                  setRefresh={setRefresh}
                  data={Data}
                  filter={activeFilter}
                  handlesortDate={handle_sort_date}
                  sortdate={sortDate}
                  validateDeclaration={validateDeclaration}
                  rejectDeclaration={rejectDeclaration}
                  demandComplement={demandComplement}
                  archiveDeclaration={archiveDeclaration}
                  types={types}
                  maire={props.maire}
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
            )
          : perm && (
              <p class="zero-data">
                Désolé Aucune déclaration à afficher dans cette section{" "}
              </p>
            )}
      </Segment>
    </div>
  );
};

MaireDeclarations.propTypes = {
  parent: PropTypes.string.isRequired,
  childs: PropTypes.array.isRequired,
  add_parent: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  parent: state.regroup.parent,
  childs: state.regroup.childs,
});

export default connect(mapStateToProps, { add_parent })(
  withRouter(MaireDeclarations)
);
