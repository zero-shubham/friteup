import React, { useEffect, useState } from "react"
import { navigate } from "@reach/router"
import { VALIDATE } from "../../services/queries"
import { useQuery } from "@apollo/react-hooks"
import Backdrop from "../Backdrop"

const PrivateRoute = props => {
  const userId = props.userId
  const { loading, error, data } = useQuery(VALIDATE, {
    variables: {
      user_id: userId,
    },
    fetchPolicy: "no-cache",
    pollInterval: 300000
  })
  const [render, setRender] = useState(<Backdrop show={true} />)

  useEffect(() => {
    if (!loading && data) {
      if (data.user_validate && data.user_validate.valid) {
        const Component = props.component
        setRender(
          <Component path={props.path} userId={data.user_validate.user_id} />
        )
      } else {
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
