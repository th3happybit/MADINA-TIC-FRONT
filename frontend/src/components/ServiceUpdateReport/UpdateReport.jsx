import React, { useEffect, useState } from "react";
import {
  Segment,
  Form,
  Transition,
  Button,
  Modal,
  Message,
  Icon,
  Input,
} from "semantic-ui-react";
import axios from "axios";

import "./UpdateReport.css";
import { useHistory } from "react-router-dom";

const UpdateReport = (props) => {
  const [Loading, setLoading] = useState(false);
  const [reqError, setReqErr] = useState(false);
  const [duplicateErr, setDuplicateErr] = useState(false);
  const [uploadingFile, setUploadingFile] = useState(false);
  const [successFile, setSuccessFile] = useState(false);
  const [uploadingData, setUplaodingData] = useState(false);
  const [successData, setSuccessData] = useState(false);
  const [title, setTitle] = useState(null);
  const [titleErr, setTitleErr] = useState(false);
  const [description, setDescription] = useState(null);
  const [descErr, setDescErr] = useState(false);
  const [files, setFiles] = useState(null);
  const [fileErr, setFileErr] = useState(false);
  const [maxErr, setMaxErr] = useState(false);
  const [declaration, setDeclaration] = useState(null);
  const [service, setService] = useState(null);

  let history = useHistory();

//   useEffect(() => {
//     setDeclaration(props.props.location.state.did);
//     setLoading(true);
//     axios
//       .get(
//         "http://157.230.19.233/api/declarations/" +
//           props.props.location.state.did +
//           "/",
//         {
//           headers: {
//             "content-type": "application/json",
//             Authorization: `Token ${localStorage.getItem("service_token")}`,
//           },
//         }
//       )
//       .then((res) => {
//         setLoading(false);
//         setDeclaration(res.data);
//       });
//     axios
//       .get("http://157.230.19.233/api/user", {
//         headers: {
//           "content-type": "application/json",
//           Authorization: `Token ${localStorage.getItem("service_token")}`,
//         },
//       })
//       .then((res) => {
//         setService(res.data.uid);
//       });
//     axios
//       .get("http://157.230.19.233/api/reports_complement_demand", {
//         params: {
//           report: props.props.location.state.rid,
//         },
//         headers: {
//           "content-type": "application/json",
//           Authorization: `Token ${localStorage.getItem("service_token")}`,
//         },
//       })
//       .then((res) => {})
//       .catch((err) => {});

//     axios
//       .get("http://157.230.19.233/api/reports/", {
//         params: {
//           rid: props.props.location.state.rid,
//         },
//         headers: {
//           "content-type": "application/json",
//           Authorization: `Token ${localStorage.getItem("service_token")}`,
//         },
//       })
//       .then((res) => {})
//       .catch((err) => {});
//   }, []);

  const handleTitle = (e, { value }) => {
    setTitleErr(false);
    setTitle(value);
  };
  const handleDesc = (e, { value }) => {
    setDescErr(false);
    setDescription(value);
  };
  const removeMessage = () => {
    setMaxErr(false);
    setReqErr(false);
    setDuplicateErr(false);
  };
  const handleUpload = (e) => {
    setFileErr(false);
    if (files && files.length === 3) {
      setMaxErr(true);
      return;
    }
    let tmp = e.target.files[0];
    if (tmp && tmp.size > 0 && tmp.type === "application/pdf") {
      if (!files) setFiles([tmp]);
      else setFiles((prevState) => [...prevState, tmp]);
    } else if (tmp) {
      setFileErr(true);
    }
  };
  const handleDelete = (e) => {
    setMaxErr(false);
    setFileErr(false);
    let i = parseInt(e.currentTarget.attributes["data-id"].value);
    let arr = [];
    for (let j = 0; j < files.length; j++) {
      if (j !== i) arr.push(files[j]);
    }
    setFiles(arr);
  };
  const handlePost = () => {
    setDuplicateErr(false);
    setReqErr(false);
    let error = false;
    if (!title || title.length < 6) {
      setTitleErr(true);
      error = true;
    }
    if (!description || description.length < 11) {
      setDescErr(true);
      error = true;
    }
    if (!error) {
      PostReport();
    }
  };
  const PostFile = (rid) => {
    setUploadingFile(true);
    const formData = new FormData();
    files.map((file, index) => {
      formData.append("src", file);
      formData.append("filetype", "pdf");
      formData.append("declaration", declaration.did);
      formData.append("report", rid);
    });
    axios
      .create({
        headers: {
          post: {
            "Content-Type": "multipart/form-data",
            Authorization: `Token ${localStorage.getItem("service_token")}`,
          },
        },
      })
      .request({
        url: "http://157.230.19.233/api/documents/",
        method: "post",
        data: formData,
      })
      .then((res) => {
        setUploadingFile(false);
        setSuccessFile(true);
        setFiles(null);
      })
      .catch((err) => {
        setReqErr(true);
        setUploadingFile(false);
      });
  };
  const PostReport = () => {
    setUplaodingData(true);
    axios
      .create({
        headers: {
          post: {
            "content-type": "application/json",
            Authorization: `Token ${localStorage.getItem("service_token")}`,
          },
        },
      })
      .request({
        url: "http://157.230.19.233/api/reports/",
        method: "post",
        data: {
          title,
          desc: description,
          declaration: declaration.did,
          service,
          status: "not_validated",
        },
      })
      .then((res) => {
        setSuccessData(true);
        setUplaodingData(false);
        if (files) {
          PostFile(res.data.rid);
        } else if (!files) {
          setSuccessFile(true);
        }
      })
      .catch((err) => {
        setUplaodingData(false);
        if (err.response.data.declaration)
          if (err.response.data.declaration[0] === "This field must be unique.")
            setDuplicateErr(true);
          else setReqErr(true);
      });
  };

  return (
    <div className="_rapport_form">
      <Segment className="_add_form" loading={Loading}>
        <h3 className="large-title text-default bold _margin_vertical_md">
          Update Report
        </h3>
        <Form
          error={fileErr || reqError || duplicateErr || maxErr}
          success={successData && successFile}
        >
          {declaration && (
            <p className="text-default">Declaration : {declaration.title}</p>
          )}
          <Form.Field
            type="text"
            control={Input}
            label="Title"
            placeholder="Enter title here..."
            value={title}
            onChange={handleTitle}
            name="title"
            error={
              titleErr && {
                content:
                  "This field can't be empty or shorter than 5 characters",
                class: "ui basic red label pointing",
              }
            }
          />
          <Form.TextArea
            label="Description"
            name="description"
            placeholder="..."
            value={description}
            onChange={handleDesc}
            error={
              descErr && {
                content:
                  "This field can't be empty or shorter than 10 characters",
                class: "ui basic red label pointing",
              }
            }
          />
          <div className="_upload_section">
            <p className="text-default">Add Files ( Optional )</p>
            {files &&
              files.map((file, index) => {
                return (
                  <span key={index}>
                    <p className="text-default">{file.name}</p>
                    <Icon
                      onClick={handleDelete}
                      name="times circle"
                      className="pointer"
                      data-id={index}
                      style={{ "margin-left": "10px" }}
                    />
                  </span>
                );
              })}
            <Button
              as={"label"}
              htmlFor="myInput"
              animated
              color="blue"
              className="_primary"
            >
              <Button.Content visible content="Upload" />
              <Button.Content hidden>
                <Icon name="upload" />
              </Button.Content>
            </Button>
            <input
              id="myInput"
              style={{ display: "none" }}
              type="file"
              accept=".pdf"
              className="pointer"
              onChange={handleUpload}
            />
            {fileErr && (
              <Message error content={"Please upload a valid PDF file."} />
            )}
            <Modal open={successFile && successData}>
              <Modal.Header>Success Message</Modal.Header>
              <Modal.Content>
                <Message
                  success
                  content={
                    "Your changes has been sent successfully. Press Done and you will be redirected to declarations page."
                  }
                />
              </Modal.Content>
              <Modal.Actions>
                <Button
                  className="_primary"
                  color="blue"
                  onClick={() => {
                    history.push("/service/declaration");
                  }}
                >
                  Done
                </Button>
              </Modal.Actions>
            </Modal>
            <Transition visible={reqError} animation="scale" duration={200}>
              <Message
                className="pointer"
                onClick={removeMessage}
                error
                content={"Something went wrong while sending request !"}
              />
            </Transition>
            <Transition visible={maxErr} animation="scale" duration={200}>
              <Message
                className="pointer"
                onClick={removeMessage}
                error
                content={"Maximum is 3 files !"}
              />
            </Transition>
            <Transition visible={duplicateErr} animation="scale" duration={200}>
              <Message
                className="pointer"
                onClick={removeMessage}
                error
                content={"A report is already attached to this declaration !"}
              />
            </Transition>
          </div>
        </Form>
        <div className="_action_button">
          <Button
            loading={uploadingData || uploadingFile}
            onClick={handlePost}
            animated
            color="blue"
            className="_primary"
          >
            <Button.Content visible content="Confirm" />
            <Button.Content hidden>
              <Icon name="checkmark" />
            </Button.Content>
          </Button>
        </div>
      </Segment>
    </div>
  );
};

export default UpdateReport;