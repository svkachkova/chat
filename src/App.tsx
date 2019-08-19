import React, { Component, Suspense, lazy } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Promo from './containers/Promo';
import NotFound from './containers/NotFound';

const SignUp = lazy(() => import('./containers/SignUp'));
const LogIn = lazy(() => import('./containers/LogIn'));
const Contacts = lazy(() => import('./containers/Contacts'));
const Chat = lazy(() => import('./containers/Chat'));

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

class App extends Component<{}, State> {
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

        this.handleUserChange = this.handleUserChange.bind(this);
        this.handleSignUpSubmit = this.handleSignUpSubmit.bind(this);
        this.handleLogInSubmit = this.handleLogInSubmit.bind(this);
    }

    handleUserChange(data: UserData) {
        this.setState({
            user: data
        });
    }

    handleSignUpSubmit() {
        const { login, password } = this.state.user;

        const url: string = `http://192.168.1.6:3912/api/createUser?login=${login}&password=${password}`;
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

    handleLogInSubmit() {
        const { login, password } = this.state.user;
        
        const url: string = `http://192.168.1.6:3912/api/login?login=${login}&password=${password}`;
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
        const contactUserLogin: string = 'user1';

        return (
            <div className='vertical-center'>
            <Suspense fallback={<h1>Loading...</h1>}>
                <Switch>
                    <Route exact path='/' component={Promo}/>
            
                    <Route path='/signup' render={() => (
                        this.state.userIsCreated ? (
                        <Redirect to='/loggin' />
                        ) : (
                        <SignUp
                            userData={this.state.user}
                            handleChange={this.handleUserChange}
                            handleSubmit={() => this.handleSignUpSubmit()}
                        />)
                    )}/>

                    <Route path='/loggin' render={() => (
                        this.state.isLoggin ? (
                        <Redirect to='/contacts' />
                        ) : (
                        <LogIn 
                            userData={this.state.user}
                            handleChange={this.handleUserChange}
                            handleSubmit={() => this.handleLogInSubmit()}
                        />)
                    )}/>

                    <Route path='/contacts' render={() => (
                        <Contacts token={this.state.accessToken} />
                    )}/>

                    <Route path={`/chat/${contactUserLogin}`} render={() => (
                        <Chat 
                            token={this.state.accessToken} 
                            userLogin={this.state.user.login} 
                            contactUserLogin={contactUserLogin}
                        />
                    )}/>

                    <Route component={NotFound} />
                </Switch>
            </Suspense>
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
