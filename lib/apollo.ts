import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import { useMemo } from 'react';


let apolloClient: ApolloClient<any> | null = null;

function createApolloClient() {
  const httpLink = new HttpLink({
    uri: (process as any).env.NEXT_PUBLIC_GRAPHQL_URL || 'http://localhost:4000/graphql',
    credentials: 'include' // change if you use Authorization header instead of cookie
  });

  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: httpLink,
    cache: new InMemoryCache()
  });
}

export function initializeApollo(initialState: any = null) {
  const _client = apolloClient ?? createApolloClient();
  if (initialState) {
    _client.cache.restore({ ..._client.extract(), ...initialState });
  }
  if (!apolloClient) apolloClient = _client;
  return _client;
}

export function useApollo(initialState: any) {
  const store = useMemo(() => initializeApollo(initialState), [initialState]);
  return store;
}
