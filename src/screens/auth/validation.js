const checkEmailValidation = (email)=>{
    let emailFormat =  /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,3}$/i;
    let checkEmail = emailFormat.test(email);

    if(checkEmail){
        return true
    } else {
        return false
    }
}



export {checkEmailValidation}