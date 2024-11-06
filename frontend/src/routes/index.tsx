import { BrowserRouter, Switch } from "react-router-dom";

import LoggedInLayout from "../components/LoggedInLayout";
import { AuthProvider } from "../context/AuthContext";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";

import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import Route from "./Route";

function Routes() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Switch>
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />

          <LoggedInLayout>
            <Route exact path="/" component={Home} isPrivate />
          </LoggedInLayout>
        </Switch>
        <ToastContainer autoClose={3000} />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default Routes;
