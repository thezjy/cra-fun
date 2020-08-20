// @flow

import { Environment, Network, RecordSource, Store } from 'relay-runtime'

const REACT_APP_GITHUB_AUTH_TOKEN: any = process.env.REACT_APP_GITHUB_AUTH_TOKEN

function fetchQuery(operation, variables) {
  return fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      Authorization: `bearer ${REACT_APP_GITHUB_AUTH_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: operation.text,
      variables,
    }),
  }).then((response) => {
    return response.json()
  })
}

export default new Environment({
  network: Network.create(fetchQuery),
  store: new Store(new RecordSource()),
})
