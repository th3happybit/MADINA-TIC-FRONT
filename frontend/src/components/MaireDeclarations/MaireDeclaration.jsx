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
    const [names, setNames] = useState([]);
    const [allow, setAllow] = useState(false)


    const getUser = (id, key) => {
        axios
            .get("http://157.230.19.233/api/users/" + id + "/", {
                headers: {
                    "content-type": "application/json",
                    Authorization: `Token ${localStorage.getItem("maire_token")}`
                }
            })
            .then((res) => {
                const temp = names;
                temp[key] = res.data.last_name + " " + res.data.first_name
                setNames(temp);
                if (names.filter(String).length - Data.length === 0)
                    setLoading(false)
            })
            .catch((err) => {
                console.log(err)
            })
    }
    const getNames = () => {
        setNames([]);
        for (let i = 0; i < Data.length; i++) {
            getUser(Data[i].citizen, i)
        }
    }
    const handlesortOldFirst = () => {
        setsortDate("asc");
        setsortMobile("Old first");
        setPage(1);
    }
    const handlesortNewFirst = () => {
        setsortDate("desc")
        setsortMobile("Newer first");
        setPage(1);
    }
    const handle_sort_date = () => {
        if (sortDate === "asc") {
            setsortDate("desc");
            setPage(1);
        }
        else if (sortDate === "desc") {
            setsortDate(null);
            setPage(1);
        }
        else {
            setsortMobile("Random")
            setPage(1);
            setsortDate("asc");
        }
    }
    const handle_filter = (e) => {
        setactiveFilter(e.currentTarget.children[1].textContent);
        setPage(1);
    }
    const handlesearch = (e) => {
        setsearchLoading(true);
        setTerm(e.currentTarget.value);
        setPage(1);
    }
    const getData = () => {
        setLoading(true);
        const pa = {
            page: page,
        }
        if (term) {
            pa["search"] = term;
        }
        if (sortDate) {
            if (sortDate === "asc") pa["ordering"] = "created_on"
            else pa["ordering"] = "-created_on"
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
                    Authorization: `Token ${localStorage.getItem("maire_token")}`
                }
            })
            .then((res) => {
                setLoading(false);
                if (res.data.count % 10 === 0) {
                    setPages(parseInt(res.data.count / 10));
                } else {
                    setPages(parseInt(res.data.count / 10) + 1);
                }
                if (res.data.count === 0) {
                    setPerm(true);
                    setAllow(true);
                    setsearchLoading(false);
                }
                let data = res.data.results;
                let tempArr = [];
                data.map((elm, index) => {
                    axios
                        .get(`http://157.230.19.233/api/users/${elm.citizen}`, {
                            headers: {
                                "content-type": "application/json",
                                Authorization: `Token ${localStorage.getItem("token")}`,
                            },
                        })
                        .then((res) => {
                            let element = elm;
                            element["first_name"] = res.data.first_name;
                            element["last_name"] = res.data.last_name;
                            tempArr.push(element);
                        })
                        .catch((err) => {
                            console.log(err.response);
                        });
                });
                setData(tempArr);
            })
            .catch ((err) => {
    console.log(err)
})

    }
