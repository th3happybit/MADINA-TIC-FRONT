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
    const [url, seturl] = useState("http://13.92.195.8/api/users/");

    const onChange = (e, pageInfos) => {
            setpage(pageInfos.page);
            seturl("http://13.92.195.8/api/users/?page=" + String(page));
    }
    useEffect(() => {
        axios
        .get( "http://13.92.195.8/api/users/",{
            headers : {
                "Content-Type": "application/json",
                Authorization: `Token ${localStorage.getItem("admin_token")}`,
            }
        })
        .then((res) => {
            console.log(res.data)
            setData(res.data.results.filter((user) => {
                return user.role === "Client"
            }))
            if (Data.length % 2 === 0){
                setcount(Data.length / 2)
            }
            else {
                setcount(parseInt(Data.length / 2) + 1)
            }
            setisloading(false);

            
        })
        .catch((err) => {
            console.log(err.response)
        })
    }, [])
    const [allUsers, setallUsers] = useState(true);
    const [validatedOnly, setvalidatedOnly] = useState(false);
    const [notValidatedOnly, setnotValidatedOnly] = useState(false);

    const handel_all = () => {
        setallUsers(true);
        setnotValidatedOnly(false);
        setvalidatedOnly(false);
        setactiveFilter("All Citizens");
        console.log("Click handeled");
    }

    const handel_onlyvalidated = () => {
        setallUsers(false);
        setnotValidatedOnly(false);
        setvalidatedOnly(true);
        setactiveFilter("Approved")
        console.log("Click handeled");
    }

    const handel_notvalidated = () => {
        setallUsers(false);
        setnotValidatedOnly(true);
        setvalidatedOnly(false);
        setactiveFilter("Not Approved")
        console.log("Click handeled");
    }

    return (
        
        <Segment className="_admin_accounts shadow" loading={isloading}>
                <div className="row">
                <div className="title_segment">
                <p className="extra-text text-default">Citizens List</p>
                </div>
                <div className="">
                    
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
            { !isloading &&
            (<div className="row_t">
                <CitoyenList 
                    AllUsers = {allUsers}
                    NotValidatedOnly = {notValidatedOnly}
                    ValidatedOnly = {validatedOnly}
                    data = {Data}
                />
                <Pagination className="_admin_citoyen_pagin"
                boundaryRange={0}
                defaultActivePage={1}
                onChange={onChange}
                firstItem={null}
                lastItem={null}
                totalPages={2}
            />
            </div>)}
            
        
        </Segment>
    )
}

export default AdminCitoyen;