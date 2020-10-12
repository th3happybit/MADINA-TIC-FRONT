import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Image, Button, Segment, Message, Icon } from "semantic-ui-react";
import Geocode from "react-geocode";
import { ReactComponent as Gps } from "../../assets/icons/gps.svg";
import Location from "../AddDeclaration/Location.jsx";
//? import css
import "./UpdateDeclaration.css";

//? redux stuff
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { change_mode } from "../../actions/darkAction";
import { change_language } from "../../actions/languageAction";

const UpdateDeclaration = (props) => {
  const { languages, isDark } = props;
  const [succes, setSucces] = useState(false);
  const [title, setTitle] = useState("");
  const [titleErr, setTitleErr] = useState(false);
  const [type, setType] = useState("");
  const [service, setService] = useState("");
  const [typeErr, setTypeErr] = useState(false);
  const [adr, setAdr] = useState("");
  const [adrErr, setAdrErr] = useState(false);
  const [adrGeo, setAdrGeo] = useState("");
  const [isGeo, setIsGeo] = useState(false);
  const [description, setDesctiption] = useState("");
  const [descriptionErr, setDescriptionErr] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState([]);
  const [selectedType, setSelectedType] = useState(null);
  const [loadingPage, setLoadingPage] = useState(false);
  const [pictures, setPictures] = useState([]);
  const [picturesPreview, setPicturesPreview] = useState([]);
  const [selectedFile, setSelectedFile] = useState();
  const [sendP, setsendP] = useState([]);
  const [delP, setdelP] = useState([]);

  const handledeleteImg = (e) => {
    let indexElm = parseInt(e.currentTarget.attributes["data-id"].value);
    let f = [];
    let del = delP;
    pictures.map((elm, index) => {
      if (index !== indexElm) {
        f.push(elm);
      } else {
        if (elm.src) del.push(elm.dmid);
      }
      return true;
    });
    setPictures(f);
  };
  useEffect(() => {
    if (!selectedFile) {
      setPicturesPreview([]);
      return;
    }
    const objectUrl = URL.createObjectURL(selectedFile);
    setPictures((prevState) => [...prevState, objectUrl]);
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);
  const onSelectFile = (e) => {
    let es = e.target.files[0];
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }
    setSelectedFile(es);
    setsendP((prevState) => [...prevState, es]);
  };
  useEffect(() => {
    Geocode.fromLatLng("48.8583701", "2.2922926").then(
      (response) => {
        const address = response.results[0].formatted_address;
      },
      (error) => {
        console.error(error);
      }
    );
  }, []);
  const handleUpdate = () => {
    setIsLoading(true);
    axios
      .create({
        headers: {
          patch: {
            "Content-Type": "application/json",
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
        },
      })
      .request({
        url: `https://madina-tic.ml/api/declarations/${props.props.location.state.data.did}/`,
        method: "patch",
        data: {
          title,
          desc: description,
          geo_cord: adrGeo,
          address: adr,
          dtype: selectedType,
          status: "not_validated",
          service: service,
          citizen: props.props.location.state.data.citizen,
          modified_at: new Date().toJSON().substr(0, 19) + "+01:00",
        },
      })
      .then((res) => {
        if (pictures.length > 0 || delP.length > 0) {
          postFiles();
        } else {
          setSucces(true);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        setIsLoading(false);
      });
  };
  const postFiles = () => {
    let formData = new FormData();
    let upload = false;
    sendP.map((image) => {
      if (!image.src) {
        upload = true;
        formData.append("src", image);
        formData.append("filetype", "image");
        formData.append("declaration", props.props.location.state.data.did);
      }
    });
    if (upload) {
      axios
        .create({
          headers: {
            post: {
              "Content-Type": "multipart/form-data",
              Authorization: `Token ${localStorage.getItem("token")}`,
            },
          },
        })
        .request({
          url: "https://madina-tic.ml/api/documents/",
          method: "post",
          data: formData,
        })
        .then((res) => {
          if (delP.length > 0) deleteFiles();
          else {
            setIsLoading(false);
            setSucces(true);
          }
        })
        .catch((err) => {});
    } else if (delP.length > 0) {
      deleteFiles();
    } else {
      setIsLoading(false);
      setSucces(true);
    }
  };
  const deleteFiles = () => {
    delP.map((elm) => {
      axios
        .delete(`https://madina-tic.ml/api/documents/${elm}`, {
          headers: {
            "Content-type": "application/json",
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          setIsLoading(false);
          setSucces(true);
        })
        .catch((err) => {});
    });
  };
  const handleCoords = (e) => {
    setAdrGeo("[" + String(e.longitude) + "," + String(e.latitude) + "]");
  };
  const handleGeo = () => {
    setIsGeo((prevState) => !prevState);
    setAdr("");
  };
  useEffect(() => {
    selectedType &&
      axios
        .create({
          headers: {
            get: {
              "Content-Type": "application/json",
              Authorization: `Token ${localStorage.getItem("token")}`,
            },
          },
        })
        .request({
          url: "https://madina-tic.ml/api/declarations_types/",
          method: "get",
        })
        .then((res) => {
          let arr = [];
          res.data.map((elm, index) => {
            return arr.push({
              key: index,
              text: elm.name,
              value: elm.name,
              dtid: elm.dtid,
              service: elm.service,
            });
          });
          setOptions(arr);
          axios
            .get(
              `https://madina-tic.ml/api/declarations_types/${selectedType}`,
              {
                headers: {
                  "content-type": "application/json",
                  Authorization: `Token ${localStorage.getItem("token")}`,
                },
              }
            )
            .then((res) => {
              setType(res.data.name);
              setService(res.data.service);
              setLoadingPage(false);
            })
            .catch((err) => {});
        })
        .catch((err) => {});
  }, [selectedType]);
  useEffect(() => {
    axios
      .get(
        `https://madina-tic.ml/api/declarations/${props.props.location.state.data.did}/`,
        {
          headers: {
            "content-type": "application/json",
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        setSelectedType(res.data.dtype);
        setTitle(res.data.title);
        setDesctiption(res.data.desc);
        setAdr(res.data.address);
        setAdrGeo(res.data.geo_cord);
        setPictures(res.data.attachments);
        setService(res.data.service);
      })
      .catch((err) => {});
  }, []);
  const handleChange = (e, { name, value }) => {
    switch (name) {
      case "title":
        setTitleErr(false);
        setTitle(value);
        break;
      case "type":
        setTypeErr(false);
        setType(value);
        change_service(value);
        break;
      case "adr":
        setAdrErr(false);
        setAdr(value);
        break;
      case "description":
        setDescriptionErr(false);
        setDesctiption(value);
        break;
      default:
        break;
    }
  };
  const change_service = (value) => {
    options.map((elm) => {
      if (elm.value === value) {
        setSelectedType(elm.dtid);
        setService(elm.service);
      }
    });
  };
  return (
    <div
      className={`container_add_dec ${languages.isFrench ? "" : "rtl"} ${
        isDark ? "dark" : ""
      }`}
    >
      <Segment
        className={`_add_dec ${isDark ? "dark" : ""}`}
        style={{
          margin: "auto",
        }}
        loading={loadingPage}
      >
        <h3 className="large-title text-default bold _margin_vertical_md">
          {languages.isFrench ? "Modifier declaration" : "تحديث  تصريح"}
        </h3>
        <Form success={succes}>
          <Form.Input
            type="text"
            label={languages.isFrench ? "Titre" : "عنوان"}
            value={title}
            onChange={handleChange}
            name="title"
            className={titleErr ? "add_dec_err" : ""}
          />
          <Form.Select
            fluid
            label={languages.isFrench ? "Type" : "نوع"}
            options={options}
            name="type"
            value={type}
            onChange={handleChange}
            className={typeErr ? "add_dec_err" : ""}
          />
          <div
            style={{
              position: "relative",
              marginBottom: "1rem",
            }}
          >
            <Form.Input
              disabled={isGeo}
              type="text"
              label={languages.isFrench ? "Adresse" : "عنوان"}
              value={adr}
              className={adrErr ? "add_dec_err" : ""}
              onChange={handleChange}
              name="adr"
            />
            {isGeo && <Location show={handleCoords} />}
            {isGeo && <Gps className="gps_icon" />}
          </div>
          <Form.Group inline>
            <Form.Radio
              label={
                languages.isFrench ? "Géo-localisation" : "الإحداثيات الجغرافية"
              }
              value="sm"
              checked={isGeo}
              onClick={handleGeo}
            />
            <Form.Radio
              label={languages.isFrench ? "Adresse manuelle" : "عنوان يدوي"}
              value="md"
              checked={!isGeo}
              onClick={handleGeo}
            />
          </Form.Group>
          <Form.TextArea
            label={languages.isFrench ? "Description" : "التفاصيل"}
            name="description"
            value={description}
            className={descriptionErr ? "add_dec_err" : ""}
            onChange={handleChange}
          />
          {pictures.length > 0 && (
            <p className="label_add_dec bold">
              {" "}
              {languages.isFrench ? "photos" : " الصور"}
            </p>
          )}
          <div
            className="prev_images_dec"
            style={{
              display: "flex",
              alignItems: "flex-start",
              flexDirection: "column",
            }}
          >
            <p className="label_add_dec bold" style={{ margin: "1rem 0" }}>
              {languages.isFrench ? "Ajouter photos" : "تحميل الصور"} (
              {languages.isFrench ? "optionnel" : "اختياري"})
            </p>
            <div className="_profile_img_edit add_dec pointer">
              <label
                htmlFor="myInput"
                className="pointer"
                style={{
                  display: "flex",
                  width: "100%",
                }}
              >
                {languages.isFrench ? "Ajouter" : "تحميل"}
              </label>
              <input
                id="myInput"
                style={{ display: "none" }}
                type="file"
                accept="image/*"
                className="pointer"
                onChange={onSelectFile}
              />
            </div>
            <div className="prev_images_dec">
              {pictures.map((elm, index) => {
                return (
                  <div
                    style={{
                      position: "relative",
                    }}
                  >
                    <Image src={elm.src ? elm.src : elm} key={index} />
                    <Icon
                      color="black"
                      name="delete"
                      data-id={index}
                      onClick={handledeleteImg}
                    />
                  </div>
                );
              })}
            </div>
          </div>
          <Form.Group
            style={{
              display: "flex",
              justifyContent: "center",
            }}
            className="_add_btn_dec here"
          >
            <Button
              loading={isLoading}
              className="button_primary _margin_horizontal_sm"
              onClick={handleUpdate}
            >
              {languages.isFrench ? "Confirmer" : "التأكيد"}
            </Button>
          </Form.Group>
          <Message
            success
            content={languages.isFrench ? "modification réussie" : "تعديل ناجح"}
          />
        </Form>
      </Segment>
    </div>
  );
};

UpdateDeclaration.propTypes = {
  isDark: PropTypes.bool.isRequired,
  change_mode: PropTypes.func.isRequired,
  languagse: PropTypes.object.isRequired,
  change_language: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isDark: state.mode.isDark,
  languages: state.language,
});

export default connect(mapStateToProps, { change_mode, change_language })(
  UpdateDeclaration
);
