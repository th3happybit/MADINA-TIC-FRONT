import React, { useState, useEffect } from "react";
import { Segment, Form, Button, Message } from "semantic-ui-react";
import axios from "axios";
import "./AdminCommune.css";

const Commune = () => {
  const [Data, setData] = useState("");
  const [name, setName] = useState("");
  const [nameAr, setNameAr] = useState("");
  const [nameAm, setNameAm] = useState("");
  const [population, setPopulation] = useState("");
  const [geoCor, setGeoCord] = useState("");
  const [daira, setDaira] = useState("");
  const [wilaya, setWilaya] = useState("");
  const [surface, setSurface] = useState("");
  const [indicatif, setIndicatif] = useState("");
  const [maire, setMaire] = useState("");
  const [altitude, setAltitude] = useState("");
  const [desc, setDesc] = useState("");
  const [nameErr, setNameErr] = useState(false);
  const [nameArErr, setNameArErr] = useState(false);
  const [nameAmErr, setNameAmErr] = useState(false);
  const [populationErr, setPopulationErr] = useState(false);
  const [geoCorErr, setGeoCordErr] = useState(false);
  const [dairaErr, setDairaErr] = useState(false);
  const [wilayaErr, setWilayaErr] = useState(false);
  const [surfaceErr, setSurfaceErr] = useState(false);
  const [indicatifErr, setIndicatifErr] = useState(false);
  const [maireErr, setMaireErr] = useState(false);
  const [altitudeErr, setAltitudeErr] = useState(false);
  const [descErr, setDescErr] = useState(false);
  const [Loading, setLoading] = useState(true);
  const [edit, setEdit] = useState(false);
  const [err, setErr] = useState(false);
  const [reqErr, setReqErr] = useState(false);
  const [success, setSuccess] = useState(false);

  const cancel_edit = () => {
    setName(Data.name);
    setNameAr(Data.name_ar);
    setPopulation(Data.population);
    setNameAm(Data.name_am);
    setDaira(Data.daira);
    setWilaya(Data.wilaya);
    setGeoCord(Data.cord);
    setSurface(Data.surface);
    setIndicatif(Data.indicatif);
    setMaire(Data.maire_fullname);
    setAltitude(Data.altitude);
    setDesc(Data.description);
    setEdit(false);
    setErr(false);
  };

  useEffect(() => {
    axios
      .get("https://madina-tic.ml/api/city", {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setData(res.data[0]);
        setName(res.data[0].name);
        setNameAr(res.data[0].name_ar);
        setPopulation(res.data[0].population);
        setNameAm(res.data[0].name_am);
        setDaira(res.data[0].daira);
        setWilaya(res.data[0].wilaya);
        setGeoCord(res.data[0].cord);
        setSurface(res.data[0].surface);
        setIndicatif(res.data[0].indicatif);
        setMaire(res.data[0].maire_fullname);
        setAltitude(res.data[0].altitude);
        setDesc(res.data[0].description);
        setLoading(false);
      });
  }, []);

  const validate = () => {
    let error = false;
    const namePatt = /^[a-z A-Zàêèéâùò]{6,}$/;
    const nameArPatt = /^[\u0600-\u06FF ]{6,}$/;
    const nameAmPatt = /^[\u2d30-\u2d7F]{6,}$/;
    const indicatifPatt = /^0\d{2}$/;
    const popPatt = /^\d{3,6}$/;
    const surfacePatt = /^\d{3,7}((,|\.)\d+)?$/;
    const mairePatt = /^[(a-z A-Z|\u0600-\u06FF)]{10,}$/;
    const altitudePatt = /^\d{1,4}((,|\.)\d+)?$/;
    const geoCordPatt = /^\[(-?\d{1,2}\.\d*) , (-?\d{1,2}\.\d*)\]$/;
    if (!namePatt.test(name)) {
      setNameErr(true);
      error = true;
      setErr(true);
    }
    if (!nameAmPatt.test(nameAm)) {
      setNameAmErr(true);
      error = true;
      setErr(true);
    }
    if (!nameArPatt.test(nameAr)) {
      setNameArErr(true);
      error = true;
      setErr(true);
    }
    if (desc.length < 20) {
      setDescErr(true);
      error = true;
      setErr(true);
    }
    if (wilaya.length < 6) {
      setWilayaErr(true);
      error = true;
      setErr(true);
    }
    if (daira.length < 6) {
      setDairaErr(true);
      error = true;
      setErr(true);
    }
    if (!mairePatt.test(String(maire))) {
      setMaireErr(true);
      error = true;
      setErr(true);
    }
    if (!surfacePatt.test(String(surface))) {
      setSurfaceErr(true);
      error = true;
      setErr(true);
    }
    if (!altitudePatt.test(String(altitude))) {
      setAltitudeErr(true);
      error = true;
      setErr(true);
    }
    if (!popPatt.test(String(population))) {
      setPopulationErr(true);
      error = true;
      setErr(true);
    }
    if (!indicatifPatt.test(String(indicatif))) {
      setIndicatifErr(true);
      error = true;
      setErr(true);
    }
    if (!geoCordPatt.test(String(geoCor))) {
      setGeoCordErr(true);
      error = true;
      setErr(true);
    }
    if (!error) UpdateInfos();
  };

  const UpdateInfos = () => {
    setLoading(true);
    const data = {
      name: name,
      name_ar: nameAr,
      name_am: nameAm,
      population: population,
      description: desc,
      altitude: altitude,
      daira: daira,
      wilaya: wilaya,
      cord: geoCor,
      surface: surface,
      indicatif: indicatif,
      maire_fullname: maire,
    };
    axios
      .create({
        headers: {
          patch: {
            "Content-Type": "multipart/form-data",
            Authorization: `Token ${localStorage.getItem("admin_token")}`,
          },
        },
      })
      .request({
        url: "https://madina-tic.ml/api/city/1/",
        method: "patch",
        data: data,
      })
      .then((res) => {
        setSuccess(true);
        setLoading(false);
        setEdit(false);
      })
      .catch((err) => {
        setLoading(false);
        setReqErr(true);
      });
  };

  const handle_change = (e, { value, id }) => {
    switch (id) {
      case "pop":
        setPopulation(value);
        setPopulationErr(false);
        break;
      case "name":
        setName(value);
        setNameErr(false);
        break;
      case "name_ar":
        setNameAr(value);
        setNameArErr(false);
        break;
      case "name_am":
        setNameAm(value);
        setNameAmErr(false);
        break;
      case "maire":
        setMaire(value);
        setMaireErr(false);
        break;
      case "daira":
        setDaira(value);
        setDairaErr(false);
        break;
      case "wilaya":
        setWilaya(value);
        setWilayaErr(false);
        break;
      case "surface":
        setSurface(value);
        setSurfaceErr(false);
        break;
      case "cord":
        setGeoCord(value);
        setGeoCordErr(false);
        break;
      case "altitude":
        setAltitude(value);
        setAltitudeErr(false);
        break;
      case "desc":
        setDesc(value);
        setDescErr(false);
        break;
      case "indicatif":
        setIndicatif(value);
        setIndicatifErr(false);
        break;
      default:
        break;
    }
  };

  const FormItems = [
    {
      label: "Nom",
      id: "name",
      value: name,
      error: "Le nom doit être au minimum 6 charactères alphabétiques",
      errName: nameErr,
    },
    {
      label: "Nom en arabe",
      id: "name_ar",
      value: nameAr,
      error:
        "Le nom doit être au minimum 6 charactères alphabétiques et arabes",
      errName: nameArErr,
    },
    {
      label: "Nom en tamazight",
      id: "name_am",
      value: nameAm,
      error:
        "Le nom doit être au minimum 6 charactères alphabétiques en tifinagh",
      errName: nameAmErr,
    },
    {
      label: "Maire",
      id: "maire",
      value: maire,
      error:
        "Le nom du maire doit être au minimum 10 charactères alphabétiques",
      errName: maireErr,
    },
    {
      label: "Daira",
      id: "daira",
      value: daira,
      error: "Le nom du daira doit être au minimum 6 charactères alphabétiques",
      errName: dairaErr,
    },
    {
      label: "Wilaya",
      id: "wilaya",
      value: wilaya,
      error:
        "Le nom du wilaya doit être au minimum 6 charactères alphabétiques",
      errName: wilayaErr,
    },
    {
      label: "Population",
      id: "pop",
      value: population,
      error: "La population doit être entre 100 et 1000000 habitants",
      errName: populationErr,
    },
    {
      label: "Surface",
      id: "surface",
      value: surface,
      error: "Le surface doit être entre 99 km² et 999999 km²",
      errName: surfaceErr,
    },
    {
      label: "Cordonnées Géographiques",
      id: "cord",
      value: geoCor,
      error: "Les cord-Geo doivent être sous la forme suivante : [X.x , Y.y]",
      errName: geoCorErr,
    },
    {
      label: "Altitude",
      id: "altitude",
      value: altitude,
      error: "L'altitude' doit être entre 1 m et 9999 m",
      errName: altitudeErr,
    },
    {
      label: "Description",
      id: "desc",
      value: desc,
      error: "La déscription doit être au minimum 20 charactères",
    },
    {
      label: "Indicatif",
      id: "indicatif",
      value: indicatif,
      error: "Ce champs doit être sous la forme 0(XX)",
      errName: indicatifErr,
    },
  ];

  return (
    <Segment className="_admin_commune shadow" loading={Loading}>
      <div className="row">
        <p className="extra-text text-default">Ma Commune</p>
      </div>
      <Form error={reqErr} success={success} className="_commune_form">
        {FormItems.map((elm, index) => {
          return (
            index % 2 === 0 && (
              <Form.Group>
                {elm.id === "desc" && (
                  <Form.TextArea
                    disabled={!edit}
                    label={elm.label}
                    id={elm.id}
                    onChange={handle_change}
                    value={elm.value}
                    error={
                      descErr &&
                      err && {
                        content: elm.error,
                        class: "ui basic pointing red label",
                      }
                    }
                  />
                )}
                {elm.id !== "desc" && (
                  <Form.Input
                    disabled={!edit}
                    label={elm.label}
                    id={elm.id}
                    onChange={handle_change}
                    value={elm.value}
                    error={
                      elm.errName &&
                      err && {
                        content: elm.error,
                        class: "ui basic pointing red label",
                      }
                    }
                  />
                )}
                <Form.Input
                  disabled={!edit}
                  label={FormItems[index + 1].label}
                  id={FormItems[index + 1].id}
                  onChange={handle_change}
                  value={FormItems[index + 1].value}
                  error={
                    FormItems[index + 1].errName &&
                    err && {
                      content: FormItems[index + 1].error,
                      class: "ui basic pointing red label",
                    }
                  }
                />
              </Form.Group>
            )
          );
        })}
        <Message
          style={{ width: "500px", marginTop: "30px" }}
          className="pointer"
          onClick={() => setReqErr(false)}
          error
          content="Un erreur s'est produit lors de l'envoi du requête"
        />
        <Message
          success
          className="pointer"
          onClick={() => setSuccess(false)}
          style={{ width: "500px", marginTop: "30px" }}
          content="Vos changement ont été sauvegardé"
        />
        <div className="_action_btns">
          {edit ? (
            <>
              <Button
                onClick={validate}
                loading={Loading}
                className="btn_primary"
                content="Confirmer"
                color="blue"
              />
              <Button
                onClick={cancel_edit}
                className="btn_secondary"
                content="Annuler"
                color="orange"
              />
            </>
          ) : (
            <Button
              onClick={() => {
                setEdit(true);
                setSuccess(false);
              }}
              className="btn_primary"
              content="Editer"
              color="blue"
            />
          )}
        </div>
      </Form>
    </Segment>
  );
};
export default Commune;
