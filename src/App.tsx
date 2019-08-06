import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import events from 'events';

import PromoPage from './Components/pages/PromoPage';
import SignUpPage from './Components/pages/SignUpPage';
import LogInPage from './Components/pages/LogInPage';
import Chat from './Components/pages/Chat';
import NoMatch from './Components/pages/NoMatch';

(window as any).ee = new events.EventEmitter();

interface UserData {
  login: string;
  password: string;
}

interface State {
  userIsCreated: boolean;
  isLoggin: boolean;
  accessToken: string;
  user: UserData;
}

class App extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);

    this.state = {
      userIsCreated: false,
      isLoggin: false,
      accessToken: '',
      user: {
        login: '',
        password: ''
      }
    };

    this.handleSignUp = this.handleSignUp.bind(this);
    this.handleLogIn = this.handleLogIn.bind(this);
  }

  componentDidMount() {
    const self = this;

    (window as any).ee.addListener('getUserData', (data: UserData) => {
      self.setState({
        user: data
      });
    });
  }

  componentWillUnmount() {
    (window as any).ee.removeListener('getUserData');
  }

  handleSignUp() {
    const { login, password } = this.state.user;

    const url: string = `http://192.168.1.2:3912/api/createUser?login=${login}&password=${password}`;
    const options: RequestInit = {
      method: 'GET',
      mode: 'cors',
    };

    const callback = (response: any) => {
      this.setState({
        userIsCreated: true
      });
    };

    submit(url, options, callback);
  }

  handleLogIn() {
    const { login, password } = this.state.user;
    
    const url: string = `http://192.168.1.2:3912/api/login?login=${login}&password=${password}`;
    const options: RequestInit = {
      method: 'GET',
      mode: 'cors',
    };

    const callback = (response: any) => {
      this.setState({
        isLoggin: true,
        accessToken: response.token
     });
    }

    submit(url, options, callback);
  }

  render() {
    return (
      <div className='vertical-center'>
        <Switch>
          <Route exact path='/' component={PromoPage}/>

          {/* <Route path='/signup' component={SignUpPage}/> */}
   
          <Route path='/signup' render={() => (
            this.state.userIsCreated ? (
              <Redirect to='/loggin' />
            ) : (
              <SignUpPage handleSubmit={() => {}}/>
            )
          )}/>

          {/* <Route path='/loggin' component={LogInPage}/> */}

          <Route path='/loggin' render={() => (
            this.state.isLoggin ? (
              <Redirect to='/chat/:id' />
            ) : (
              <LogInPage handleSubmit={() => {}}/>
            )
          )}/>

          <Route path='/chat/:id' component={Chat}/>
          <Route component={NoMatch} />
        </Switch>
      </div>
    );
  }
}

export default App;

function submit(url: string, options: RequestInit, callback: (response: any) => void) {

  fetch(url, options)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Network response was not ok.');
    })
    .then(serverResponse => {
      if (serverResponse.status) {
        callback(serverResponse);
      } else {
        console.log(serverResponse.message);
      }
    })
    .catch(error => console.log(error.message));
}
