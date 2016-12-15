import React from 'react';

const Header = ({ user, login, logout, loggedIn }) => {
  let loginClick;
  let loginText;
  if (loggedIn) {
    loginClick = logout;
    loginText = 'Log Out';
  } else {
    loginClick = login;
    loginText = 'Log In';
  }
  return (
    <div className="header">
      <button
        onClick={loginClick}
        className="logButton"
      >
        {loginText}
      </button>
      <button
        onClick={() => { console.log('CLICK at notifyButton') }}
        className="notifyButton"
      >
        Notifications
      </button>
      <div className="headerUserName">Hello, username</div>
      <div className="headerUserImg">user image here</div>
      <div className="headerLogo">logo here</div>
    </div>
  );
};

export default Header;

