import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Image, Button, Icon, Message, Segment } from "semantic-ui-react";

import { ReactComponent as Gps } from "../../assets/icons/gps.svg";
import Location from "../AddDeclaration/Location.jsx";
import { useHistory } from "react-router-dom";

import "./ComplementDeclaration.css";

//? redux stuff
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { change_mode } from "../../actions/darkAction";
import { change_language } from "../../actions/languageAction";

const ComplementDeclaration = (props) => {
  let history = useHistory();
  const { languages, isDark } = props;
  const [titleErr, setTitleErr] = useState(false);
  const [succes, setSucces] = useState(false);
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [service, setService] = useState("");
  const [typeErr, setTypeErr] = useState(false);
  const [adrErr, setAdrErr] = useState(false);
  const [adr, setAdr] = useState("");
  const [adrGeo, setAdrGeo] = useState("");
  const [isGeo, setIsGeo] = useState(false);
  const [description, setDesctiption] = useState("");
  const [descriptionErr, setDescriptionErr] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState([]);
  const [selectedType, setSelectedType] = useState(null);
  const [reason, setReason] = useState("");
  const [pictures, setPictures] = useState([]);
  const [picturesPreview, setPicturesPreview] = useState([]);
  const [loadingPage, setLoadingPage] = useState(false);
  const [did, setDid] = useState(null);
  const [sendP, setsendP] = useState([]);
  const [delP, setdelP] = useState([]);
  const [selectedFile, setSelectedFile] = useState();
  const [nullData, setnullData] = useState(false);
  const [notLack, setnotLack] = useState(true);

  const handleComplement = () => {
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
          service: service,
          citizen: props.props.location.state.data.citizen,
          status: "not_validated",
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
        Object.entries(err.response.data).map((elm) => {
          switch (elm[0]) {
            case "title":
              setTitleErr(true);
              break;
            case "desc":
              setDescriptionErr(true);
              break;
            case "dtype":
              setTypeErr(true);
              break;
            default:
              break;
          }
          return true;
        });
        setIsLoading(false);
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
              `https://madina-tic.ml/api/declarations_types/${selectedType}/`,
              {
                headers: {
                  "content-type": "application/json",
                  Authorization: `Token ${localStorage.getItem("token")}`,
                },
              }
            )
            .then((res) => {
              setType(res.data.name);
              setSelectedType(res.data.dtid);
              setService(res.data.service);
              setLoadingPage(false);
            })
            .catch((err) => {});
        })
        .catch((err) => {});
  }, [selectedType]);
  useEffect(() => {
    setLoadingPage(true);
    if (props.props.location.state) {
      if (props.props.location.state.data.status === "lack_of_info") {
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
            if (res.data.status === "lack_of_info") {
              setSelectedType(res.data.dtype);
              setTitle(res.data.title);
              setDesctiption(res.data.desc);
              setAdr(res.data.address);
              setAdrGeo(res.data.geo_cord);
              setService(res.data.service);
              setPictures(res.data.attachments);
            } else {
              setnotLack(false);
              setnullData(true);
              setLoadingPage(false);
            }
          })
          .catch((err) => {});
        axios
          .get(
            `https://madina-tic.ml/api/declarations_complement_demand/?ordering=-created_on&?declaration=${props.props.location.state.data.did}`,
            {
              headers: {
                "content-type": "application/json",
                Authorization: `Token ${localStorage.getItem("token")}`,
              },
            }
          )
          .then((res) => {
            setReason(res.data.results[0].reason);
          })
          .catch((err) => {});
      } else {
        setnotLack(true);
        setnullData(true);
      }
    } else {
      setLoadingPage(false);
      setnullData(true);
    }
  }, []);
  useEffect(() => {
    if (!selectedFile) {
      setPicturesPreview([]);
      return;
    }
    const objectUrl = URL.createObjectURL(selectedFile);
    setPictures((prevState) => [...prevState, objectUrl]);
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);
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
        loading={loadingPage}
      >
        {!nullData && notLack ? (
          <>
            <h3 className="large-title text-default bold _margin_vertical_md">
              {languages.isFrench ? "complementer declaration" : "تكملة  تصريح"}
            </h3>
            <Form success={succes}>
              <Message
                info
                header={
                  languages.isFrench
                    ? "The motif of the demand"
                    : "سبب طلب التكملة"
                }
                content={reason}
              />
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
                    languages.isFrench
                      ? "Géo-localisation"
                      : "الإحداثيات الجغرافية"
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
                placeholder="..."
                value={description}
                className={descriptionErr ? "add_dec_err" : ""}
                onChange={handleChange}
              />
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
              <Form.Group
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
                className="_add_btn_dec here"
              >
                <Button
                  disabled={succes}
                  loading={isLoading}
                  className="button_primary _margin_horizontal_sm"
                  onClick={handleComplement}
                >
                  {languages.isFrench ? "Confirmer" : "التأكيد"}
                </Button>
              </Form.Group>
              <Message
                onClick={() => {
                  history.push("/citoyen/declarations");
                }}
                className="pointer"
                success
                content={
                  languages.isFrench
                    ? "Your complement has been send succesfully ! Click here to go to your declarations list."
                    : "تم حفظ التعديلات بنجاح ! اضغط هنا للعودة لقائمة "
                }
              />
            </Form>
          </>
        ) : (
          nullData && (
            <h1
              className="text-default"
              style={{
                margin: "auto",
                "font-size": "xxx-large",
                width: "600px",
              }}
            >
              Something went wrong :( ...
            </h1>
          )
        )}
      </Segment>
    </div>
  );
};

ComplementDeclaration.propTypes = {
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
  ComplementDeclaration
);
