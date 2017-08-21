import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider, ApolloClient, createNetworkInterface } from 'react-apollo';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { SubscriptionClient, addGraphQLSubscriptions } from 'subscriptions-transport-ws';

import 'flexboxgrid/dist/flexboxgrid.min.css';

import Routes from './routes';

injectTapEventPlugin();

const networkInterface = createNetworkInterface({
  uri: 'http://localhost:3030/graphql',
});

const wsClient = new SubscriptionClient('ws://localhost:3030/subscriptions', {
  reconnect: true,
});

const networkInterfaceWithSubscriptions = addGraphQLSubscriptions(networkInterface, wsClient);

networkInterface.use([
  {
    applyMiddleware(req, next) {
      if (!req.options.headers) {
        req.options.headers = {};
      }
      req.options.headers['x-token'] = localStorage.getItem('token');
      req.options.headers['x-refresh-token'] = localStorage.getItem('refreshToken');
      next();
    },
  },
]);

const client = new ApolloClient({
  networkInterface: networkInterfaceWithSubscriptions,
});

const App = (
  <MuiThemeProvider>
    <ApolloProvider client={client}>
      <Routes />
    </ApolloProvider>
  </MuiThemeProvider>
);

ReactDOM.render(App, document.getElementById('root'));
