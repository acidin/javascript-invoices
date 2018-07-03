import React from 'react';
import {render} from 'react-dom';
import App from './components/App';
import {ApolloProvider} from 'react-apollo';
import {ApolloClient, HttpLink, InMemoryCache} from 'apollo-client-preset';

// const client = new ApolloClient({
//     uri: "http://localhost:8000/graphql"
// });

export const client = new ApolloClient({
    link: new HttpLink({ uri: 'http://localhost:8000/graphql' } ),
    cache: new InMemoryCache(),
    connectToDevTools: true
});

render(
    <ApolloProvider client={client}>
        <App/>
    </ApolloProvider>,
    document.getElementById('app')
);