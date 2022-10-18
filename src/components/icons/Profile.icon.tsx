import * as React from "react"
import Svg, { Circle, Path } from "react-native-svg"

function ProfileIcon(props) {
  return (
    <Svg
      width={119}
      height={119}
      viewBox="0 0 119 119"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Circle cx={59.5} cy={59.5} r={59.5} fill="#fff" />
      <Circle cx={59.5} cy={59.5} r={56.5} fill="#5570F1" />
      <Path
        d="M92 79.872C92 89.743 77.673 90 60 90c-17.673 0-32-.257-32-10.128C28 70.002 42.327 62 60 62c17.673 0 32 8.002 32 17.872z"
        fill="#fff"
      />
      <Circle cx={59.5} cy={39.5} r={14.5} fill="#fff" />
    </Svg>
  )
}

export default ProfileIcon