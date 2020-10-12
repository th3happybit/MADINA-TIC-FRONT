import React, { useState, useEffect } from "react";
import { Search, Pagination, Segment, Dropdown } from "semantic-ui-react";
import axios from "axios";

//? import css
import "./TestComponent.css";

import TableTestComponent from "./TableTestComponent.jsx";

const TestComponent = (props) => {
  const {
    title,
    status,
    permission,
    url,
    token,
    role,
    header,
    detail,
    isRapport,
  } = props;
  const [term, setTerm] = useState("");
  const [data, setData] = useState([]);
  const [searchLoading, setsearchLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [activeFilter, setactiveFilter] = useState("not_validated");
  const changePage = (e, pageInfo) => {
    setPage(pageInfo.activePage);
  };
  const [sortDate, setsortDate] = useState(null);
  const [sortmobile, setsortMobile] = useState("Aléatoire");
  const [uid, setUID] = useState(null);
  const [pages, setPages] = useState(0);
  const [Loading, setLoading] = useState(false);
  const [orderfield, setOrderField] = useState(null);
  const [loaded, setLoaded] = useState(false);

  const handleRefresh = () => {
    setTerm("");
    setPage(1);
    getData();
  };
  const handlesearch = (e, { value }) => {
    setsearchLoading(true);
    setTerm(value);
    setPage(1);
  };
  const handle_filter = (e, { name }) => {
    setactiveFilter(name);
    setPage(1);
  };
  const handlesortRandom = () => {
    setsortDate(null);
    setsortMobile("Archivé");
    setPage(1);
  };
  const handlesortOldFirst = () => {
    setsortDate("asc");
    setsortMobile("Plus ancien");
    setPage(1);
  };
  const handlesortNewFirst = () => {
    setsortDate("desc");
    setsortMobile("Plus récent");
    setPage(1);
  };
  const handle_StartAtFirst = () => {
    setsortDate("asc");
    setsortMobile("Commencer à (Asc)");
    setOrderField("start_at");
    setPage(1);
  };
  const handle_StartAtLast = () => {
    setsortDate("desc");
    setsortMobile("Commencer à (Desc)");
    setOrderField("start_at");
    setPage(1);
  };
  const handle_EndAtFirst = () => {
    setsortDate("asc");
    setsortMobile("Fin à (Asc)");
    setOrderField("end_at");
    setPage(1);
  };
  const handle_EndAtLast = () => {
    setsortDate("desc");
    setsortMobile("Fin à (Desc)");
    setOrderField("end_at");
    setPage(1);
  };
  function getStatus(st) {
    switch (st) {
      case "not_validated":
        return "Pas validé";
      case "lack_of_info":
        return "Manque d'informations";
      case "published":
        return "Publié";
      case "removed":
        return "Supprimé";
      case "archived":
        return "Archivé";
      case "modified":
        return "Modifié";
      case "work_not_finished":
        return "Travail non terminé";
      case "refused":
        return "Refusé";
      case "validated":
        return "Validé";
      default:
        break;
    }
  }
  function getMonth(month) {
    switch (month) {
      case "01":
        return "Janvier";
      case "02":
        return "Fevrier";
      case "03":
        return "Mars";
      case "04":
        return "Avril";
      case "05":
        return "Mai";
      case "06":
        return "Juin";
      case "07":
        return "Juillet";
      case "08":
        return "Aout";
      case "09":
        return "Septembre";
      case "10":
        return "Octobre";
      case "11":
        return "Novembre";
      case "12":
        return "Decembre";
      default:
        break;
    }
  }
  const colors = {
    lack_of_info: "orange",
    validated: "green",
    modified: "yellow",
    archived: "black",
    removed: "red",
    published: "green",
    not_validated: "blue",
  };
  const getUserId = () => {
    let url = `https://madina-tic.ml/api/user/`;
    axios
      .create({
        headers: {
          get: {
            "Content-Type": "application/json",
            Authorization: `Token ${localStorage.getItem(token)}`,
          },
        },
      })
      .request({
        url,
        method: "get",
      })
      .then((res) => {
        setUID(res.data.uid);
      })
      .catch((err) => {
      });
  };
  const getData = () => {
    setLoaded(false);
    setData([]);
    let ord = "";
    if (sortDate) {
      sortDate === "asc"
        ? (ord = String(orderfield))
        : (ord = "-" + String(orderfield));
    }
    setLoading(true);
    let lastUrl =
      permission === "self"
        ? `${url}?search=${term}&status=${activeFilter}&ordering=${ord}&${role}=${uid}&page=${page}`
        : `${url}?search=${term}&status=${activeFilter}&ordering=${ord}&page=${page}`;

    axios
      .create({
        headers: {
          get: {
            "Content-Type": "application/json",
            Authorization: `Token ${localStorage.getItem(token)}`,
          },
        },
        params: {
          search: term,
        },
      })
      .request({
        url: lastUrl,
        method: "get",
      })
      .then((res) => {
        setLoaded(true);
        if (res.data.count % 10 === 0) {
          setPages(parseInt(res.data.count / 10));
        } else {
          setPages(parseInt(res.data.count / 10) + 1);
        }
        setData(res.data.results);
        setLoading(false);
        setsearchLoading(false);
      })
      .catch((err) => {
      });
  };
  useEffect(() => {
    if (uid) {
      getData();
    } else {
      if (permission === "self") {
        getUserId();
      } else {
        getData();
      }
    }
    if (role === "maire") {
      getUserId();
    }
    return () => {
      setData([]);
    };
  }, [term, activeFilter, sortDate, role, permission, uid, orderfield, page]);

  return (
    <div className="service_rapports _service_declarations">
      <div className="_main_header">
        <div className="title_segment">
          <p className="extra-text text-default">{title}</p>
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
            loading={searchLoading}
            input={{
              icon: "search",
              iconPosition: "right",
              disabled:
                data.length < 1 && (term === null || term === "")
                  ? true
                  : false,
            }}
            placeholder={
              isRapport
                ? "Recherche des rapports ..."
                : "Recherche des announces ..."
            }
          />
          <Dropdown
            className="icon filter_declaration _mobile"
            icon="angle down"
            text={sortmobile}
            button
            selection
            labeled
          >
            <Dropdown.Menu>
              <Dropdown.Item text="Aléatoire" onClick={handlesortRandom} />
              {isRapport ? (
                <>
                  <Dropdown.Item
                    text="Plus récent"
                    onClick={handlesortNewFirst}
                  />
                  <Dropdown.Item
                    text="Plus ancien"
                    onClick={handlesortOldFirst}
                  />
                </>
              ) : (
                <>
                  <Dropdown.Item
                    text="Commencer à (asc)"
                    onClick={handle_StartAtFirst}
                  />
                  <Dropdown.Item
                    text="Commencer à (desc)"
                    onClick={handle_StartAtLast}
                  />
                  <Dropdown.Item
                    text="Fin à (asc)"
                    onClick={handle_EndAtFirst}
                  />
                  <Dropdown.Item
                    text="Fin à (desc)"
                    onClick={handle_EndAtLast}
                  />
                </>
              )}
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown
            className="icon filter_declaration"
            icon="angle down"
            text={getStatus(activeFilter)}
            button
            selection
            labeled
          >
            <Dropdown.Menu>
              {status.map((elm, index) => (
                <Dropdown.Item
                  text={getStatus(elm)}
                  name={elm}
                  onClick={handle_filter}
                  label={{ circular: true, color: colors[elm], empty: true }}
                />
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </div>
        {data.length > 0 ? (
          <div className="_data_section">
            <TableTestComponent
              header={header}
              detail={detail}
              data={data}
              setOrderField={setOrderField}
              orderfield={orderfield}
              sortdate={sortDate}
              refresh={handleRefresh}
              setsortDate={setsortDate}
              isRapport={isRapport}
              title={title}
              token={token}
              url={url}
              uid={uid}
              role={role}
              activeFilter={activeFilter}
              getMonth={getMonth}
              getStatus={getStatus}
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
          <>
            {loaded && (
              <p class="zero-data">
                {isRapport
                  ? "Désolé Aucun rapport à afficher dans cette section"
                  : "Désolé Aucune annonce à afficher dans cette section"}
              </p>
            )}
          </>
        )}
      </Segment>
    </div>
  );
};

export default TestComponent;
