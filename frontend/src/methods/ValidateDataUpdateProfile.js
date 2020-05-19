/* eslint-disable no-unused-vars */
// reg.Exps to check data is valid

const validateEmail = (email) => {
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return emailPattern.test(email);
};

const checkPhoneNumber = (phone) => {
  const phonePattern = /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s./0-9]*$/g;
  return phonePattern.test(String(phone));
};

const validateNationalID = (nid) => {
  const nidPattern = /^[0-9]{10}/;
  return nidPattern.test(String(nid));
};

const checkDate = (date) => {
  let dt = new Date();
  if (dt.getFullYear() - date.slice(0, 4) > 18)
    return true;
  else if (dt.getFullYear() - date.slice(0, 4) === 18)
    if (dt.getMonth() - date.slice(6, 8) > 0)
      return true
    else if (dt.getMonth() - date.slice(6, 8) === 0)
      if (dt.getDay() - date.slice(8, 10) > 0)
        return true
      else return false;
    else return false
  else return false;
}

const ValidateDataUpdateProfile = (data) => {
  const {
    first_name,
    last_name,
    email,
    birthday,
    address,
    phone,
    national_id,
  } = data;

  let errors = [];

  if (
    address.length > 0 &&
    first_name.length > 0 &&
    email.length > 0 &&
    birthday.length > 0 &&
    phone.length > 0 &&
    national_id.length > 0 &&
    last_name.length > 0
  ) {
    if (first_name.length > 30) {
      errors.push({
        id: "first_name",
        error: "First Name is too long",
      });
    }

    if (!checkDate(birthday))
      errors.push({
        id : "birthday",
        error : "You must be above 18"
      })

    if (last_name.length > 150) {
      errors.push({
        id: "last_name",
        error: "Last Name is too long",
      });
    }

    if (email.length > 5) {
      if (!validateEmail(email)) {
        errors.push({
          id: "email",
          error: "Please, Enter a valid email address",
        });
      }
    }

    if (phone.length > 0) {
      if (!checkPhoneNumber(phone)) {
        errors.push({
          id: "phone",
          error: "Please, enter a valid phone number",
        });
      }
    }

    if (address.length > 80) {
      errors.push({
        id: "address",
        error: "Address is too long",
      });
    }

    if (national_id.length > 0) {
      if (!validateNationalID(national_id) || national_id.length > 10) {
        errors.push({
          id: "national_id",
          error: "Please, enter a valid national id",
        });
      }
    }
  } else {
    errors.push({
      id: "Required fields",
      error: "Make sure to fill all the required fields",
    });
  }

  return errors;
};

export default ValidateDataUpdateProfile;
