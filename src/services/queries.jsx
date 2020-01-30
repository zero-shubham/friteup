import { gql } from "apollo-boost"

export const VALIDATE = gql`
  query UserValidate($user_id: ID!) {
    user_validate(user_id: $user_id) {
      user_id
      valid
    }
  }
`

export const USER = gql`
  query User($user_id: ID!) {
    user(user_id: $user_id) {
      id
      name
      email
      night_mode
      bio
    }
  }
`

export const USER_WITH_POST = gql`
  query User($user_id: ID!) {
    user(user_id: $user_id) {
      id
      name
      email
      night_mode
      bio
      subscribers {
        id
      }
      posts {
        id
        text
        title
        createdAt
        up_vote
        down_vote
        comments {
          id
          text
          user {
            id
            name
          }
        }
      }
    }
  }
`
