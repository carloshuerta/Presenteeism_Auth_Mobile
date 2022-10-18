import * as React from "react"
import Svg, { Path } from "react-native-svg"

function LocationIcon(props) {
  return (
    <Svg
      width={39}
      height={39}
      viewBox="0 0 39 39"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M20.086 36.449c2.578-2.088 12.777-10.982 12.777-20.996 0-7.38-5.983-13.364-13.363-13.364S6.137 8.072 6.137 15.453c0 10.014 10.199 18.908 12.777 20.996.344.28.828.28 1.172 0z"
        fill="#E1E1E1"
        stroke="#7D7D7D"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M19.5 20.141a5.473 5.473 0 100-10.947 5.473 5.473 0 000 10.947z"
        fill="#E1E1E1"
        stroke="#7D7D7D"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default LocationIcon