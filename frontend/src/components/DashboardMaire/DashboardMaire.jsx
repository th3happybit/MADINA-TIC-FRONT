import React, { useState, useEffect } from "react";
import axios from "axios";
import { Segment, Grid, GridColumn } from "semantic-ui-react";
//? import components
import UsersStats from "../UsersStats/UsersStats.jsx";
import DeclarationStats from "../DeclarationStats/DeclarationStats.jsx";
import AnnonceStats from "../AnnonceStats/AnnonceStats.jsx";
//? import css
import "./DashboardMaire.css";

const DashboardMaire = () => {
  const [loading, setLoading] = useState(false);

  //? users
  const [active_users, setActiveUsers] = useState(null);
  const [all_users, setAllUsers] = useState(null);
  const [citoyens, setCitoyens] = useState(null);
  const [citoyen_app, setCitoyenApp] = useState(null);
  const [citoyen_nonapp, setCitoyennnapp] = useState(null);

  //const []
  useEffect(() => {
    setLoading(true);
    let instance = axios.create({
      responseType: "json",
      baseURL: "https://madina-tic.ml/api/",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("maire_token")}`,
      },
    });
    instance
      .get("users-statistics/")
      .then((res) => {
        let data = res.data;
        setActiveUsers(data.active_users);
        setAllUsers(data.all_users);
        setCitoyens(data.citoyens);
        setCitoyenApp(data.citoyens_approved);
        setCitoyennnapp(data.citoyens_non_approved);
        setLoading(false);
      })
      .catch((err) => {
      });
  }, []);
  return (
    <div className="_maire_declarations stats_maire">
      <div className="_main_header">
        <div className="title_segment">
          <p className="extra-text text-default">Dashboard</p>
        </div>
      </div>
      <Segment loading={loading} className="_main_body shadow">
        <Grid columns={2}>
          <Grid.Row columns="equal">
            <GridColumn>
              <UsersStats
                active_users={active_users}
                all_users={all_users}
                citoyens={citoyens}
                citoyen_app={citoyen_app}
                citoyen_nonapp={citoyen_nonapp}
              />
            </GridColumn>
          </Grid.Row>
          <Grid.Row columns="equal" className="donuts_row">
            <GridColumn>{<DeclarationStats />}</GridColumn>
            <GridColumn>{<AnnonceStats />}</GridColumn>
          </Grid.Row>
        </Grid>
      </Segment>
    </div>
  );
};

export default DashboardMaire;
