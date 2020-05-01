import React ,{useState, useEffect} from "react";
import {Divider, Dropdown, Pagination} from "semantic-ui-react";
import axios from "axios";

import CitoyenList from "../../components/AdminCitoyenList/AdminCitoyenList.jsx";

import "./AdminCitoyen.css"; 

// import Alex from "../../assets/images/alex.jpg";



// const data = [
//     {
//       uid : "45646-dqsd5-qsojdoizajkdop",
//       picture: Alex,
//       first_name: "Moncef",
//       last_name: "Reggam",
//       email: "m.reggam@esi-sba.dz",
//       address: "Guelma ,cité 202",
//       role: "Citizen",
//       phone: "055555555",
//       date_inscription: "0001-01-01",
//       is_approved : false,
//     },
//     {
//       uid : "45646-dqsd5-delaa3333izajkdop",
//       picture: Alex,
//       first_name: "Bengoudifa",
//       last_name: "Oussama",
//       email: "o.bengoudifa@esi-sba.dz",
//       address: "Mosta , rue 2222 logts",
//       role: "Citizen",
//       date_inscription: "0001-02-02",
//       is_approved : true
//     },
//   ];


const AdminCitoyen = (props) => {

    const [isloading, setisloading] = useState(false);
    const [Data, setData] = useState([]);

    // setData(data)

    useEffect(() => {
        axios
        .get( "http://13.92.195.8/api/users/",{
            header : {
                "Content-Type": "application/json",
                Authorization: `Token ${localStorage.getItem("admin_token")}`
            }
        })
        .then((res) => {
            setData(res.data.results)
            let len_pag = parseInt(res.count / 6);
            if (res.count % len_pag > 0) len_pag++
            setisloading(false)
            
        })
        .catch((err) => {
            console.log(err.response)
        })
    })

    const [allUsers, setallUsers] = useState(true);
    const [validatedOnly, setvalidatedOnly] = useState(false);
    const [notValidatedOnly, setnotValidatedOnly] = useState(false);

    const handel_all = () => {
        setallUsers(true);
        setnotValidatedOnly(false);
        setvalidatedOnly(false);
        console.log("Click handeled");
    }

    const handel_onlyvalidated = () => {
        setallUsers(false);
        setnotValidatedOnly(false);
        setvalidatedOnly(true);
        console.log("Click handeled");
    }

    const handel_notvalidated = () => {
        setallUsers(false);
        setnotValidatedOnly(true);
        setvalidatedOnly(false);
        console.log("Click handeled");
    }

    return (
        <div className="_admin_accounts shadow">
                <div className="row">
                <div className="title_segment">
                <p className="extra-text text-default">Citoyens List</p>
                </div>
                <div className="">
                    
                <Dropdown
                    text='Filter'
                    icon='filter'
                    floating
                    labeled
                    button
                    className='icon'
                >
                    <Dropdown.Menu>
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
            <Divider className="divide_head">{}</Divider>
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
                ellipsisItem={null}
                firstItem={null}
                lastItem={null}
                siblingRange={1}
                totalPages={1}
            />
            </div>)}
            
        
        </div>
    )
}

export default AdminCitoyen;