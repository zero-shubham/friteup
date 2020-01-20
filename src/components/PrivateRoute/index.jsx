import React, { useEffect, useState } from "react"
import { Redirect, navigate } from "@reach/router"
import { VALIDATE } from "../../services/gqlTags"
import { useQuery } from "@apollo/react-hooks"
import Backdrop from "../Backdrop"

const PrivateRoute = props => {
  const userId = props.userId
  const { loading, error, data } = useQuery(VALIDATE, {
    variables: { user_id: userId },
  })
  const [render, setRender] = useState(<Backdrop show={true} />)

  useEffect(() => {
    if (!loading && data) {
      if (data.user_validate && !data.user_validate.valid) {
        setRender("")
        navigate("/sign-in")
      } else if (data.user_validate && data.user_validate.valid) {
        const Component = props.component
        setRender(
          <Component path={props.path} userId={data.user_validate.user_id} />
        )
      } else if (!data.user_validate) {
        setRender("")
        navigate("/sign-in")
      }
    } else if (!loading && error) {
      setRender("")
      navigate("/sign-in")
    }
  }, [loading, error, data])
  return <>{render}</>
}
export default PrivateRoute
