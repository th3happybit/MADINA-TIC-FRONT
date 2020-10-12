import React, { useState } from "react";
import { Form, Button, Message } from "semantic-ui-react";
import axios from "axios";
import ValidatePassword from "../../methods/ValidateDataUpdatePass.js";
import "./CitoyenPasswordForm.css";
import { languages } from "../../language.js";

const PasswordForm = (props) => {
  const { isFrench } = props;
  const [currentPassword, setCurrentPassword] = useState({
    value: "",
    isPassword: true,
  });
  const [newPassword, setNewPassword] = useState({
    value: "",
    isPassword: true,
  });
  const [confirmPassword, setConfirmPassword] = useState({
    value: "",
    isPassword: true,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, seterror] = useState(null);
  const [errMessage, seterrMessage] = useState(null);
  const [isEditing, setisediting] = useState(false);

  const reset = () => {
    if (currentPassword.value !== "")
      setCurrentPassword({
        value: "",
        isPassword: true,
      });
    if (newPassword.value !== "")
      setNewPassword({
        value: "",
        isPassword: true,
      });
    if (confirmPassword.value !== "")
      setConfirmPassword({
        value: "",
        isPassword: true,
      });
  };
  const handleedit = () => {
    reset();
    setisediting((prevState) => !prevState);
  };

  const handleShowPsw = (e) => {
    let id = e.currentTarget.attributes["data-id"].nodeValue;
    switch (id) {
      case "currentPassword":
        if (currentPassword.value.length > 0)
          setCurrentPassword((prevState) => {
            let isPass = !prevState.isPassword;
            return {
              ...prevState,
              isPassword: isPass,
            };
          });
        break;
      case "newPassword":
        if (newPassword.value.length > 0)
          setNewPassword((prevState) => {
            let isPass = !prevState.isPassword;
            return {
              ...prevState,
              isPassword: isPass,
            };
          });
        break;
      case "confirmPassword":
        if (confirmPassword.value.length > 0)
          setConfirmPassword((prevState) => {
            let isPass = !prevState.isPassword;
            return {
              ...prevState,
              isPassword: isPass,
            };
          });
        break;
      default:
        break;
    }
  };

  const handleInputChangeValue = (event) => {
    if (error) seterror(null);
    if (success) setSuccess(null);
    let value = event.currentTarget.value;
    let id = event.currentTarget.id;
    switch (id) {
      case "currentPassword":
        setCurrentPassword((prevState) => {
          return {
            ...prevState,
            value,
          };
        });
        break;
      case "newPassword":
        setNewPassword((prevState) => {
          return {
            ...prevState,
            value,
          };
        });
        break;
      case "confirmPassword":
        setConfirmPassword((prevState) => {
          return {
            ...prevState,
            value,
          };
        });
        break;
      default:
        break;
    }
  };

  const handleSumbit = () => {
    setIsLoading(true);
    if (error) seterror(null);
    if (success) setSuccess(null);

    var errors = ValidatePassword([
      currentPassword,
      newPassword,
      confirmPassword,
    ]);

    if (errors.length > 0) {
      seterror(true);
      seterrMessage(isFrench ? errors[0].error : errors[0].errorAr);
      setIsLoading(false);
      reset();
    } else {
      UpdatePasswordCitoyen();
    }
  };
  const UpdatePasswordCitoyen = () => {
    axios
      .create({
        headers: {
          post: {
            "Content-Type": "application/json",
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
        },
      })
      .request({
        url: "https://madina-tic.ml/api/password/change/",
        method: "post",
        data: {
          old_password: currentPassword.value,
          new_password1: newPassword.value,
          new_password2: confirmPassword.value,
        },
      })
      .then((res) => {
        setSuccess(true);
        setIsLoading(false);
      })
      .catch((err) => {
        let resErrOldPassword = err.response.data.old_password
          ? err.response.data.old_password[0]
          : "";
        let resErrNewPassw = err.response.data.new_password2
          ? err.response.data.new_password2[0]
          : "";
        if (resErrOldPassword !== "") {
          seterrMessage(resErrOldPassword);
        } else seterrMessage(resErrNewPassw);
        seterror(true);
        setIsLoading(false);
        reset();
      });
  };

  return (
    <div>
      <Form
        success={success}
        error={error}
        id="pform"
        className="_margin_vertical_lg"
      >
        <Form.Group className="input-password">
          <div className="input_p">
            <Form.Input
              disabled={!isEditing}
              id="currentPassword"
              value={currentPassword.value}
              type={currentPassword.isPassword ? "password" : "text"}
              label={
                props.isFrench ? "Mot de passe actuel" : "كلمة المرور الحالي"
              }
              onChange={handleInputChangeValue}
              className="required"
            />
            <i
              className="eye icon pointer"
              data-id="currentPassword"
              onClick={handleShowPsw}
            />
          </div>
        </Form.Group>
        <Form.Group className="input-password">
          <div className="input_p">
            <Form.Input
              disabled={!isEditing}
              id="newPassword"
              value={newPassword.value}
              type={newPassword.isPassword ? "password" : "text"}
              label={
                props.isFrench ? "Mot de passe nouveau" : "كلمة السر الجديدة"
              }
              onChange={handleInputChangeValue}
              className="required"
            />
            <i
              className="eye icon pointer"
              data-id="newPassword"
              onClick={handleShowPsw}
            />
          </div>
        </Form.Group>
        <Form.Group className="input-password">
          <div className="input_p">
            <Form.Input
              disabled={!isEditing}
              id="confirmPassword"
              value={confirmPassword.value}
              type={confirmPassword.isPassword ? "password" : "text"}
              label={
                props.isFrench
                  ? "Confirmez le mot de passe"
                  : "تأكيد كلمة المرور"
              }
              onChange={handleInputChangeValue}
              className="required"
            />
            <i
              className="eye icon pointer"
              data-id="confirmPassword"
              onClick={handleShowPsw}
            />
          </div>
        </Form.Group>
        {isEditing ? (
          <div className="_margin_vertical_md pbutt subs">
            <Button
              className="button_secondary"
              disabled={isLoading}
              onClick={handleedit}
            >
              {isFrench ? "Cancel" : "إلغاء"}
            </Button>

            <Button
              type="submit"
              onClick={handleSumbit}
              loading={isLoading}
              className="button_primary"
            >
              {isFrench ? "Confirmer" : "حفظ"}
            </Button>
          </div>
        ) : (
          <div className="_margin_vertical_md pbutt subs">
            <Button
              type="submit"
              onClick={handleedit}
              loading={isLoading}
              className="button_primary"
            >
              {isFrench ? "Éditer" : "تعديل"}
            </Button>
          </div>
        )}

        <Message error content={errMessage} />
        <Message
          success
          content={
            props.isFrench
              ? "Votre demande de mise à jour des informations a été envoyée avec succès"
              : "تم إرسال طلب تحديث معلوماتك بنجاح"
          }
        />
      </Form>
    </div>
  );
};

export default PasswordForm;
