import React, { useEffect, useState } from "react"
import { navigate } from "@reach/router"
import { VALIDATE } from "../../services/gqlTags"
import { useLazyQuery } from "@apollo/react-hooks"
import Backdrop from "../Backdrop"

const PrivateRoute = props => {
  const userId = props.userId
  const [userValidate, { loading, error, data }] = useLazyQuery(VALIDATE)
  const [render, setRender] = useState(<Backdrop show={true} />)
  let queryCalled = false

  const initQuery = async () => {
    if (userId) {
      queryCalled = true
      const response = await userValidate({
        variables: { user_id: userId },
      })
      console.log("response ==>", response)
      queryCalled = false
    }
  }

  useEffect(() => {
    initQuery()
  }, [props.userId])

  useEffect(() => console.log(queryCalled, ":::"), [queryCalled])
  useEffect(() => {
    console.log(queryCalled, "<---")
    if (!loading && data && !queryCalled) {
      if (data.user_validate && !data.user_validate.valid) {
        console.log("back to signin 1")
        setRender("")
        navigate("/sign-in")
        
      } else if (data.user_validate && data.user_validate.valid) {
        const Component = props.component
        setRender(
          <Component path={props.path} userId={data.user_validate.user_id} />
        )
      } else if (!data.user_validate) {
        console.log("back to signin 3")
        setRender("")
        navigate("/sign-in")
      }
    } else if (!loading && error && !queryCalled) {
      console.log("back to signin 2")
      setRender("")
      navigate("/sign-in")
    }
  }, [loading, error, data])
  return <>{render}</>
}
export default PrivateRoute
