"use client"
import React, { useEffect, useState } from "react";
import Login from "../Login";

const withAuth = Component => {
  const Auth = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
      const value = !!localStorage.getItem("token");
      setIsLoggedIn(value);
    }, []);
    if (!isLoggedIn) return <Login />

    return <Component {...props} />;
  };

  if (Component.getInitialProps) {
    Auth.getInitialProps = Component.getInitialProps;
  }

  return Auth;
};

export default withAuth;
