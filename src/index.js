import React from 'react';
import {render} from 'react-dom';
import App from './components/App';
import {ApolloProvider} from 'react-apollo';
import ApolloClient from 'apollo-boost';

export const client = new ApolloClient({
    uri: 'http://localhost:8000/graphql'
});

render(
    <ApolloProvider client={client}>
        <App/>
    </ApolloProvider>,
    document.getElementById('app')
);