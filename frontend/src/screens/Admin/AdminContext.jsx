import React, { Component } from "react";

const UserContext = React.createContext();

class UserProvider extends Component {
  // Context state
  state = {
    isUploaded: false,
  };

  // Method to update state
  setUser = () => {
    this.setState({ isUploaded: !this.state.isUploaded });
  };

  render() {
    const { children } = this.props;

    return (
      <UserContext.Provider
        value={{
          ...this.state,
          setUser: this.setUser,
        }}
      >
        {children}
      </UserContext.Provider>
    );
  }
}

export default UserContext;

export { UserProvider };
