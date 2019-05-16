import React from "react";
import axios from "axios";

//tell axios where to find api

axios.defaults.baseURL = "http://localhost:5000/api";

//interceptors can execute code before a request happens or when a response comes in
axios.interceptors.request.use(
  function(options) {
    //this function has access to the request options passed to axios
    // if we do axios.get('/api', reqOptions)
    //axios will pass reqOptions object as the first argument to this function
    //read the token from localStorage and attach it to the request as the auth header
    //take the token and attach it to the auth header with every request we make

    options.headers.authorization = localStorage.getItem("jwt");
    //now any components rendered by this HOC will attach the token automatically

    return options; //we must return the modified options back to axios
  },
  function(error) {
    //do something with the error
    return Promise.reject(error);
  }
);

export default function(Component) {
  return class Authenticated extends React.Component {
    render() {
      const token = localStorage.getItem("jwt");

      const notLoggedIn = <div>Please Login to see the users</div>;
      //if there is no token then show a message to the user
      return <>{token ? <Component {...this.props} /> : notLoggedIn} </>;
    }
  };
}
