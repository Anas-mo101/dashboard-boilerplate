import React, { FC } from "react";
import { Route as RouterRoute, Redirect, RouteProps } from "react-router-dom";

import Spinner from "../components/Spinner";
import { useAuthContext } from "../context/AuthContext";

interface CustomRouteProps extends RouteProps {
  component: React.ComponentType<any>;
  isPrivate?: boolean;
}

const Route: FC<CustomRouteProps> = ({ component: Component, isPrivate = false, ...rest }) => {
  const { isAuth, loading } = useAuthContext();

  if (!isAuth && isPrivate) {
    return (
      <>
        {loading && <Spinner />}
        <Redirect to={{ pathname: "/login", state: { from: rest.location } }} />
      </>
    );
  }

  if (isAuth && !isPrivate) {
    return (
      <>
        {loading && <Spinner />}
        <Redirect to={{ pathname: "/", state: { from: rest.location } }} />
      </>
    );
  }

  return (
    <>
      {loading && <Spinner />}
      <RouterRoute {...rest} component={Component} />
    </>
  );
};

export default Route;
