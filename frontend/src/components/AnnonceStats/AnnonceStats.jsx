import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import axios from "axios";

const AnnonceStats = (props) => {
  const [data, setData] = useState(null);
  useEffect(() => {
    let instance = axios.create({
      responseType: "json",
      baseURL: "https://madina-tic.ml/api/",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("maire_token")}`,
      },
    });
    instance
      .get("announces-statistics/")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
      });
  }, []);

  const settings = data
    ? {
        series: [data.published, data.removed, data.expired, data.active],
        options: {
          chart: {
            width: 380,
            type: "pie",
          },
          labels: [
            "Annonces publiées",
            "Annonces supprimées",
            "Annonces exprirées",
            "Annonce actives",
          ],
          responsive: [
            {
              breakpoint: 699,
              options: {
                chart: {
                  width: 400,
                  height: 350,
                },
                legend: {
                  show: false,
                },
              },
            },
            {
              breakpoint: 499,
              options: {
                chart: {
                  width: 300,
                  height: 300,
                },
                legend: {
                  show: false,
                },
              },
            },
            {
              breakpoint: 1400,
              options: {
                chart: {
                  width: 500,
                },
                legend: {
                  show: false,
                },
              },
            },
          ],
        },
      }
    : {};
  return (
    <div className="users_stats">
      <h1>Statistique des annonces</h1>
      <div id="chart">
        {data && (
          <Chart
            options={settings.options}
            series={settings.series}
            type="pie"
            width={600}
            height={350}
          />
        )}
      </div>
    </div>
  );
};

export default AnnonceStats;
