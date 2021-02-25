import * as Yup from "yup";

const LoginSchema = Yup.object().shape({
  username: Yup.string().required("Enter Your Username"),
  password: Yup.string().required("Enter Your Password "),
});

export default LoginSchema;
