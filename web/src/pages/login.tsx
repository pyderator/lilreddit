import { FieldConfig, Form, Formik, FormikProps, useField } from "formik";
import React from "react";
import Layout from "../components/layout";
import { useLoginMutation } from "../generated/graphql";
import LoginSchema from "../schema/loginValidation";
import convertErrors from "../utils/convertError";
import { useRouter } from "next/router";
interface loginProps {
  username: string;
  password: string;
}

const InputField: React.FC<
  FieldConfig & { label: string; placeholder: string; className: string }
> = ({ label, ...props }) => {
  const [field, meta, helper] = useField(props);

  return (
    <div className="mb-4">
      <label
        className="block text-gray-700 text-md font-bold mb-2"
        htmlFor="firstname"
      >
        {label}
      </label>
      <input {...field} {...props} />
      {meta.error && meta.touched ? (
        <p className="text-red-600 text-sm pt-2">{meta.error}</p>
      ) : null}
    </div>
  );
};

const Register = () => {
  const [, loginUser] = useLoginMutation();
  const router = useRouter();
  return (
    <Layout>
      <div className="max-w-screen-xl m-auto">
        <h1 className="text-center py-4 font-bold text-4xl">Login Page</h1>
        <div className="max-w-xl m-auto">
          <Formik
            initialValues={{
              username: "",
              password: "",
            }}
            validationSchema={LoginSchema}
            onSubmit={async (values, { setErrors }) => {
              const { error, data } = await loginUser({
                ...values,
              });

              data.login.error
                ? setErrors(convertErrors(data.login.error))
                : router.push("/");
            }}
          >
            {(props: FormikProps<loginProps>) => (
              <Form className="bg-blue-50 shadow-md rounded px-8 pt-6 pb-8 mb-4 mt-4">
                <InputField
                  name="username"
                  label="Username"
                  placeholder="johhdoe"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline"
                />
                <InputField
                  name="password"
                  label="Password"
                  type="password"
                  placeholder="*******"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline"
                />

                <button
                  type="submit"
                  className="py-2 px-4 mt-2 bg-blue-500 text-md outline-none rounded-md appearance-none hover:bg-blue-600 text-white font-bold"
                >
                  Register
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </Layout>
  );
};

export default Register;
