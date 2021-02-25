import { AuthError } from "../generated/graphql";

const convertErrors = (errors) => {
  const convertedErrors = {};
  errors.forEach((e) => (convertedErrors[e.field] = e.message));
  return convertedErrors;
};

export default convertErrors;
