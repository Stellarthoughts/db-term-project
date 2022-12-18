import React from "react"
import AuthContextType from "./contextType"

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const authContext = React.createContext<AuthContextType>(null!)

export default authContext