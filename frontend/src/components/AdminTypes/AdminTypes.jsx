import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Segment,
  Message,
  Button,
  List,
  Input,
} from "semantic-ui-react";

import "./AdminTypes.css";
import Axios from "axios";

import ItemType from "./ItemType";

const AdminTypes = () => {
  const [data, setData] = useState([]);
  const [add, setAdd] = useState(false);
  const [newType, setNewType] = useState("");
  const [err, setErr] = useState(false);

  const handleInput = (e, { name, value }) => {
    switch (name) {
      case "new":
        if (err) setErr(false);
        setNewType(value);
        break;
      default:
        break;
    }
  };
  const handleAddType = () => {
    if (add) {
      let instance = Axios.create({
        baseURL: "https://www.madina-tic.ml/api",
        responseType: "json",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${localStorage.getItem("admin_token")}`,
        },
      });
      let body = {
        name: newType,
      };
      instance
        .post("/declarations_types/", body)
        .then((res) => {
          setAdd((prevState) => !prevState);
          setData((prevState) => [...prevState, res.data]);
        })
        .catch((err) => {
          setErr(true);
          setAdd((prevState) => !prevState);
        });
    } else {
      setAdd((prevState) => !prevState);
    }
  };
  useEffect(() => {
    let instance = Axios.create({
      baseURL: "https://www.madina-tic.ml/api",
      responseType: "json",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("admin_token")}`,
      },
    });
    instance
      .get("/declarations_types/?ordering=-created_on")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
      });
  }, []);
  const refresh = (id) => {
    const newArr = data.filter((elm) => elm.dtid !== id);
    setData(newArr);
  };
  const refreshUpdt = (id, name) => {
    const tempArr = [];
    data.map((elm) => {
      if (elm.dtid !== id) {
        tempArr.push(elm);
      } else {
        tempArr.push(name);
      }
    });
    setData(tempArr);
  };
  return (
    <div className="_admin_profile">
      <Container fluid>
        <Grid columns="equal">
          <Grid.Row className="p-0">
            <Grid.Column>
              <div className="profile_seg ">
                <p className="extra-text text-active bold">
                  Types des Declarations
                </p>
                <Segment className="border-none shadow">
                  <div className="row_t">
                    <Button
                      className={add ? "conf" : "add"}
                      onClick={handleAddType}
                    >
                      {add ? "Confirmer" : "Ajouter un type"}
                    </Button>
                    <List verticalAlign="middle">
                      {data &&
                        data.map((elm, index) => (
                          <ItemType
                            refreshUpdt={refreshUpdt}
                            refresh={refresh}
                            elm={elm}
                            index={index}
                          />
                        ))}
                      {add && (
                        <Input
                          type="text"
                          value={newType}
                          name="new"
                          onChange={handleInput}
                        />
                      )}
                    </List>
                  </div>
                </Segment>
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </div>
  );
};

export default AdminTypes;
