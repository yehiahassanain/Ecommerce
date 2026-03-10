import React, { useEffect } from 'react';
import Style from './ProtectedRoute.module.css';
import { Navigate } from 'react-router-dom';


export default function ProtectedRoute(props) {
    // const [counter, setCounter] = React.useState(0);
    useEffect(() => {

    }, []);
    console.log(props);
    if (localStorage.getItem("token") !== null) {
      return props.children;
    }else {
      return <Navigate to="/login" />;
    }
  
}
