import React from "react";

import "./AnnonceHome.css";
import { Segment, Divider, Pagination } from "semantic-ui-react";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";

const AnnonceHome = (props) => {
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
    const date = new Date();
    let now =
      date.getFullYear() +
      "-" +
      String(date.getMonth() + 1) +
      "-" +
      date.getDay() +
      " " +
      date.getHours() +
      ":" +
      date.getMinutes() +
      ":" +
      date.getSeconds();
    setLoading(true);
    console.log(now);
    axios
      .get("http://157.230.19.233/api/announces/", {
        params: {
          status: "published",
          page: page,
          start_at_less: now,
          end_at_greater: now,
        },
        headers: {
          "content-type": "application/json",
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log(res);
        setData(res.data.results);
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
    <Segment className="_annonce_tab shadow" loading={Loading}>
      <h3 className="text-default">Active Announcements</h3>

      <div className="_tab_content">
        <div className="_announces">
          {Data.map((annonce, index) => {
            return (
              <div key={index} className="_annonce">
                <h4 className="">{annonce.title}</h4>
                <span>
                  <p className="_title">From :</p>
                  &nbsp;
                  <p>{TimeExtract(annonce.start_at)}</p>
                </span>
                <span>
                  <p className="_title">To :</p>
                  &nbsp;
                  <p>{TimeExtract(annonce.end_at)}</p>
                </span>
                <p className="_title">Details :</p>
                <p style={{textAlign : "justify"}}>{annonce.desc}</p>
                {index + 1 < Data.length && <Divider />}
              </div>
            );
          })}
        </div>
        {count > 1 && (
          <Pagination
            className="_annonce_pagination"
            defaultActivePage={1}
            activePage={page}
            firstItem={null}
            lastItem={null}
            pointing
            secondary
            totalPages={count}
            onPageChange={changePage}
          />
        )}
      </div>
    </Segment>
  );
};

export default AnnonceHome;
