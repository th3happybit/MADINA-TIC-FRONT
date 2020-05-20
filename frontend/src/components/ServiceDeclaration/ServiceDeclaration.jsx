/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import axios from "axios";
import { Segment, Search, Dropdown, Pagination } from "semantic-ui-react";

import DeclarationsTable from "../ServiceDeclarationsTable/ServiceDeclarationsTable.jsx";
import "./ServiceDeclaration.css";
import { useState } from "react";
import { useEffect } from "react";

const ServiceDeclaration = (props) => {

    const [activeFilter, setactiveFilter] = useState("Validated");
    const [Loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [Data, setData] = useState([]);
    const [pages, setPages] = useState(0);
    const [perm, setPerm] = useState(false);
    const [term, setTerm] = useState(null);
    const [sortmobile, setsortMobile] = useState("Random")
    const [searchLoading, setsearchLoading] = useState(false);
    const [sortDate, setsortDate] = useState(null);
    const [types, settypes] = useState([]);
    const [id, setId] = useState(null);

    const handle_filter = (e) => {
        setactiveFilter(e.currentTarget.children[1].textContent);
        setPage(1);
    };
    const handlesearch = (e) => {
        setsearchLoading(true);
        setTerm(e.currentTarget.value);
        setPage(1);
    };
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
    const changePage = (e, pageInfo) => {
        setPage(pageInfo.activePage);
    };
    const getData = (sid) => {
        setData([])
        setLoading(true);
        const pa = {
            page: page,
            service : sid,
        }
        if (term) {
            pa["search"] = term;
        }
        if (sortDate) {
            if (sortDate === "asc") pa["ordering"] = "validated_at"
            else pa["ordering"] = "-validated_at"
        }
        switch (activeFilter) {
            case "Validated":
                pa["status"] = "validated";
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
        if (sid)
        axios
            .get("http://157.230.19.233/api/declarations/", {
                params: pa,
                headers: {
                    "content-type": "application/json",
                    Authorization: `Token ${localStorage.getItem("service_token")}`
                }
            })
            .then((res) => {
                setData(res.data.results);
                setLoading(false);
                if (res.data.count % 10 === 0) {
                    setPages(parseInt(res.data.count / 10));
                } else {
                    setPages(parseInt(res.data.count / 10) + 1);
                }
                if (res.data.count === 0) {
                    setPerm(true);
                    //   setAllow(true);
                    setsearchLoading(false);
                }
                setLoading(false);
            })
            .catch((err) => {
            })
    };
    const getTypes = (sid) => {
        setLoading(true)
        axios
            .get("http://157.230.19.233/api/declarations_types/", {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Token ${localStorage.getItem("maire_token")}`,
                },
            })
            .then((res) => {
                getData(sid);
                settypes(res.data);
            })
            .catch((err) => {
            });
    };

    useEffect(() => {
        axios
        .create({
        headers: {
            get: {
                "Content-Type": "application/json",
                Authorization: `Token ${localStorage.getItem("service_token")}`,
            },
        },
        })
        .request({
        url: "http://157.230.19.233/api/user/",
            method: "get",
        })
        .then((res) => {
            setId(res.data.uid);
            getTypes(res.data.uid);
        })
    }, [])
    useEffect(() => {
        if (id)
        getData(id)
    }, [page, term, sortDate, sortmobile, activeFilter])
    return (
        <div className="_service_declarations">
            <div className="_main_header">
                <div className="title_segment">
                    <p className="extra-text text-default">Declarations</p>
                </div>
            </div>
            <Segment className="_main_body shadow" loading={searchLoading ? false : Loading}>
                <div className="row">
                    <Search
                        value={term}
                        onSearchChange={handlesearch}
                        showNoResults={false}
                        results={null}
                        input={{
                            icon: "search",
                            iconPosition: "left",
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
                        text={sortmobile}
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
                                text="Archived"
                                onClick={handle_filter}
                                label={{ circular: true, color: "black", empty: true }}
                            />
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
                {Data.length > 0 ?
                    <>
                        <DeclarationsTable
                            data={Data}
                            filter={activeFilter}
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
                        /></>
                    :
                    perm && (
                        <p class="zero-data">
                            Sorry No declarations to display in this section
                        </p>
                    )
                }
            </Segment>
        </div>)

}

export default ServiceDeclaration;