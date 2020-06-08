import React from 'react'
import ReactDOM from 'react-dom'
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import './style/index.css'
import { split } from 'apollo-link'
import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition } from 'apollo-utilities'
import App from './components/App'

/*
This module creates the insertion point for the creation of the rect project. This component calls the "APP" component, as well as sets variables for endpoints for API calls
*/
// creates the web socket for subscriptions
const wsLink = new WebSocketLink({
  uri: 'ws://localhost:4000/',
  options: {
    reconnect: true
  }
})
// creates the link to the local dev. server  
const httpLink = new HttpLink({ uri: 'http://localhost:4000' })

/*Evaluates if the type of query is a subscription or regular call, and routes as appropriate
*/
const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query)
    return kind === 'OperationDefinition' && operation === 'subscription'
  },
  wsLink,
  httpLink,
)

// Starts the apollo client and calls the link variable
const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
})


ReactDOM.render(
  <ApolloProvider client={client}>
    <div>
    <link rel='stylesheet' href='https://fonts.googleapis.com/icon?family=Material+Icons'/>
    <App />
    </div>
  </ApolloProvider>,
  document.getElementById('root'),
)