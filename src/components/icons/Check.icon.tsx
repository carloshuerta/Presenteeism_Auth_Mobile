import * as React from "react"
import Svg, { Path } from "react-native-svg"

function CheckIcon(props) {
    return (
        <Svg
            width={38}
            height={38}
            viewBox="0 0 38 38"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <Path
            d="M19 35.964c9.37 0 16.964-7.595 16.964-16.964C35.964 9.63 28.37 2.036 19 2.036 9.63 2.036 2.036 9.63 2.036 19c0 9.37 7.595 16.964 16.964 16.964z"
            fill="#E1E1E1"
            stroke="#7D7D7D"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            />
            <Path
            d="M12.214 20.696l4.935 5.09c2.323-6.671 4.257-9.598 8.637-13.572"
            stroke="#7D7D7D"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            />
        </Svg>
    )
}

export default CheckIcon