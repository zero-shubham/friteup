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
      subscribers
      subscribed
    }
  }
`

export const USERS = gql`
  query Users($user_ids: [ID]) {
    users(user_ids: $user_ids) {
      id
      name
      email
      bio
      subscribers
      subscribed
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
      subscribers
      subscribed
      posts {
        id
        text
        title
        created_at
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
export const SEARCH = gql`
  query Search($keyword: String!) {
    search(keyword: $keyword) {
      users {
        id
        name
        email
        bio
        subscribers
      }
      posts {
        id
        user {
          id
          name
          bio
          subscribers
        }
        text
        title
        up_vote
        down_vote
      }
    }
  }
`

export const FEED = gql`
  query Feed {
    feed {
      id
      title
      text
      created_at
      up_vote
      down_vote
      user {
        name
        id
        subscribers
      }
    }
  }
`