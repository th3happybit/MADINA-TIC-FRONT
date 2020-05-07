

const validatePassword = (p) => {
    const passPatern = /^(?=.*[a-z])(?=.*[A-Z])(?=.{8,})/;
    return passPatern.test(p);
};

const ValidateDataUpdatePass = (data) => {
    const [ password, 
            new_pass,
            confirm_pass ] = data;

    let errors = [];


    if ((password.value.length > 0) && (new_pass.value.length > 0) && (confirm_pass.value.length > 0)){
        if(!validatePassword(new_pass.value)){
            errors.push({
                id : "passoword",
                error : "Password must be at least 8 charcaters and contain at least one upercase.",
            });
        }
        if (new_pass.value !== confirm_pass.value){
            errors.push({
                id : "password",
                error : "Passwords are note identical.",
            });
        }
             if (new_pass.value.length > 128){
            errors.push({
                id : "password",
                error : "Password is too long.",
            });
        }
    }
    else {
        errors.push({
            id : "Password",
            error : "Nothing to submit.",
        })
    }

    return errors;
}

export default ValidateDataUpdatePass;