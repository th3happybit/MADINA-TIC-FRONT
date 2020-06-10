import React from "react";
import { Image, Label } from "semantic-ui-react";

import "./HomeMain.css";
import iphone from "../../assets/images/iPhone_screenshot.png";
import iphone2 from "../../assets/images/home_screenshot.png";
import galaxy from "../../assets/images/android_screenshot.png";
import badge from "../../assets/images/google_play_badge.png";
import { ReactComponent as Checkmark } from "../../assets/icons/check_circle.svg";
import { ReactComponent as Users } from "../../assets/icons/group.svg";
import { ReactComponent as Announce } from "../../assets/icons/annonce_icon.svg";
import { ReactComponent as LaptopPhone } from "../../assets/icons/Home/LaptopPhone.svg";
import { ReactComponent as Notification } from "../../assets/icons/Home/activeNotif.svg";
import { ReactComponent as Done } from "../../assets/icons/Home/done.svg";
import { ReactComponent as Location } from "../../assets/icons/Home/location.svg";
import { ReactComponent as Camera } from "../../assets/icons/Home/add_image.svg";
import { Link } from "react-router-dom";

const HomeMain = () => {
  const items = [
    {
      comp: LaptopPhone,
      head: "Accessible partout",
      text: "Depuis votre PC, smartphone ou tablette.",
    },
    {
      comp: Notification,
      head: "Notifications en temps réel",
      text: "Restez à jour grace à notre système de notifications.",
    },
    {
      comp: Done,
      head: "Processus simple et facile",
      text: "Siganlement en quelques clics seulement.",
    },
    {
      comp: Location,
      head: "Système de localisation",
      text: "Marquez la zone que vous souhaitez signaler d'un simple clic.",
    },
    {
      comp: Camera,
      head: "Ajouter des photos",
      text: "Accompagner vos signalement avec des photos. ",
    },
  ];
  const inst = [
    "Donner les informations et les détails concernant le problème que vous avez rencontré.",
    "Le maire va consulter puis réorienter la déclaration vers les services technique.",
    "Le service responsable va traiter le problème, ensuite il informe le maire par un rapport.",
    "Le maire vérifie et assure que le travail a été bien fait.",
    "Après la validation du travail, une notification vous sera envoyée.",
  ];
  const footerItems = [
    { text: "ACCUEIl", link: "#home" },
    // { text: "comment ca marche ?", link: "#instr" },
    // { text: "fonctionnalités ", link: "#functions" },
    // { text: "télécharger ", link: "#download" },
    { text: "Déclarations", link: "#" },
    { text: "Contact", link: "#" },
  ];

  return (
    <div className="_home_main">
      <section id="home" className="_intro">
        <div className="content">
          <div className="_text_area">
            <p className="_title">Madina-Tic</p>
            <p className="slogan">
              Un service simple, pour une meilleur société,
              <br />
              <br />
              MADINA-TIC est un service qui vous permet de contribuer à
              l'amélioration de la société et la vie quotidienne.
            </p>
            <Link to="/signup">
              <div className="button slide">créer votre compte</div>
            </Link>
          </div>
          <div className="_image_area">
            <Image src={iphone2} className="_screenshot" />
          </div>
        </div>
      </section>
      <section id="stats" className="_stats">
        <h1>Statistiques de MADINA-TIC</h1>
        <div className="_statistiques">
          <div className="_stat_field">
            <Users height="56" />
            <p>45465 Utilisateurs</p>
          </div>
          <div className="_stat_field">
            <Announce height="56" />
            <p>5856 déclarations</p>
          </div>
          <div className="_stat_field">
            <Checkmark />
            <p>5489 Déclarations traitées</p>
          </div>
        </div>
      </section>
      <section id="functions" className="_functions">
        <h1>fonctionnalités</h1>
        <div className="_functions_body">
          <div className="_image_area">
            <Image src={iphone} className="_screenshot" />
          </div>
          <div className="_items">
            {items.map((element) => {
              return (
                <div className="_item">
                  <element.comp height="35px" className="_icon" />
                  <div className="text_area">
                    <h2>{element.head}</h2>
                    <p>{element.text}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <section id="instr" className="_instructions">
        <h1>comment ça marche ?</h1>
        <div className="content">
          <div className="_items">
            {inst.map((element, index) => {
              return (
                <div className="_line">
                  <Label circular size="massive">
                    {index + 1}
                  </Label>
                  <p>{element}</p>
                </div>
              );
            })}
          </div>
          <div className="_image_area">
            <Image src={galaxy} />
          </div>
        </div>
      </section>
      <section id="download" className="_download">
        <p>Disponible sur Google Play</p>
        <h1>télécharger MADINA-TIC</h1>
        <Image src={badge} />
      </section>
      <footer className="footer_area">
        <h1>MADINA-TIC</h1>
        <div className="_menu">
          {footerItems.map((element) => {
            return (
              <Link to={element.link}>
                <p>{element.text}</p>
              </Link>
            );
          })}
        </div>
        <h3>&copy; 2020 MADINA-TIC, Tous les droits réservés</h3>
      </footer>
    </div>
  );
};

export default HomeMain;
