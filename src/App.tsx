import React from 'react';
import { Switch, Route } from 'react-router-dom';

import PromoPage from './Components/PromoPage';
import SignUpPage from './Components/SingUpPage';
import LogInPage from './Components/LogInPage';
import Chat from './Components/Chat';

const App: React.FC = () => {
  return (
    <div className="vertical-center">
      <Switch>
        <Route exact path="/" component={PromoPage}/>
        <Route exact path="/signup" component={SignUpPage}/>
        <Route exact path="/loggin" component={LogInPage}/>
        <Route exact path="/chat" component={Chat}/>
      </Switch>
    </div>
  );
}

export default App;
