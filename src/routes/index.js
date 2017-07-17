import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from './Home';
import Register from './Register';

export default () =>
  (<BrowserRouter>
    <Switch>
      <Route path="/" render={() => <Home />} exact />
      <Route path="/register" render={() => <Register />} exact />
    </Switch>
  </BrowserRouter>);
