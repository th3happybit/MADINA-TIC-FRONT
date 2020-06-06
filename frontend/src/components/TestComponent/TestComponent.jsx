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
  const [sortmobile, setsortMobile] = useState("Random");
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
    setsortMobile("Random");
    setPage(1);
  };
  const handlesortOldFirst = () => {
    setsortDate("asc");
    setsortMobile("Old first");
    setPage(1);
  };
  const handlesortNewFirst = () => {
    setsortDate("desc");
    setsortMobile("Newer first");
    setPage(1);
  };
  const handle_StartAtFirst = () => {
    setsortDate("asc");
    setsortMobile("Start at (Asc)");
    setOrderField("start_at");
    setPage(1);
  };
  const handle_StartAtLast = () => {
    setsortDate("desc");
    setsortMobile("Start at (Desc)");
    setOrderField("start_at");
    setPage(1);
  };
  const handle_EndAtFirst = () => {
    setsortDate("asc");
    setsortMobile("End at (Asc)");
    setOrderField("end_at");
    setPage(1);
  };
  const handle_EndAtLast = () => {
    setsortDate("desc");
    setsortMobile("End at (Desc)");
    setOrderField("end_at");
    setPage(1);
  };
  function getStatus(st) {
    switch (st) {
      case "not_validated":
        return "Not Validated";
      case "lack_of_info":
        return "Lack of info";
      case "published":
        return "Published";
      case "removed":
        return "Removed";
      case "archived":
        return "Archived";
      case "modified":
        return "Modified";
      case "work_not_finished":
        return "Work Not Finished";
      case "refused":
        return "Refused";
      case "validated":
        return "Validated";
      default:
        break;
    }
  }
  function getMonth(month) {
    switch (month) {
      case "01":
        return "January";
      case "02":
        return "February";
      case "03":
        return "March";
      case "04":
        return "April";
      case "05":
        return "May";
      case "06":
        return "June";
      case "07":
        return "July";
      case "08":
        return "August";
      case "09":
        return "September";
      case "10":
        return "October";
      case "11":
        return "November";
      case "12":
        return "December";
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
    let url = `http://157.230.19.233/api/user/`;
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
        console.log(err.response);
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
        ? `${url}?search=${term}&status=${activeFilter}&ordering=${ord}&${role}=${uid}`
        : `${url}?search=${term}&status=${activeFilter}&ordering=${ord}`;

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
          page: page,
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
        console.log({ err: err.response });
      });
  };
  useEffect(() => {
    if (uid) {
      getData();
    } else {
      if (permission === "self") {
        getUserId();
      } else {
        // getData();
      }
    }
    if (role === "maire") {
      getUserId();
    }
    return () => {
      setData([]);
    };
  }, [term, activeFilter, sortDate, role, permission, uid, orderfield]);

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
              isRapport ? "Search for rapports ..." : "Search for announces ..."
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
              <Dropdown.Item text="Random" onClick={handlesortRandom} />
              {isRapport ? (
                <>
                  <Dropdown.Item
                    text="Newer first"
                    onClick={handlesortNewFirst}
                  />
                  <Dropdown.Item
                    text="Old first"
                    onClick={handlesortOldFirst}
                  />
                </>
              ) : (
                <>
                  <Dropdown.Item
                    text="Start at (asc)"
                    onClick={handle_StartAtFirst}
                  />
                  <Dropdown.Item
                    text="Start at (desc)"
                    onClick={handle_StartAtLast}
                  />
                  <Dropdown.Item
                    text="End at (asc)"
                    onClick={handle_EndAtFirst}
                  />
                  <Dropdown.Item
                    text="End at (desc)"
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
                  ? "Sorry No reports to display in this section"
                  : "Sorry No announcements to display in this section"}
              </p>
            )}
          </>
        )}
      </Segment>
    </div>
  );
};

export default TestComponent;
