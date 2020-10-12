import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Segment,
  Button,
  List,
  Input,
  Dropdown,
  Message,
} from "semantic-ui-react";

import "./AdminTypes.css";
import Axios from "axios";

import ItemType from "./ItemType";

const AdminTypes = () => {
  const [data, setData] = useState([]);
  const [add, setAdd] = useState(false);
  const [newType, setNewType] = useState("");
  const [errType, setErrType] = useState(false);
  const [servErr, setServErr] = useState(false);
  const [services, setServices] = useState([]);
  const [next, setNext] = useState(null);
  const [Loading, setLoading] = useState(true);
  const [service, setService] = useState(null);

  const handleInput = (e, { name, value }) => {
    switch (name) {
      case "new":
        if (errType) setErrType(false);
        setNewType(value);
        break;
      default:
        break;
    }
  };
  const AddType = () => {
    let instance = Axios.create({
      baseURL: "https://madina-tic.ml/api",
      responseType: "json",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("admin_token")}`,
      },
    });
    let body = {
      name: newType,
      service: service,
    };
    instance
      .post("/declarations_types/", body)
      .then((res) => {
        setAdd((prevState) => !prevState);
        setData((prevState) => [...prevState, res.data]);
      })
      .catch((err) => {
        setAdd((prevState) => !prevState);
      });
  };
  const handleAddType = () => {
    if (add) {
      let err = false;
      if (newType.length < 3) {
        setErrType(true);
        err = true;
      }
      if (!service) {
        setServErr(true);
        err = true;
      }
      if (!err) AddType();
    } else {
      setAdd((prevState) => !prevState);
    }
  };
  function getServiceName(str) {
    for (let i = 0; i < services.length; i++) {
      if (str === services[i].value) return services[i].text;
    }
  }
  useEffect(() => {
    setLoading(true);
    let instance = Axios.create({
      baseURL: "https://madina-tic.ml/api",
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
      .catch((err) => {});
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
  const handle_service = (e, { value }) => {
    setServErr(false);
    setService(value);
  };
  useEffect(() => {
    let url = next ? next : "https://madina-tic.ml/api/users/?role=Service";
    Axios.get(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("admin_token")}`,
      },
    })
      .then((res) => {
        if (res.data.next)
          setNext("https" + res.data.next.slice(4, res.data.next.length));
        else setLoading(false);
        let arr = services;
        res.data.results.map((elm) => {
          let elemnt = {
            value: elm.uid,
            text: elm.first_name + " " + elm.last_name,
          };
          arr.push(elemnt);
        });
        setServices([...arr]);
      })
      .catch((res) => {});
  }, [next]);
  return (
    <div className="_admin_profile">
      <Container fluid>
        <Grid columns="equal">
          <Grid.Row className="p-0">
            <Grid.Column>
              <div className="profile_seg ">
                <p className="extra-text text-active bold">
                  Types des Déclarations
                </p>
                <Segment className="border-none shadow" loading={Loading}>
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
                            options={services}
                            getName={getServiceName}
                          />
                        ))}
                      {add && (
                        <>
                          <div className="_type_inputs">
                            <Input
                              type="text"
                              value={newType}
                              name="new"
                              onChange={handleInput}
                              error={errType}
                            />
                            <Dropdown
                              className="_service_input"
                              style={{ marginLeft: "20px" }}
                              placeholder="Service ..."
                              search
                              selection
                              scrolling
                              onChange={handle_service}
                              options={services}
                              error={servErr}
                            />
                          </div>
                        </>
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
