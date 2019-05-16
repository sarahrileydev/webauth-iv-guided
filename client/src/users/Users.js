import React from "react";
import axios from "axios";

//use HOC
import requiresAuth from "../auth/requiresAuth";

class Users extends React.Component {
  state = {
    users: []
  };

  render() {
    return (
      <>
        <h2>List of Users</h2>
        <ul>
          {this.state.users.map(u => (
            <li key={u.id}>{u.username}</li>
          ))}
        </ul>
      </>
    );
  }

  componentDidMount() {
    axios.get("/users").then(res => {
      this.setState({ users: res.data });
    });
  }
}

export default requiresAuth(Users);
