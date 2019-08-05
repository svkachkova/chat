import React from 'react';
import { Switch, Route } from 'react-router-dom';

import PromoPage from './Components/pages/PromoPage';
import SignUpPage from './Components/pages/SignUpPage';
import LogInPage from './Components/pages/LogInPage';
import Chat from './Components/pages/Chat';
import NoMatch from './Components/pages/NoMatch';

const App: React.FC = () => {
  return (
    <div className="vertical-center">
      <Switch>
        <Route exact path="/" component={PromoPage}/>
        <Route path="/signup" component={SignUpPage}/>
        <Route path="/loggin" component={LogInPage}/>
        <Route path="/chat/:id" component={Chat}/>
        <Route component={NoMatch} />
      </Switch>
    </div>
  );
}

export default App;
