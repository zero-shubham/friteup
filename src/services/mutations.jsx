import { gql } from "apollo-boost"
export const CHANGE_PASSWORD = gql`
  mutation ChangePassword($old_password: String!, $new_password: String!) {
    change_password(old_password: $old_password, new_password: $new_password)
  }
`

export const UPDATE_USER = gql`
  mutation UpdateUser($email: String, $name: String, $night_mode: Boolean, $bio: String) {
    update_user(data: {
      name: $name,
      email: $email,
      night_mode: $night_mode,
      bio: $bio
    }){
      name
      email
      night_mode
      bio
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

export const SIGNIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      user {
        id
      }
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