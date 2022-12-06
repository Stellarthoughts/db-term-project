import React from "react"
import AuthContextType from "./contextType"

export const authContext = React.createContext<AuthContextType>(null!)

export default authContext