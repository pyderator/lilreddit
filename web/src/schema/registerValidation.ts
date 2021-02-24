import * as Yup from "yup";

const Schema = Yup.object().shape({
  firstName: Yup.string().min(4).max(10).required("Enter Your First Name"),
  lastName: Yup.string().min(4).max(10).required("Enter Your Last Name"),
  username: Yup.string().min(4).max(10).required("Enter Your Username"),
  email: Yup.string().email().required("Enter Your Email"),
  password: Yup.string().min(4).max(10).required("Enter Your Password "),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Passwords must match"
  ),
});

export default Schema;
