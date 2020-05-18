/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Segment, Search, Dropdown, Pagination } from "semantic-ui-react";

import MaireDeclarationTable from "../MaireDeclarationTable/MaireDeclarationTable.jsx";
import "./MaireDeclarations.css";
import axios from "axios";

const MaireDeclarations = (props) => {
  const [activeFilter, setactiveFilter] = useState("New Declarations");
  const [Loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [Data, setData] = useState([]);
  const [pages, setPages] = useState(0);
  const [perm, setPerm] = useState(false);
  const [term, setTerm] = useState(null);
  const [searchLoading, setsearchLoading] = useState(false);
  const [sortDate, setsortDate] = useState(null);
  const [sortMobile, setsortMobile] = useState("Random");
  const [types, settypes] = useState(null);
  const [allow, setAllow] = useState(false);
  const [refresh, setRefresh] = useState(false)


  const handlesortRandom = () => {
    setsortDate(null);
    setsortMobile("Random");
    setPage(1);
  }
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
    setactiveFilter(e.currentTarget.children[1].textContent);
    setPage(1);
  };
  const handlesearch = (e) => {
    setsearchLoading(true);
    setTerm(e.currentTarget.value);
    setPage(1);
  };
  const getData = () => {
    setData([]);
    setPerm(false);
    setAllow(false);
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

    axios
      .get("http://157.230.19.233/api/declarations/", {
        params: pa,
        headers: {
          "content-type": "application/json",
          Authorization: `Token ${localStorage.getItem("maire_token")}`,
        },
      })
      .then(async (res) => {
        console.log(res.data)
        if (res.data.count % 10 === 0) {
          setPages(parseInt(res.data.count / 10));
        } else {
          setPages(parseInt(res.data.count / 10) + 1);
        }
        if (res.data.count === 0) {
          setPerm(true);
          setLoading(false)
          setsearchLoading(false);
        }
        let data = res.data.results;
        let tempArr = [];
        data.map(async (elm, index) => {
          let req = await axios.get(
            `http://157.230.19.233/api/users/${elm.citizen}`,
            {
              headers: {
                "content-type": "application/json",
                Authorization: `Token ${localStorage.getItem("maire_token")}`,
              },
            }
          );
          let dataX = await req.data;
          let element = await elm;
          element["first_name"] = await dataX.first_name;
          element["last_name"] = await dataX.last_name;
          await tempArr.push(element);
          if (index + 1 === data.length) {
            await setData(tempArr);
            setAllow(true);
            setLoading(false);
            setsearchLoading(false);
          }
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getTypes = () => {
    setLoading(true)
    axios
      .get("http://157.230.19.233/api/declarations_types/", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${localStorage.getItem("maire_token")}`,
        },
      })
      .then((res) => {
        getData();
        settypes(res.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
  const updateDecStatus = (data, did) => {
    axios
    .create({
      headers : {
        patch : {
          "Content-type" : "application/json",
          Authorization : `Token ${localStorage.getItem("maire_token")}`
        },
      },
    })
    .request("http://157.230.19.233/api/declarations/" + did + "/", {
      method : "patch",
      data : data,
    })
      .then((res) => {
        setRefresh((prevState) => !prevState)
        setPage(1)
      })
      .catch((err) => {
        setRefresh((prevState) => !prevState)
        setPage(1)
        console.log(err);
      });
  };
  const addRejection = (data) => {
    axios
    .create({
      headers : {
        post : {
          "Content-type" : "application/json",
          Authorization : `Token ${localStorage.getItem("maire_token")}`
        },
      },
    })
    .request("http://157.230.19.233/api/declarations_rejection/", {
      method : "post",
      data : data,
    })
      .then((res) => {
        setRefresh((prevState) => !prevState)
        setPage(1)
      })
      .catch((err) => {
        setRefresh((prevState) => !prevState)
        setPage(1)
        console.log(err);
      });
  };
  const addComplement = (data) => {
    axios
      .create({
      headers : {
        post : {
          "Content-type" : "application/json",
          Authorization : `Token ${localStorage.getItem("maire_token")}`
        },
      },
    })
    .request("http://157.230.19.233/api/declarations_complement_demand/", {
      method : "post",
      data : data,
    })
      .then((res) => {
        setRefresh((prevState) => !prevState)
        setPage(1)
      })
      .catch((err) => {
        setRefresh((prevState) => !prevState)
        setPage(1)
        console.log(err);
      });
  };
  const rejectDeclaration = (decData, reason) => {
    decData["reason"] = reason;
    const rejectionData = {
      maire: decData.maire,
      declaration: decData.did,
      reason: reason,
    };
    addRejection(rejectionData);
  };
  const demandComplement = (decData, reason) => {
    decData["reason"] = reason;
    const complementData = {
      maire: decData.maire,
      declaration: decData.did,
      reason: reason,
    };
    addComplement(complementData);
  };
  const archiveDeclaration = (decData) => {
    const data = {
      title: decData.title,
      desc: decData.desc,
      citizen: decData.citizen,
      dtype: decData.dtype,
      status: "archived",
    };
    updateDecStatus(data, decData.did);
  };
  const changePage = (e, pageInfo) => {
    setPage(pageInfo.activePage);
  };
  useEffect(() => {
    getTypes();
  }, [page, activeFilter, term, sortDate, refresh]);

  return (
    <div className="_maire_declarations">
      <div className="_main_header">
        <div className="title_segment">
          <p className="extra-text text-default">Declarations</p>
        </div>
      </div>
      <Segment loading={searchLoading ? false : (Loading)} className="_main_body shadow">
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
            placeholder="Search for declarations ..."
          />
          <Dropdown
            className="icon filter_declaration _mobile"
            icon="angle down"
            text={sortMobile}
            button
            selection
            labeled
          >
            <Dropdown.Menu>
              <Dropdown.Item
                text="Randomly"
                onClick={handlesortRandom}
              />
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
                text="New Declarations"
                onClick={handle_filter}
                label={{ circular: true, color: "blue", empty: true }}
              />
              <Dropdown.Item
                text="Validated"
                onClick={handle_filter}
                label={{ circular: true, color: "green", empty: true }}
              />
              <Dropdown.Item
                text="In progress"
                onClick={handle_filter}
                label={{ circular: true, color: "yellow", empty: true }}
              />
              <Dropdown.Item
                text="Treated"
                onClick={handle_filter}
                label={{ circular: true, color: "green", empty: true }}
              />
              <Dropdown.Item
                text="Refused"
                onClick={handle_filter}
                label={{ circular: true, color: "red", empty: true }}
              />
              <Dropdown.Item
                text="Archived"
                onClick={handle_filter}
                label={{ circular: true, color: "black", empty: true }}
              />
              <Dropdown.Item
                text="Lack of infos"
                onClick={handle_filter}
                label={{ circular: true, color: "orange", empty: true }}
              />
            </Dropdown.Menu>
          </Dropdown>
        </div>
        {(allow)  ? (
          <>
            <MaireDeclarationTable
              data={Data}
              filter={activeFilter}
              handlesortDate={handle_sort_date}
              sortdate={sortDate}
              rejectDeclaration={rejectDeclaration}
              demandComplement={demandComplement}
              archiveDeclaration={archiveDeclaration}
              types={types}
              maire={props.maire}
            />
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
          </>
        ) : (
          perm && (
            <p class="zero-data">
              Sorry No declarations to display in this section
            </p>
          )
        )}
      </Segment>
    </div>
  );
};

export default MaireDeclarations;
