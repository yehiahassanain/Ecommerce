/* eslint-disable react-hooks/set-state-in-effect */
import { createContext, useEffect, useState } from "react";

export let UserContext = createContext();

export default function UserContextProvider(props) {
    const [userLoggedIn, setUserLoggedIn] = useState(null);
    useEffect(() => {
        let token = localStorage.getItem("token");
        if(token !== null){
            setUserLoggedIn(token);
        }
    }, []);
  return (
    <UserContext.Provider value={{userLoggedIn, setUserLoggedIn}}>
      {props.children}
    </UserContext.Provider>
  );
}
