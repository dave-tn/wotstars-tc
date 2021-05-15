import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { App } from './App'
import reportWebVitals from './reportWebVitals'


import { ApolloProvider } from '@apollo/client/react'

import { ApolloClient, InMemoryCache } from '@apollo/client'

// const client = new ApolloClient({ uri, cache });
const client = new ApolloClient({
  uri: 'http://localhost:4000', // for now...
  cache: new InMemoryCache()
})

// client.query({
//   query: gql`
//     query GetTanks {
//       tanks {
//         id
//         user_string
//       }
//     }
//   `
// })
// .then(result => console.log(result))

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
)


// More info: https://bit.ly/CRA-vitals
if (process.env.NODE_ENV === 'development') {
  reportWebVitals(console.log)
}
