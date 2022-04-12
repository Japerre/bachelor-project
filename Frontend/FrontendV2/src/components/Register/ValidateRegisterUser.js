
export default function ValidateRegisterUser(values){
    let errors = {}
    let regex = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@student.kuleuven.be$/)

    if(!values.userName.trim()){
        errors.userName = "Email is required"
    }else if(!regex.test(values.userName)){
        errors.userName = "Email is not valid (user your Kuleuven email)"
    }
    if (!values?.role){
        errors.role = "Role required"
    }
    if (!values?.password){
        errors.password = "Password required"
    } else if (values?.password.length < 6) {
        errors.password = "Password must be 6 characters or more";
    }

    if (!values?.password2){
        errors.password = "Password required"
    } else if (values?.password2 !== values?.password) {
        errors.password = "Passwords do not match!";
    }

    if (!values?.firstName){
        errors.firstName = "Firstname is required"
    }

    if (!values?.lastName){
        errors.lastName = "Lastname is required"
    }

    return errors;
}