const getTypes = () => {
    axios
        .get("http://157.230.19.233/api/declarations_types/", {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${localStorage.getItem("token")}`,
            }
        })
        .then((res) => {
            getData();
            settypes(res.data);
        })
        .catch((err) => {
            console.log(err)
        })
}
const updateDecStatus = (data, did) => {
    axios
        .patch("http://157.230.19.233/api/declarations/" + did + "/", {
            headers: {
                "content-type": "application/json",
                Authorization: `Token ${localStorage.getItem("maire_token")}`,
            },
            data: data
        })
        .then((res) => {
        })
        .catch((err) => {
            console.log(err);
        })
}
const addRejection = (data) => {
    axios
        .post("http://157.230.19.233/api/declarations_rejection/", {
            headers: {
                "content-type": "application/json",
                Authorization: `Token ${localStorage.getItem("maire_token")}`
            },
            data: data,
        })
        .then((res) => {
        })
        .catch((err) => {
            console.log(err)
        })
}
const addComplement = (data) => {
    axios
        .post("http://157.230.19.233/api/declarations_complement_demand/", {
            headers: {
                "content-type": "application/json",
                Authorization: `Token ${localStorage.getItem("maire_token")}`,
            },
            data: data,
        })
        .then((res) => {
        })
        .catch((err) => {
            console.log(err)
        })
}
const rejectDeclaration = (decData, reason) => {
    decData["reason"] = reason;
    const data = {
        title: decData.title, desc: decData.desc, citizen: decData.citizen,
        dtype: decData.dtype, status: "rejected"
    }
    const rejectionData = { maire: decData.maire, declaration: decData.did, reason: reason }
    updateDecStatus(data, decData.did)
    addRejection(rejectionData);
}
const demandComplement = (decData, reason) => {
    decData["reason"] = reason;
    const data = {
        title: decData.title, desc: decData.desc, citizen: decData.citizen,
        dtype: decData.dtype, status: "lack_of_infos"
    }
    const complementData = { maire: decData.maire, declaration: decData.did, reason: reason }
    updateDecStatus(data, decData.did)
    addComplement(complementData);
}
const archiveDeclaration = (decData) => {
    const data = {
        title: decData.title, desc: decData.desc, citizen: decData.citizen,
        dtype: decData.dtype, status: "lack_of_infos"
    }
    updateDecStatus(data, decData.did)
}
const changePage = (e, pageInfo) => {
    setPage(pageInfo.activePage)
}
useEffect(() => {
    getTypes();
}, [page, activeFilter, term, sortDate]);

return (
    <div className="_maire_declarations">
        <div className="_main_header">
            <div className="title_segment">
                <p className="extra-text text-default">Declarations</p>
            </div>
        </div>
        <Segment
            loading={!allow ? true : Loading}
            className="_main_body shadow">
            <div className="row">
                <Search
                    loading={searchLoading}
                    onSearchChange={handlesearch}
                    value={term}
                    showNoResults={false}
                    results={null}
                    input={{
                        icon: "search", iconPosition: "right", disabled:
                            ((Data.length < 1) && ((term === null) || (term === ""))) ? true : false
                    }}
                    placeholder="Search for declarations ..." />
                <Dropdown className="icon filter_declaration _mobile"
                    icon="angle down"
                    text={sortMobile}
                    button
                    selection
                    labeled
                >
                    <Dropdown.Menu>
                        <Dropdown.Item
                            text="Randomly"
                            onClick={() => setsortDate(null)}
                        />
                        <Dropdown.Item
                            text="Newer first"
                            onClick={handlesortNewFirst}
                        />
                        <Dropdown.Item
                            text="Old first"
                            onClick={handlesortOldFirst}
                        />
                    </Dropdown.Menu>
                </Dropdown>
                <Dropdown className="icon filter_declaration"
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
            {
                ((Data.length > 0) && (allow) ?
                    <>
                        <MaireDeclarationTable
                            data={Data}
                            names={names}
                            filter={activeFilter}
                            handlesortDate={handle_sort_date}
                            sortdate={sortDate}
                            rejectDeclaration={rejectDeclaration}
                            demandComplement={demandComplement}
                            archiveDeclaration={archiveDeclaration}
                            types={types}
                            maire={props.maire}
                        />
                        <Pagination className="_maire_pagination"
                            boundaryRange={0}
                            activePage={page}
                            onPageChange={changePage}
                            firstItem={null}
                            lastItem={null}
                            totalPages={pages}
                            pointing
                            secondary />
                    </> : (perm && <p class="zero-data">Sorry No declarations to display in this section</p>))}
        </Segment>
    </div>)
}

export default MaireDeclarations;