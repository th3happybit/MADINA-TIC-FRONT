import React from "react";
import Chart from "react-apexcharts";

//? import css
import "./UsersStats.css";

const UsersStats = (props) => {
  const {
    citoyen_nonapp,
    citoyen_app,
    citoyens,
    all_users,
    active_users,
  } = props;
  const settings = {
    series: [
      {
        data: [all_users, active_users, citoyens, citoyen_app, citoyen_nonapp],
      },
    ],

    options: {
      chart: {
        type: "bar",
        height: 350,
        showToolTip: "0",
      },
      plotOptions: {
        bar: {
          horizontal: true,
        },
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        categories: ["Tous", "Actifs", "Citoyens", "Approuvé", "Non approuvé"],
      },
    },
  };

  return (
    <div className="users_stats">
      <h1>Statistiques des utilisateurs</h1>
      <div id="chart">
        <Chart
          options={settings.options}
          series={settings.series}
          type="bar"
          height={350}
        />
      </div>
    </div>
  );
};

export default UsersStats;
