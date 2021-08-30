import { GraphQLClient } from 'graphql-request';
let API_URL = 'http://localhost:4000/graphql';
if (import.meta.env.VITE_API_URL) {
    API_URL = import.meta.env.VITE_API_URL!;
}

const client = new GraphQLClient(API_URL);

export default client;
