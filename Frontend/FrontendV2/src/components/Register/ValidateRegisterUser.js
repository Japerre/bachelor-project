
export default function ValidateRegisterUser(values){
    let errors = {}
    let regex = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@student.kuleuven.be$/)

    console.log()

    if (!values?.user?.role){
        errors.role = "Role required"
    }

    if(!values?.user.userName){
        errors.userName = "Email is required"
    }else if(!regex.test(values?.userName)){
        errors.userName = "Email is not valid (user your Kuleuven email)"
    }

    if (!values.user?.password){
        errors.password = "Password required"
    } else if (values.user.password.length < 6) {
        errors.password = "Password must be 6 characters or more";
    }

    if (!values?.user?.password2){
        errors.password = "Password required"
    } else if (values?.user.password2 !== values?.user.password) {
        errors.password = "Passwords do not match!";
    }

    if (!values?.user.firstName){
        errors.firstName = "Firstname is required"
    }

    if (!values?.user.lastName){
        errors.lastName = "Lastname is required"
    }
    return errors;
}