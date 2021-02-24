import { FieldConfig, Form, Formik, FormikProps, useField } from "formik";
import React from "react";
import Layout from "../components/layout";
import { useRegisterMutation } from "../generated/graphql";
import RegistrationSchema from "../schema/registerValidation";

interface registerProps {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
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
  const [, registerUser] = useRegisterMutation();
  return (
    <Layout>
      <div className="max-w-screen-xl m-auto">
        <h1 className="text-center py-4 font-bold text-4xl">Register Page</h1>
        <div className="max-w-xl m-auto">
          <Formik
            initialValues={{
              firstName: "",
              lastName: "",
              email: "",
              username: "",
              password: "",
              confirmPassword: "",
            }}
            validationSchema={RegistrationSchema}
            onSubmit={async (values, { setErrors }) => {
              const { error, data } = await registerUser({
                ...values,
              });
              console.log(data);
              console.log(error);
            }}
          >
            {(props: FormikProps<registerProps>) => (
              <Form className="bg-blue-50 shadow-md rounded px-8 pt-6 pb-8 mb-4 mt-4">
                <InputField
                  name="firstName"
                  label="First Name"
                  placeholder="John"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline"
                />
                <InputField
                  name="lastName"
                  label="Last Name"
                  placeholder="Doe"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline"
                />
                <InputField
                  name="username"
                  label="Username"
                  placeholder="johhdoe"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline"
                />
                <InputField
                  name="email"
                  label="E-mail"
                  placeholder="johh@doe.com"
                  type="email"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline"
                />
                <InputField
                  name="password"
                  label="Password"
                  type="password"
                  placeholder="*******"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline"
                />

                <InputField
                  name="confirmPassword"
                  label="Confirm Password"
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
