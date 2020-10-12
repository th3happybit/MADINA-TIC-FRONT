import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import axios from "axios";
import { Button } from "semantic-ui-react";

//? import css
import "./DeclarationStats.css";

const DeclarationStats = (props) => {
  const [data, setData] = useState(null);
  const [clicked, setClicked] = useState("");
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
      .get("declarations-statistics/")

      .then((res) => {
        let data = res.data;
        switch (clicked) {
          case "critical":
            setData(data.critical);
            break;
          case "important":
            setData(data.important);
            break;
          case "normal":
            setData(data.normal);
            break;
          case "low":
            setData(data.low);
            break;
          default:
            setData(data.critical);
            break;
        }
      })
      .catch((err) => {
      });
  }, [clicked]);

  const handleClicked = (e, { name }) => {
    setClicked(name);
  };
  const settings = data
    ? {
        series: [
          data.validated,
          data.refused,
          data.under_treatment,
          data.treated,
        ],
        options: {
          chart: {
            width: 380,
          },
          labels: ["Validé", "Refusé", "Sous traitement", "Traité"],
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
          legend: {
            position: "right",
            offsetY: 0,
            height: 230,
          },
        },
      }
    : {};

  return (
    <div className="users_stats">
      <h1>Statistiques des déclarations</h1>
      <div id="chart">
        {data && (
          <>
            {data.validated === 0 &&
            data.refused === 0 &&
            data.under_treatment === 0 &&
            data.treated === 0 ? (
              <div className="no_action">
                <p>Désolé aucune déclaration pour cette priorité</p>
              </div>
            ) : (
              <Chart
                options={settings.options}
                series={settings.series}
                type="donut"
                width={600}
                height={350}
              />
            )}
          </>
        )}
        <div className="actions">
          <Button
            name="critical"
            style={{
              background: "red",
            }}
            onClick={handleClicked}
          >
            Critique
          </Button>
          <Button name="normal" color="green" onClick={handleClicked}>
            Normale
          </Button>
          <Button
            name="low"
            style={{
              background: "var(--primary)",
            }}
            onClick={handleClicked}
          >
            Faible
          </Button>
          <Button
            name="important"
            style={{
              background: "#fbbd08",
            }}
            onClick={handleClicked}
          >
            Importante
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DeclarationStats;
