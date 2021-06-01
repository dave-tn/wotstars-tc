import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { App } from './App'
import reportWebVitals from './reportWebVitals'

import { ApolloProvider } from '@apollo/client/react'
import { ApolloClient, InMemoryCache } from '@apollo/client'

import { Provider as ReduxProvider } from 'react-redux'
import { store } from './reduxStore'

const client = new ApolloClient({
  // uri: 'http://localhost:4000', // for now...
  uri: 'https://mhjlm8bnja.execute-api.eu-west-2.amazonaws.com/production/graphql',
  cache: new InMemoryCache()
})


ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <ReduxProvider store={store} >
        <App />
      </ReduxProvider> 
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
)


// More info: https://bit.ly/CRA-vitals
if (process.env.NODE_ENV === 'development') {
  reportWebVitals(console.log)
}
