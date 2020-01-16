import React from "react"
import Tooltip from "@material-ui/core/Tooltip"
import Zoom from "@material-ui/core/Zoom"
import { withStyles } from "@material-ui/core/styles"
import styles from "./ButtonWithTooltip.module.scss"

export const ChangedTooltip = withStyles(theme => ({
  tooltip: {
    fontSize: 10,
  },
}))(Tooltip)
const ButtonWithTooltip = ({ alt, svg, onClick }) => {
  return (
    <ChangedTooltip
      title={alt}
      placement="top"
      arrow={true}
      TransitionComponent={Zoom}
    >
      <img src={svg} alt={alt} className={styles.svg} onClick={onClick} />
    </ChangedTooltip>
  )
}
export default ButtonWithTooltip
