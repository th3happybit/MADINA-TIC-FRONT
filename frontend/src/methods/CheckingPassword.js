var checkPassword = function (password) {
 return /^(?=.*?[a-z]).{8,}$/.test(String(password));
};

const CheckingPassword = (data) => {
 const {
  New_Password,
  Confirm_New_Password,
 } = data;
 let errors = [];

 if (New_Password.length > 0) {
  if (!checkPassword(New_Password)) {
   errors.push({
    id: "New_Password",
    error:"password must be at least six characters , one letter uppercase , one letter lowercase and one letter a number",
   });
  } else if (New_Password !== Confirm_New_Password) {
   errors.push({
    id: "New_Password",
    error: "Your password and confirmation password do not match",
   });
  }
 } else {
  errors.push({
   id: "New_Password",
   error: "password is required",
  });
 }
 return errors;
};




export default CheckingPassword;