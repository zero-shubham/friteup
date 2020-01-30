import React from "react"
import Avatar from "@material-ui/core/Avatar"
import { makeStyles } from "@material-ui/core/styles"
import { deepOrange, deepPurple, blue, red } from "@material-ui/core/colors"
import Zoom from "@material-ui/core/Zoom"
import { ChangedTooltip } from "../ButtonWithTooltip"

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    "& > *": {
      fontSize: "2rem",
      cursor: "pointer",
    },
  },
  orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
  blue: {
    color: theme.palette.getContrastText(blue[500]),
    backgroundColor: blue[500],
  },
  red: {
    color: theme.palette.getContrastText(red[500]),
    backgroundColor: red[500],
  },
}))

const UserNameAvatar = ({ nameInitials, name, onClick}) => {
  const classes = useStyles()
  const arrOfClasses = ["orange", "purple", "blue", "red"]
  const randIndx = Math.floor(Math.random() * 4) + 0
  return (
    <div className={classes.root} onClick={onClick}>
      <ChangedTooltip
        title={name ? `Hi ${name}!` : ""}
        placement="top"
        arrow={true}
        TransitionComponent={Zoom}
      >
        <Avatar className={classes[arrOfClasses[randIndx]]}>
          {nameInitials}
        </Avatar>
      </ChangedTooltip>
    </div>
  )
}

export default UserNameAvatar
