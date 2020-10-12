import React, { useState, useEffect } from "react";

import "./AnnonceHome.css";
import { Segment, Divider, Pagination, Image } from "semantic-ui-react";
import axios from "axios";

const AnnonceHome = (props) => {
  const [Data, setData] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);
  const [allow, setAllow] = useState(false);

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
    setAllow(false);
    axios
      .get("https://madina-tic.ml/api/announce_nested/", {
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
        setAllow(true);
        setLoading(false);
        if (res.data.count % 10 === 0) {
          setCount(parseInt(res.data.count / 10));
        } else {
          setCount(parseInt(res.data.count / 10) + 1);
        }
      })
      .catch((err) => {});
  }, [page]);

  return (
    <Segment
      className={`_annonce_tab shadow ${props.isDark ? "dark" : ""} ${
        props.isFrench ? "" : "rtl"
      }`}
      loading={Loading}
    >
      <h3 className="text-default">
        {props.isFrench ? "Annonces actives" : "الإعلانات النشطة"}
      </h3>

      {Data.length > 0 ? (
        <div className="_tab_content">
          <div className="_announces">
            {Data.map((annonce, index) => {
              return (
                <div key={index} className="_annonce">
                  <h4 className="">{annonce.title}</h4>
                  <span
                    style={{
                      direction: props.isFrench ? "ltr" : "rtl",
                    }}
                  >
                    <p className="_title">
                      {props.isFrench ? "Service :" : "المصلحة :"}{" "}
                    </p>
                    &nbsp;
                    <p>
                      {annonce.service.first_name +
                        " " +
                        annonce.service.last_name}
                    </p>
                  </span>
                  <span>
                    <p className="_title">
                      {props.isFrench ? "De :" : "من :"}{" "}
                    </p>
                    &nbsp;
                    <p>{TimeExtract(annonce.start_at)}</p>
                  </span>
                  <span>
                    <p className="_title">
                      {props.isFrench ? "À :" : "إلى :"}{" "}
                    </p>
                    &nbsp;
                    <p>{TimeExtract(annonce.end_at)}</p>
                  </span>
                  <p className="_title">
                    {props.isFrench ? "Détails :" : "تفاصيل :"}
                  </p>
                  <p>{annonce.desc}</p>
                  {annonce.image && (
                    <Image
                      src={annonce.image}
                      style={{
                        height: "130px",
                        width: "130px",
                        marginTop: "10px",
                        "border-radius": "3px",
                      }}
                      onClick={() => {
                        window.open(annonce.image);
                      }}
                      className="pointer"
                    />
                  )}
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
      ) : (
        allow && (
          <h2>
            {props.isFrench
              ? "Aucun Annonce pour le moment"
              : "لا توجد إعلانات نشطة حاليا"}
          </h2>
        )
      )}
    </Segment>
  );
};

export default AnnonceHome;
