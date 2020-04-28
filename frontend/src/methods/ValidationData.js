import ValidationEmail from "./ValidationEmail.js";

//? check if the password have at least 8 chars , 1 lowercase
var checkPassword = function (password) {
  return /^(?=.*?[a-z]).{8,}$/.test(String(password));
};

/* Valid formats:
(123) 456-7890
+(123) 456-7890
+(123)-456-7890
+(123) - 456-7890
+(123) - 456-78-90
123-456-7890
123.456.7890
1234567890
+31636363634
075-63546725
*/
const checkPhoneNumber = (phone) => {
  const re = /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s./0-9]*$/g;
  return re.test(String(phone));
};

//? validate data from user on register or login
const ValidationData = (data) => {
  const {
    last_name,
    first_name,
    email,
    password,
    confirmPassword,
    login,
    birthday,
    addrress,
    phone,
  } = data;
  let errors = [];
  if (last_name.length <= 4) {
    errors.push({
      id: "last_name",
      error: "last name is too short",
    });
  }

  if (!login) {
    if (first_name.length < 6) {
      errors.push({
        id: "first_name",
        error: "first name is too short",
      });
    }
    if (!birthday.length > 0) {
      errors.push({
        id: "birthday",
        error: "birthday is required",
      });
    }
    if (addrress.length > 0) {
      if (addrress.length <= 4) {
        errors.push({
          id: "addrress",
          error: "addrress is too short",
        });
      }
    } else {
      errors.push({
        id: "addrres",
        error: "addrres is required",
      });
    }
    if (!checkPhoneNumber(phone) > 0) {
      errors.push({
        id: "phone",
        error: "enter a valid phone number",
      });
    }
    if (!ValidationEmail(email)) {
      errors.push({
        id: "email",
        error: "enter a valid email address",
      });
    }
    if (password.length > 0) {
      if (!checkPassword(password)) {
        errors.push({
          id: "password",
          error:
            "password must be at least six characters , one letter uppercase , one letter lowercase and one letter a number",
        });
      } else if (password !== confirmPassword) {
        errors.push({
          id: "password",
          error: "Your password and confirmation password do not match",
        });
      }
    } else {
      errors.push({
        id: "password",
        error: "password is required",
      });
    }
  }
  return errors;
};
export default ValidationData;
