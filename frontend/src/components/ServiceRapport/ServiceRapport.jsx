import React, { useState, useEffect } from "react";
import axios from "axios";
import TableServiceRapport from "./TableServiceRapport.jsx";

//? import css
import "./ServiceRapport.css";
import { Search, Pagination, Segment, Dropdown } from "semantic-ui-react";

const ServiceRapport = () => {
  const [data, setData] = useState("");
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(0);
  const [term, setTerm] = useState("");
  const [searchLoading, setsearchLoading] = useState(false);
  const [Loading, setLoading] = useState(true);
  const [sortmobile, setsortMobile] = useState("Random");
  const [activeFilter, setactiveFilter] = useState("validated");
  const [sortDate, setsortDate] = useState(null);

  const changePage = (e, pageInfo) => {
    setPage(pageInfo.activePage);
  };
  const handle_filter = (e) => {
    setactiveFilter(e.currentTarget.children[1].textContent);
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
  const handlesearch = (e, { value }) => {
    setsearchLoading(true);
    setTerm(value);
  };
  useEffect(() => {
    let ord = "";
    if (sortDate) {
      if (sortDate === "asc") ord = "validated_at";
      else ord = "-validated_at";
    }
    setLoading(true);
    let url = `http://157.230.19.233/api/reports/?search=${term}&status=${activeFilter}&ordering=${ord}`;
    axios
      .create({
        headers: {
          get: {
            "Content-Type": "application/json",
            Authorization: `Token ${localStorage.getItem("service_token")}`,
          },
        },
        params: {
          search: term,
        },
      })
      .request({
        url,
        method: "get",
      })
      .then((res) => {
        console.log({ res });
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
  }, [term, activeFilter, sortDate]);
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
  return (
    <div className="service_rapports _service_declarations">
      <div className="_main_header">
        <div className="title_segment">
          <p className="extra-text text-default">Rapports</p>
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
              <Dropdown.Item
                text="not_validated"
                onClick={handle_filter}
                label={{ circular: true, color: "orange", empty: true }}
              />
              <Dropdown.Item
                text="lack_of_info"
                onClick={handle_filter}
                label={{ circular: true, color: "yellow", empty: true }}
              />
              <Dropdown.Item
                text="work_not_finished"
                onClick={handle_filter}
                label={{ circular: true, color: "purple", empty: true }}
              />
              <Dropdown.Item
                text="validated"
                onClick={handle_filter}
                label={{ circular: true, color: "green", empty: true }}
              />
              <Dropdown.Item
                text="refused"
                onClick={handle_filter}
                label={{ circular: true, color: "red", empty: true }}
              />{" "}
              <Dropdown.Item
                text="archived "
                onClick={handle_filter}
                label={{ circular: true, color: "black", empty: true }}
              />
            </Dropdown.Menu>
          </Dropdown>
        </div>
        {data.length > 0 ? (
          <>
            <TableServiceRapport
              data={data}
              handlesortDate={handle_sort_date}
              sortdate={sortDate}
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
          <p class="zero-data">
            Sorry No declarations to display in this section
          </p>
        )}
      </Segment>
    </div>
  );
};

export default ServiceRapport;
