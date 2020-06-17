

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
                error : "Le mot de passe doit être au minimum 8 charactère et contient au moins 1 lettre majuscule",
                errorAr : "كلمة السر يجب أن لا تقل عن 8 أحرف و تحتوي على الأقل حرفا لاتيني كبير"
            });
        }
        if (new_pass.value !== confirm_pass.value){
            errors.push({
                id : "password",
                error : "Les mots de passe ne sont pas identiques",
                errorAr : "كلمات السر الجديدة غير متطابقة"
            });
        }
             if (new_pass.value.length > 128){
            errors.push({
                id : "password",
                error : "Le mot de passe es trop long",
                errorAr : "كلمة السر طويلة جدا"
            });
        }
    }
    else {
        errors.push({
            id : "Password",
            error : "Assurez de remplir tous les champs s'il vous plaît.",
            errorAr : "تحقق من ملئ جميع البيانات المطلوبة من فضلك"
        })
    }

    return errors;
}

export default ValidateDataUpdatePass;