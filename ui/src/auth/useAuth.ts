import React from "react";
import authContext from "./context";

export default function useAuth() {
	return React.useContext(authContext);
}