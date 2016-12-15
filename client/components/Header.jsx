import React from 'react';

const Header = ({ user, login, logout, loggedIn }) => {
  let btn;
  if (loggedIn) {
    btn = (<button
      onClick={logout}
      >Log Out</button>);
  } else {
    btn = (<button
      onClick={login}
      >Log In</button>);
  }
  return (<div className="header">
    {btn}
  </div>);
};

export default Header;
