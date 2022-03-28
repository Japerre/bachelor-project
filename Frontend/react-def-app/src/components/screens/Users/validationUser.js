
export default function validationUser(values) {
    let errors = {}

    if(!values?.userName.trim()){
        errors.userName = "Username required"
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
    return errors;
}
