import { gql } from "apollo-boost"

export const VALIDATE = gql`
  query UserValidate($user_id: ID!) {
    user_validate(user_id: $user_id) {
      user_id
      valid
    }
  }
`

export const SIGNUP = gql`
  mutation CreateUser($name: String!, $email: String!, $password: String!) {
    create_user(data: { name: $name, email: $email, password: $password }) {
      id
      email
      name
    }
  }
`
export const SIGNIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      user {
        id
      }
    }
  }
`
export const USER = gql`
  query User($user_id: ID!) {
    user(user_id: $user_id) {
      id
      name
      email
    }
  }
`

export const CREATE_POST = gql`
  mutation CreatePost($text: String!, $title: String!, $published: Boolean!) {
    create_post(text: $text, title: $title, published: $published) {
      id
      createdAt
      text
      published
    }
  }
`

export const LOGOUT = gql`
  mutation Logout {
    logout {
      logged_out
    }
  }
`

export const UPDATE_USER = gql`
  mutation UpdateUser($email: String, $name: String) {
    update_user(data: {
      name: $name,
      email: $email
    }){
      name
      email
      night_mode
    }
  }
`