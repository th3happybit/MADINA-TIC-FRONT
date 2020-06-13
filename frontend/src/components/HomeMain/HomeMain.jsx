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
import { useState } from "react";

const HomeMain = (props) => {
  const { language } = props;
  const [stats, setStats] = useState({
    total_dec: 6111,
    treated_dec: 5111,
    total_users: 15687,
  });
  const items = [
    {
      comp: LaptopPhone,
      head: language.isFrench ? "Accessible partout" : "استخدام",
      text: language.isFrench
        ? "Depuis votre PC, smartphone ou tablette."
        : "من حاسوبك، هاتفك الذكي أو جهازك اللوحي",
    },
    {
      comp: Notification,
      head: language.isFrench ? "Notifications en temps réel" : "إشعارات لحظية",
      text: language.isFrench
        ? "Restez à jour grace à notre système de notifications."
        : "ابق دائما على اطلاع و ذلك بفضل خاصية الإشعارات",
    },
    {
      comp: Done,
      head: language.isFrench
        ? "Processus simple et facile"
        : "خطوات سهلة و بسيطة",
      text: language.isFrench
        ? "Siganlement en quelques clics seulement."
        : "صرح بالمشاكل في بضع خطوات فقط",
    },
    {
      comp: Location,
      head: language.isFrench
        ? "Système de localisation"
        : "نظام تحديد المواقع",
      text: language.isFrench
        ? "Marquez la zone que vous souhaitez signaler d'un simple clic."
        : "أضف إحداثيات المنطقة في نقرة واحدة",
    },
    {
      comp: Camera,
      head: language.isFrench ? "Ajouter des photos" : "إضافة الصور",
      text: language.isFrench
        ? "Accompagner vos signalement avec des photos. "
        : "وثق تصريحاتك بصور للمشاكل",
    },
  ];
  const inst = [
    language.isFrench
      ? "Donner les informations et les détails concernant le problème que vous avez rencontré."
      : "أضف المعلومات و التفاصيل فيما يخص المشكل الذي واجهته",
    language.isFrench
      ? "Le maire va consulter puis réorienter la déclaration vers les services technique."
      : "بعد اطلاع المسؤول على التصريح، يتم توجيهه نحو المصالح المختصة",
    language.isFrench
      ? "Le service responsable va traiter le problème, ensuite il informe le maire par un rapport."
      : "تقوم المصلحة المعنية بمعالجة المشكل ثم ترفع تقريرا للمسؤول",
    language.isFrench
      ? "Le maire vérifie et assure que le travail a été bien fait."
      : "يقوم المسؤول بمعاينة العمل المنجز و يحرص على إتمامه",
    language.isFrench
      ? "Après la validation du travail, une notification vous sera envoyée."
      : "يتم إشعاركم بعد التأكد من إتمام العمل",
  ];
  const footerItems = [
    { text: language.isFrench ? "ACCUEIl" : "الصفحة الرئيسية", link: "#home" },
    // { text: "comment ca marche ?", link: "#instr" },
    // { text: "fonctionnalités ", link: "#functions" },
    // { text: "télécharger ", link: "#download" },
    { text: language.isFrench ? "Déclarations" : "التصريحات", link: "#" },
    { text: language.isFrench ? "Contact" : "تواصل معنا", link: "#" },
  ];

  return (
    <div className={`_home_main ${language.isFrench ? "" : "rtl"}`}>
      <section id="home" className="_intro">
        <div className="content">
          <div className="_text_area">
            <p className="_title">
              {language.isFrench ? "Madina-Tic" : "مدينة تيك"}
            </p>
            <p className="slogan">
              {language.isFrench
                ? "Un service simple, pour une meilleur société,"
                : "خدمة بسيطة، من أجل مجتمع أفضل،"}
              <br />
              <br />
              {language.isFrench
                ? "MADINA-TIC est un service qui vous permet de contribuer à l'amélioration de la société et la vie quotidienne."
                : "مدينة تيك هي خدمة تتيح لك فرصة المساهمة في ترقية المجتمع و الحياة العامة"}
            </p>
            <Link to="/signup">
              <div className="button slide">
                {language.isFrench ? "créer votre compte" : "أنشئ حسابا"}
              </div>
            </Link>
          </div>
          <div className="_image_area">
            <Image src={iphone2} className="_screenshot" />
          </div>
        </div>
      </section>
      <section id="stats" className="_stats">
        <h1>
          {language.isFrench
            ? "Statistiques de MADINA-TIC"
            : "إحصائيات مدينة تيك"}
        </h1>
        <div className="_statistiques">
          <div className="_stat_field">
            <Users height="56" />
            <p>{`${stats.total_users} ${
              language.isFrench ? "utilisateurs" : "مستخدم"
            }`}</p>
          </div>
          <div className="_stat_field">
            <Announce height="56" />
            <p>{`${stats.total_dec} ${
              language.isFrench ? "Déclarations" : "تصريح"
            }`}</p>
          </div>
          <div className="_stat_field">
            <Checkmark />
            <p>{`${stats.treated_dec} ${
              language.isFrench ? "Déclarations traitées" : "تصريح معالج"
            }`}</p>
          </div>
        </div>
      </section>
      <section id="functions" className="_functions">
        <h1>{language.isFrench ? "fonctionnalités" : "المزايا و الخصائص"}</h1>
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
        <h1>{language.isFrench ? "comment ça marche ?" : "تعليمات"}</h1>
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
        <p>
          {language.isFrench
            ? "Disponible sur Google Play"
            : "متوفر الآن على جوجل بلاي"}
        </p>
        <h1>
          {language.isFrench ? "télécharger MADINA-TIC" : "حمل تطبيق مدينة تيك"}
        </h1>
        <Image src={badge} />
      </section>
      <footer className="footer_area">
        <h1>{language.isFrench ? "MADINA-TIC" : "مدينة تيك"}</h1>
        <div className="_menu">
          {footerItems.map((element) => {
            return (
              <Link to={element.link}>
                <p>{element.text}</p>
              </Link>
            );
          })}
        </div>
        {language.isFrench ? (
          <h3>&copy; 2020 MADINA-TIC, Tous les droits réservés</h3>
        ) : (
          <h3>&copy; 2020 مدينة تيك، كل الحقوق محفوظة</h3>
        )}
      </footer>
    </div>
  );
};

export default HomeMain;
