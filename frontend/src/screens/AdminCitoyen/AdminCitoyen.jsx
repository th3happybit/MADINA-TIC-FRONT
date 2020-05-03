/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React ,{useState, useEffect} from "react";
import {Dropdown, Pagination, Segment} from "semantic-ui-react";
import axios from "axios";

import CitoyenList from "../../components/AdminCitoyenList/AdminCitoyenList.jsx";

import "./AdminCitoyen.css"; 


const AdminCitoyen = (props) => {

    const [isloading, setisloading] = useState(true);
    const [Data, setData] = useState([]);
    const [count, setcount] = useState(0);
    const [activeFilter, setactiveFilter] = useState("All Citizens");
    const [page, setpage] = useState(1);
    const [sort, setsort] = useState("Sort");

    const onChange = (e, pageInfo) => {
            setpage(pageInfo.activePage);
    }

    const getData = (p, filter, sortP) => {
        
        let pa = {
            page : p
        }

        if (filter==="Not Approved"){
             pa["is_approved"] = false; 
        }
        else if (filter==="Approved"){
            pa["is_approved"] = true;
        }

        if (sortP==="Name A-Z")
            pa["ordering"] = "first_name"
        else if (sortP==="Name Z-A")
            pa["ordering"] = "-first_name"
        else if (sortP==="Newer First")
            pa["ordering"] = "creation_on"
        else if (sortP==="Oldest First")
            pa["ordering"] = "-creation_on"

        pa["role"] = "Client"
        
        axios
        .get( "http://13.92.195.8/api/users/" , {
            params : pa ,
            headers : {
                "Content-Type": "application/json",
                Authorization: `Token ${localStorage.getItem("admin_token")}`,
            }
        })
        .then((res) => {
            console.log(res)
            setData(res.data.results)
            // console.log(Data)
            // console.log(res.data.count)
            // if ( > 0){
            if (res.data.count % 5 === 0){
                setcount(parseInt(res.data.count / 5))
                console.log(count)
            }
            else {
                setcount(parseInt(res.data.count / 5) + 1)
            }
        // }
        
            setisloading(false);  
        })
        .catch((err) => {
            console.log(err.response)
        })
    }
    useEffect(() => {
        getData(page, activeFilter, sort)
    }, [page, activeFilter, sort])

    const handel_all = () => {
        setactiveFilter("All Citizens");
    }

    const handel_onlyvalidated = () => {
        setactiveFilter("Approved")
    }

    const handel_notvalidated = () => {
        setactiveFilter("Not Approved")
    }

    const sortNameAZ = () =>{
        setsort("Name A-Z");
    }
    const sortNameZA = () => {
        setsort("Name Z-A");
    }
    const sortDateN = () => {
        setsort("Newer First")
    }
    const sortDateO = () => {
        setsort("Oldest First")
    }
    const noSort = () => {
        setsort("Sort");
    }

    return (
        
        <Segment className="_admin_accounts shadow" loading={isloading}>
                <div className="row">
                <div className="title_segment">
                <p className="extra-text text-default">Citizens List</p>
                </div>
                <div className="">

                <div>  
                <Dropdown
                    text={sort}
                    icon='angle down'
                    floating
                    labeled
                    button
                    className='icon filter_admin_citoyen'
                >
                    <Dropdown.Menu id="filter_menu">
                    <Dropdown.Item
                        label={{ color: 'blue', empty: true, circular: true }}
                        text='Random'
                        onClick={noSort}
                    />
                    <Dropdown.Item
                        label={{ color: 'green', empty: true, circular: true }}
                        text='Name A-Z'
                        onClick={sortNameAZ}
                    />
                    <Dropdown.Item
                        label={{ color: 'green', empty: true, circular: true }}
                        text='Name Z-A'
                        onClick={sortNameZA}
                    />
                    <Dropdown.Item
                        label={{ color: 'red', empty: true, circular: true }}
                        text='Date New First'
                        onClick={sortDateN}
                    />
                    <Dropdown.Item
                        label={{ color: 'red', empty: true, circular: true }}
                        text='Date Old first'
                        onClick={sortDateO}
                    />
                    </Dropdown.Menu>
                </Dropdown>
                <Dropdown
                    text={activeFilter}
                    icon='angle down'
                    floating
                    labeled
                    button
                    className='icon filter_admin_citoyen'
                >
                    <Dropdown.Menu id="filter_menu">
                    <Dropdown.Item
                        label={{ color: 'blue', empty: true, circular: true }}
                        text='All Users'
                        onClick={handel_all}
                    />
                    <Dropdown.Item
                        label={{ color: 'green', empty: true, circular: true }}
                        text='Approved'
                        onClick={handel_onlyvalidated}
                    />
                    <Dropdown.Item
                        label={{ color: 'red', empty: true, circular: true }}
                        text='Not Approved'
                        onClick={handel_notvalidated}
                    />
                    </Dropdown.Menu>
                </Dropdown>
                </div>


                </div>
            </div>
            { !isloading &&
            (<div className="row_t">
                <CitoyenList 
                    data = {Data}
                />
                <Pagination className="_admin_citoyen_pagin"
                boundaryRange={0}
                activePage={page}
                onPageChange={onChange}
                firstItem={null}
                lastItem={null}
                totalPages={count}
            />
            </div>)}
            
        
        </Segment>
    )
}

export default AdminCitoyen;