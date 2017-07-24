import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from './Home';
import Register from './Register';
import Login from './Login';

export default () =>
  (<BrowserRouter>
    <Switch>
      <Route path="/" render={() => <Home />} exact />
      <Route path="/register" render={() => <Register />} exact />
      <Route path="/login" render={() => <Login />} exact />
    </Switch>
  </BrowserRouter>);
