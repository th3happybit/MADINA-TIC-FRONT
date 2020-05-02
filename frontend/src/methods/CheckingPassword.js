const CheckingPassword = (password1, password2) => {
  const password = String(password1);
  const confirm_password = String(password2);
  let arrayErrors = "";
  if (password.length <= 0) {
    arrayErrors = "password is required";
  } else if (password !== confirm_password) {
    arrayErrors = "password and confirm password don't match";
  } else if (password.length < 8) {
    arrayErrors = "password must be at least 8 caracters";
  }
  return arrayErrors;
};

export default CheckingPassword;
