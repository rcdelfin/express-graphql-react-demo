import React, { Component } from 'react';
import './App.css';
import SearchProperties from './components/SearchProperties';

import {
  ApolloClient,
  ApolloProvider,
  createNetworkInterface,
} from 'react-apollo';


const networkInterface = createNetworkInterface({ uri: 'http://localhost:4000/graphql' });

const client = new ApolloClient({
  networkInterface,
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div className="App">
          <div className="navbar">React + GraphQL Demo</div>
          <SearchProperties/>
        </div>
      </ApolloProvider>
    );
  }
}

export default App;