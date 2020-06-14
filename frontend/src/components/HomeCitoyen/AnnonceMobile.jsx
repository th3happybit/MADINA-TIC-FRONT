import React from "react";

import "./AnnonceMobile.css";

import { Segment, Divider, Pagination, Image } from "semantic-ui-react";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";

const AnnonceMobile = (props) => {
 const [Data, setData] = useState([]);
 const [Loading, setLoading] = useState(false);
 const [count, setCount] = useState(0);
 const [page, setPage] = useState(1);

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
 function TimeExtract(date) {
  let ConvertedDate,
   year,
   month,
   day,
   hour,
   minute = "";
  year = date.slice(0, 4);
  month = date.slice(5, 7);
  day = date.slice(8, 10);
  hour = date.slice(11, 13);
  minute = date.slice(14, 16);
  ConvertedDate =
   year +
   " " +
   getMonth(month) +
   " " +
   day +
   " --- " +
   hour +
   ":" +
   minute +
   " +01 GMT";
  return ConvertedDate;
 }
 const changePage = (e, { activePage }) => {
  setPage(activePage);
 };

 useEffect(() => {
  const headers = props.anonyme
   ? {
    "content-type": "application/json",
   }
   : {
    "content-type": "application/json",
    Authorization: `Token ${localStorage.getItem("token")}`,
   };

  const date = new Date();
  let now =
   date.getFullYear() +
   "-" +
   String(date.getMonth() + 1) +
   "-" +
   date.getDate() +
   " " +
   date.getHours() +
   ":" +
   date.getMinutes() +
   ":" +
   date.getSeconds();
  setLoading(true);
  axios
   .get("https://www.madina-tic.ml/api/announce_nested/", {
    params: {
     status: "published",
     page: page,
     start_at_less: now,
     end_at_greater: now,
    },
    headers: headers,
   })
   .then((res) => {
    setData(res.data.results);
    console.log(Data);
    setLoading(false);
    if (res.data.count % 10 === 0) {
     setCount(parseInt(res.data.count / 10));
    } else {
     setCount(parseInt(res.data.count / 10) + 1);
    }
   })
   .catch((err) => {
    console.log(err);
   });
 }, [page]);

 return (
  <>
   <h3 className="text-default _grand_titre">
    Annonces actives
  </h3>
   <Segment className="gis" loading={Loading && Data.length === 0}>
    {Data &&
     Data.map((element, index) => {
      return (
       <Segment className="d-flex bg-white _container_declaration"
        key={index}>
        <>
         <div className="_roww">
          <div class="ui small image"
           style={{
            visibility: element.image ? "visible" : "hidden",
           }}
          >
           <Image
            className="pointer image_dcr "
            src={element.image
             // ? element.image
             //  ? element.image.src
             //  : ""
             // : ""
            }
           />
          </div>
         </div>
         <div className="row">
          <div className="contentt1">
           <h4 className="bold titre_annonce">{element.title}</h4>
           <p className="contentt1">
            {element.service.first_name +
             " " +
             element.service.last_name}
           </p>
           <p className="contentt1">Du : {TimeExtract(element.start_at)}</p>
           <p className="contentt1">Au : {TimeExtract(element.end_at)}</p>
           <p className="contentt1">
            Description :<br /> {element.desc}
           </p>
          </div>
         </div>
        </>
       </Segment>
      );
     })}
   </Segment>
  </>
 );
};

export default AnnonceMobile;
