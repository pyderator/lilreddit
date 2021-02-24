import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type AuthError = {
  __typename?: 'AuthError';
  code?: Maybe<Scalars['Float']>;
  field: Scalars['String'];
  message: Scalars['String'];
};

export type AuthResponse = {
  __typename?: 'AuthResponse';
  data?: Maybe<Author>;
  error?: Maybe<Array<AuthError>>;
};

export type Author = {
  __typename?: 'Author';
  email: Scalars['String'];
  firstName: Scalars['String'];
  id: Scalars['Int'];
  lastName: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type LoginInput = {
  password: Scalars['String'];
  username: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  login: AuthResponse;
  register: AuthResponse;
};


export type MutationLoginArgs = {
  loginInput: LoginInput;
};


export type MutationRegisterArgs = {
  registerInput: RegisterInput;
};

export type Query = {
  __typename?: 'Query';
  helloWorld: Scalars['String'];
  me: AuthResponse;
};

export type RegisterInput = {
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type RegisterMutationVariables = Exact<{
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  email: Scalars['String'];
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'AuthResponse' }
    & { data?: Maybe<(
      { __typename?: 'Author' }
      & Pick<Author, 'email' | 'firstName' | 'id' | 'lastName' | 'password' | 'username'>
    )>, error?: Maybe<Array<(
      { __typename?: 'AuthError' }
      & Pick<AuthError, 'code' | 'field' | 'message'>
    )>> }
  ) }
);


export const RegisterDocument = gql`
    mutation register($firstName: String!, $lastName: String!, $email: String!, $username: String!, $password: String!) {
  register(
    registerInput: {firstName: $firstName, lastName: $lastName, email: $email, username: $username, password: $password}
  ) {
    data {
      email
      firstName
      id
      lastName
      password
      username
    }
    error {
      code
      field
      message
    }
  }
}
    `;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument);
};