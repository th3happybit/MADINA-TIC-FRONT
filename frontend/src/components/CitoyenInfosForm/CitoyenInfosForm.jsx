import React ,{ useState }from "react";
import {Form, Input, Button, Message} from "semantic-ui-react";

import axios from "axios";

import ValidationDataUpdateProfile from "../../methods/ValidateDataUpdateProfile.js";

const InfosForm = (props) => {


  const {cit_infos, loading} = props;

    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState(null);
    const [isEditing, setEditing] = useState(true);
    const [error, seterror] = useState(null);
    const [first_name, setfirst_name] = useState("");
    const [last_name, setlast_name] = useState("");
    const [birthday, setbirthday] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setaddress] = useState("");
    const [email, setEmail] = useState("");
    const [national_id, setnational_id] = useState("");

    //? function for changing data in inputs
    const handleChangeInput = (e) => {
    if (error) seterror(false);
    let id = e.currentTarget.id;
    switch (id) {
      case "first_name":
        setfirst_name(e.currentTarget.value);
        break;
      case "last_name":
        setlast_name(e.currentTarget.value);
        break;
      case "email":
        setEmail(e.currentTarget.value);
        break;
      case "birthday":
        setbirthday(e.currentTarget.value);
        break;
      case "phone":
        setPhone(e.currentTarget.value);
        break;
      case "address":
        setaddress(e.currentTarget.value);
        break;
      case "national_id":
        setnational_id(e.currentTarget.value);
        break;
      default:
        break;
    }
    };
    const handleSumbit = () => {
        // let login = false;
        if (error) seterror(null);
        if (success) setSuccess(null);
    
        const errors = ValidationDataUpdateProfile({
          first_name,
          last_name,
          email,
          birthday,
          address,
          phone,
          national_id,
        });

        // console.log(errors)
            
        if (errors.length > 0) {
          seterror(true);
        } else {
          UpdateInfosCitoyen();
        }
      };
    const UpdateInfosCitoyen = () => {
        setIsLoading(true);
        axios
          .put("http://13.92.195.8/api/users", {
            headers : {
              "Content-Type": "application/json",
              Authorization : `Token : ${localStorage.getItem("token")}`
            },
            data : {
              email,
              first_name,
              last_name,
              phone,
              date_of_birth: birthday,
              address
            },
          })
          .then((res) => {
            setSuccess(true);
            setIsLoading(false);
            handelEditClick();
            // console.log(res);
          })
          .catch((err) => {
            seterror(true);
            setIsLoading(false);
            // console.log(err);
          });
      };
    const handelEditClick = () => {
        setEditing((prevState) => !prevState);      
      }
    return(
        <Form
        loading={loading}
        success = {success}
        error = {error}
        id="iform" 
        className="_margin_vertical_lg">
            <Form.Group widths="equal">
                <Form.Field disabled={isEditing}>
                    <label>First Name</label>
                    <Input fluid 
                    placeholder={"First Name..."}
                    id="first_name"
                    value={isEditing ? cit_infos.first_name : first_name}
                    onChange={handleChangeInput} />
                </Form.Field>
                <Form.Field disabled={isEditing}>
                    <label>Last Name</label>
                    <Input fluid 
                    id="last_name"
                    value={isEditing ? cit_infos.last_name : last_name}
                    onChange={handleChangeInput}
                    placeholder={"Last Name..."} />
                </Form.Field>
            </Form.Group>
            <Form.Group widths="equal">
                <Form.Field required={!isEditing} disabled={isEditing}>
                    <label>Email</label>
                    <Input fluid 
                    id="email"
                    value={isEditing ? cit_infos.email : email}
                    onChange={handleChangeInput}
                    placeholder={"Email ..."}/>
                </Form.Field>
                <Form.Field disabled={isEditing}>
                    <label>Birthday</label>
                    <Input fluid 
                    id="birthday"
                    value={isEditing ? cit_infos.date_of_birth : birthday}
                    onChange={handleChangeInput}
                    placeholder={"Birthday..."} />
                </Form.Field>
            </Form.Group>
            <Form.Group widths="equal">
                <Form.Field required={!isEditing} disabled={isEditing}>
                    <label>Phone Number</label>
                    <Input fluid 
                    id="phone"
                    value={isEditing ? cit_infos.phone : phone}
                    onChange={handleChangeInput}
                    placeholder={"Phone number ..."}/>
                </Form.Field>
                <Form.Field required={!isEditing} disabled={isEditing}>
                    <label>Address</label>
                    <Input fluid 
                    id="address"
                    value={isEditing ? cit_infos.address : address}
                    onChange={handleChangeInput}
                    placeholder={"Address ..."} />
                </Form.Field>
            </Form.Group>
            <Form.Group>
                <Form.Field disabled={isEditing}>
                    <label>National ID</label>
                    <Input fluid 
                    id="national_id"
                    value={isEditing ? cit_infos.national_id : national_id}
                    onChange={handleChangeInput}
                    placeholder={"National ID ..."}/>
                </Form.Field>
            </Form.Group>
            {!isEditing && (
            <div className="_margin_vertical_md subs">
                <Button className="button_secondary" disabled={isLoading} onClick={handelEditClick} >Cancel</Button>
                <Button 
                type="submit"
                onClick={handleSumbit}
                loading={isLoading}
                className="button_primary">Save</Button>
            </div>
            )}
            {isEditing && (
              <div className="subs">
                <Button onClick={handelEditClick} className="button_primary">
                  Edit
                </Button>
              </div>
            )}
            <Message error content="Please make sur to enter a valid data" />
            <Message success content="Your infos update request has been sent successfully" />
        </Form>
    );
};

export default InfosForm;