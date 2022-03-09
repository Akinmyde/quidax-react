import { BookProvider } from "./context/BookContext";
import Screens from './screens';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';


const App = () => {
  const client = new ApolloClient({
    uri: 'https://quidax-feec-graphql.herokuapp.com/graphql',
    cache: new InMemoryCache()
  });

  return (
    <ApolloProvider client={client}>
      <BookProvider>
        <Screens />
      </BookProvider>
    </ApolloProvider>
  );
}

export default App;
