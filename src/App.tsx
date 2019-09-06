import React, { Component, Suspense, lazy } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Promo from './containers/Promo';
import NotFound from './containers/NotFound';

const Cookies = require('js-cookie');

const SignUp = lazy(() => import('./containers/SignUp'));
const LogIn = lazy(() => import('./containers/LogIn'));
const Contacts = lazy(() => import('./containers/Contacts'));
const Chat = lazy(() => import('./containers/Chat'));

type UserData = {
    login: string;
    password: string;
}

type State = {
    isCreated: boolean;
    isLoggin: boolean;
    token: string;
    user: UserData;
}

// type A = B & C;
// type B = {}
// type C = {}

class App extends Component<{}, State> {
    constructor(props: {}) {
        super(props);

        this.state = {
            isCreated: false,
            isLoggin: false,
            token: Cookies.get('token') || '',
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

        const callback = (response: any) => {
            const { login } = this.state.user;

            this.setState({
                isCreated: true,
                user: {
                    login: login,
                    password: ''
                }
            });
        };

        submit(url, callback);
    }

    handleLogInSubmit() {
        const { login, password } = this.state.user;
        const url: string = `http://192.168.1.6:3912/api/login?login=${login}&password=${password}`;

        const callback = (response: any) => {
            const { login } = this.state.user;

            this.setState({
                isLoggin: true,
                token: response.token,
                user: {
                    login: login,
                    password: ''
                }
            });
            document.cookie = `token=${response.token}`;
        }

        submit(url, callback);
    }

    render() {
        const contactUserLogin: string = 'abcabc';

        return (
            <div className='vertical-center'>
            <Suspense fallback={<h1>Loading...</h1>}>
                <Switch>
                    <Route exact path='/' component={Promo}/>
            
                    <Route path='/signup' render={() => (
                        this.state.isCreated ? (
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
                        <Contacts 
                            token={this.state.token} 
                            userLogin={this.state.user.login}
                        />
                    )}/>

                    <Route path={`/chat/${contactUserLogin}`} render={() => (
                        <Chat 
                            token={this.state.token} 
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

function submit(url: string, callback: (response: any) => void) {

    const options: RequestInit = {
        method: 'GET',
        mode: 'cors',
    };

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
