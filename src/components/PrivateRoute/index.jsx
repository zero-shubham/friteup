import React, { useEffect, useState } from "react"
import { Redirect, navigate } from "@reach/router"
import { gql } from "apollo-boost"
import { useQuery } from "@apollo/react-hooks"
import Backdrop from "../Backdrop"

const VALIDATE = gql`
  query UserValidate($user_id: ID!) {
    user_validate(user_id: $user_id) {
      user_id
      valid
    }
  }
`

const PrivateRoute = props => {
  const userId = props.userId
  const { loading, error, data } = useQuery(VALIDATE, {
    variables: { user_id: userId },
  })
  const [render, setRender] = useState(<Backdrop show={true} />)

  useEffect(() => {
    if (!loading && data) {
      if (!data.user_validate.valid) {
        setRender("")
        navigate("/sign-in")
      } else if (data.user_validate.valid) {
        const Component = props.component
        setRender(
          <Component path={props.path} userId={data.user_validate.user_id} />
        )
      }
    } else if (!loading && error) {
      setRender("")
      navigate("/sign-in")
    }
  }, [loading, error, data])
  return <>{render}</>
}
export default PrivateRoute
