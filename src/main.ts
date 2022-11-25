import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { ApolloClient, InMemoryCache } from "@apollo/client/core";
import { createApolloProvider } from "@vue/apollo-option";

const cache = new InMemoryCache();

const apolloClient = new ApolloClient({
  cache,
  uri: "https://still-rain-3600.fly.dev/graphql",
});

const apolloProvider = createApolloProvider({
  defaultClient: apolloClient,
});

import "./assets/main.css";

const app = createApp(App);

app.use(router);
app.use(apolloProvider);

app.mount("#app");
