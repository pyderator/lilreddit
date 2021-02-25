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

export type CookieClearResponse = {
  __typename?: 'CookieClearResponse';
  sucess: Scalars['Boolean'];
};

export type LoginInput = {
  password: Scalars['String'];
  username: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  login: AuthResponse;
  logout: CookieClearResponse;
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

export type LoginMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'AuthResponse' }
    & { data?: Maybe<(
      { __typename?: 'Author' }
      & Pick<Author, 'firstName' | 'username' | 'id' | 'email' | 'lastName'>
    )>, error?: Maybe<Array<(
      { __typename?: 'AuthError' }
      & Pick<AuthError, 'field' | 'message' | 'code'>
    )>> }
  ) }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & { logout: (
    { __typename?: 'CookieClearResponse' }
    & Pick<CookieClearResponse, 'sucess'>
  ) }
);

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

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me: (
    { __typename?: 'AuthResponse' }
    & { data?: Maybe<(
      { __typename?: 'Author' }
      & Pick<Author, 'username' | 'id'>
    )>, error?: Maybe<Array<(
      { __typename?: 'AuthError' }
      & Pick<AuthError, 'field' | 'message'>
    )>> }
  ) }
);


export const LoginDocument = gql`
    mutation login($username: String!, $password: String!) {
  login(loginInput: {username: $username, password: $password}) {
    data {
      firstName
      username
      id
      email
      lastName
    }
    error {
      field
      message
      code
    }
  }
}
    `;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const LogoutDocument = gql`
    mutation logout {
  logout {
    sucess
  }
}
    `;

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument);
};
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
export const MeDocument = gql`
    query me {
  me {
    data {
      username
      id
    }
    error {
      field
      message
    }
  }
}
    `;

export function useMeQuery(options: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<MeQuery>({ query: MeDocument, ...options });
};