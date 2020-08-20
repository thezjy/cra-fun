// @flow

import React, { Suspense } from 'react'
import graphql from 'babel-plugin-relay/macro'
import {
  RelayEnvironmentProvider,
  usePreloadedQuery,
  useQueryLoader,
} from 'react-relay/hooks'
import relayEnvironment from './relayEnvironment'
import type { AppQuery } from './__generated__/AppQuery.graphql.js'

const query = graphql`
  query AppQuery {
    viewer {
      login
    }
  }
`

const NameDisplay = ({ queryReference }) => {
  const data = usePreloadedQuery<AppQuery>(query, queryReference)
  return <h1>{data.viewer.login}</h1>
}

const App = () => {
  const [queryReference, loadQuery, disposeQuery] = useQueryLoader(query)

  return (
    <>
      {queryReference == null && (
        <button onClick={() => loadQuery({})}>Click to reveal the name</button>
      )}
      {queryReference != null && (
        <>
          <button onClick={disposeQuery}>
            Click to hide the name and dispose the query.
          </button>
          <Suspense fallback={<h1>Loading</h1>}>
            <NameDisplay queryReference={queryReference} />
          </Suspense>
        </>
      )}
    </>
  )
}

function AppRoot() {
  return (
    <RelayEnvironmentProvider environment={relayEnvironment}>
      <App />
    </RelayEnvironmentProvider>
  )
}

export default AppRoot
