import React from 'react';
import Auth0Lock from 'auth0-lock';
import { login } from '../utils/requests';
import Header from './Header.jsx';

const clientId = 'YUID0MQgktl0NyWXD1UFwbD0GBS4PYQe';
const domain = 'joshwentworth.auth0.com';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false,
      validUser: false,
      user: null,
    };
    this.lock = new Auth0Lock(clientId, domain);
    // Add callback for lock `authenticated` event
    this.lock.on('authenticated', this.authenticate.bind(this));
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.confirmNewUser = this.confirmNewUser.bind(this);
  }

  componentDidMount() {
    const profile = localStorage.getItem('id_token');
    if (!this.state.loggedIn && profile) {
      this.loadProfile(profile);
    }
  }

  loadProfile(idToken) {
    this.lock.getProfile(idToken, (err, profile) => {
      if (err) {
        console.log('error getting profile', err);
      } else {
        console.log(profile);
        login(profile.user_id).then((user) => {
          if (!user.data) {
            this.setState({
              loggedIn: true,
              validUser: false,
              user: profile,
            });
          } else if (user.data) {
            profile.org_id = user.data.org_id;
            profile.super = user.data.super;
            this.setState({
              loggedIn: true,
              validUser: true,
              user: profile,
            });
          }
        });
      }
    });
  }

  authenticate(authResult) {
    localStorage.setItem('id_token', authResult.idToken);
    this.loadProfile(authResult.idToken);
  }

  login() {
    this.lock.show();
  }

  logout() {
    localStorage.removeItem('id_token');
    this.setState({
      loggedIn: false,
      validUser: false,
      user: null,
    });
  }

  confirmNewUser(org) {
    const { user } = this.state;
    user.org_id = org.id;
    this.setState({
      loggedIn: true,
      validUser: true,
      user,
    });
  }

  render() {
    const { user, loggedIn } = this.state;
    return (
      <div >
        <div className="BG" />
        <Header
          user={user}
          loggedIn={loggedIn}
          login={this.login}
          logout={this.logout}
        />
        <h2>Manage the Media</h2>
      </div>
    );
  }
}

export default App;
