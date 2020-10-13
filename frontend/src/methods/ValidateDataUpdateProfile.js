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
  const nidPattern = /^\d{18}/;
  return nidPattern.test(String(nid));
};

const checkDate = (date) => {
  let dt = new Date();
  if (dt.getFullYear() - date.slice(0, 4) > 18) return true;
  else if (dt.getFullYear() - date.slice(0, 4) === 18)
    if (dt.getMonth()+1 - date.slice(5, 7) > 0) return true;
    else if (dt.getMonth()+1 - date.slice(5, 7) === 0)
      if (dt.getDate() - date.slice(8, 10) >= 0) return true;
      else return false;
    else return false;
  else return false;
};

const ValidateDataUpdateProfile = (data) => {
  const {
    first_name,
    last_name,
    email,
    birthday,
    address,
    phone,
    national_id,
    service,
  } = data;

  let errors = [];

  if (
    address.length > 0 &&
    first_name.length > 0 &&
    email.length > 0 &&
    phone.length > 0 &&
    last_name.length > 0
  ) {
    if (first_name.length > 30) {
      errors.push({
        id: "first_name",
        error: "Le prénom et trop long",
        errorAr: "الإسم طويل جدا",
      });
    }

    if (!service) {
      if (birthday.length === 0) {
        errors.push({
          id: "Required fields",
          error: "Assurez de remplir les champs nécessaires s'il vous plaît",
          errorAr: "تحقق من ملئ جميع المعلومات اللازمة من فضلك",
        });
      }
      if (!checkDate(birthday))
        errors.push({
          id: "birthday",
          error: "Ton age doit être plus de 18 ans",
          errorAr: "يجب أن يكون عمرك أكبر من 18 سنة",
        });
    }

    if (last_name.length > 50) {
      errors.push({
        id: "last_name",
        error: "Le nom et trop long",
        errorAr: "اللقب طويل جدا",
      });
    }

    if (email.length > 7) {
      if (!validateEmail(email)) {
        errors.push({
          id: "email",
          error: "Entrez une addresse email valide s'il vous plaît",
          errorAr: "تحقق من صحة البريد الإلكتروني",
        });
      }
    }

    if (phone.length > 0) {
      if (!checkPhoneNumber(phone)) {
        errors.push({
          id: "phone",
          error: "Entrez un numéro de téléphone valide s'il vous plaît",
          errorAr: "تحقق من صحة رقم الهاتف",
        });
      }
    }

    if (address.length > 80) {
      errors.push({
        id: "address",
        error: "L'addresse est trop longue",
        errorAr: "العنوان طويل جدا",
      });
    }

    if (national_id.length > 0) {
      if (!validateNationalID(national_id)) {
        errors.push({
          id: "national_id",
          error: "Entrez un numéro national valide",
          errorAr: "تحقق من صحة رقم التعريف الوطني",
        });
      }
    }
  } else {
    errors.push({
      id: "Required fields",
      error: "Assurez de remplir les champs nécessaires s'il vous plaît",
      errorAr: "تحقق من ملئ جميع المعلومات اللازمة من فضلك",
    });
  }

  return errors;
};

export default ValidateDataUpdateProfile;
