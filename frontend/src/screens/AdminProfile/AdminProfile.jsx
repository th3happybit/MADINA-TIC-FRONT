import React, { useState, useEffect } from "react";
import { Grid, Container, Segment } from "semantic-ui-react";
import axios from "axios";

//? import css
import "./AdminProfile.css";

//? import components
import CardAdmin from "../../components/CardAdmin/CardAdmin.jsx";
import AdminEditProfile from "../../components/AdminEditProfile/AdminEditProfile.jsx";

const AdminProfile = (props) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const GetDataProfile = () => {
    axios
      .create({
        headers: {
          get: {
            "Content-Type": "application/json",
            Authorization: `Token ${localStorage.getItem("admin_token")}`,
          },
        },
      })
      .request({
        url: "http://13.92.195.8/api/user/",
        method: "get",
      })
      .then((res) => {
        console.log(res.data);
        setData(res.data);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    GetDataProfile();
  }, []);
  return (
    <Segment loading={isLoading} className="profile_seg">
      <div className="_admin_profile">
        <p className="extra-text text-active bold">Account</p>
        <Container fluid>
          <Grid className="_admin_profile_grid">
            <Grid.Column className="_card">
              <CardAdmin data_user={data} />
            </Grid.Column>
            <Grid.Column className="_not_card">
              <AdminEditProfile data_user={data} refresh={GetDataProfile} />
            </Grid.Column>
          </Grid>
        </Container>
        <Container fluid className="mobile_profile">
          <CardAdmin data_user={data} refresh={GetDataProfile} />
        </Container>
      </div>
    </Segment>
  );
};
export default AdminProfile;
