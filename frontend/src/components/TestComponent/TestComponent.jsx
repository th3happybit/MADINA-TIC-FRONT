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
  const [sortDate, setsortDate] = useState("asc");
  const [sortmobile, setsortMobile] = useState("Random");
  const [uid, setUID] = useState(null);
  const [pages, setPages] = useState(0);
  const [Loading, setLoading] = useState(false);
  const [orderfield, setOrderField] = useState("title");
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

  const colors = [
    "red",
    "orange",
    "yellow",
    "olive",
    "green",
    "teal",
    "blue",
    "violet",
    "purple",
    "pink",
    "brown",
    "grey",
    "black",
  ];
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
        getData();
      }
    }
    return () => {
      setData([]);
    };
  }, [term, activeFilter, sortDate, permission, uid]);
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
              iconPosition: "left",
              disabled:
                data.length < 1 && (term === null || term === "")
                  ? true
                  : false,
            }}
            placeholder="Search for rapports ..."
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
              <Dropdown.Item text="Randomly" onClick={handlesortRandom} />
              <Dropdown.Item text="Newer first" onClick={handlesortNewFirst} />
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
              {status.map((elm, index) => (
                <Dropdown.Item
                  text={elm}
                  name={elm}
                  onClick={handle_filter}
                  label={{ circular: true, color: colors[index], empty: true }}
                />
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </div>
        {data.length > 0 ? (
          <>
            <TableTestComponent
              header={header}
              detail={detail}
              data={data}
              setOrderField={setOrderField}
              sortdate={sortDate}
              refresh={handleRefresh}
              setsortDate={setsortDate}
              isRapport={isRapport}
              title={title}
              token={token}
              url={url}
              role={role}
              activeFilter={activeFilter}
            />
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
          </>
        ) : (
          <>
            {loaded && (
              <p class="zero-data">
                Sorry No declarations to display in this section
              </p>
            )}
          </>
        )}
      </Segment>
    </div>
  );
};

export default TestComponent;
