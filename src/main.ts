import { createApp, h, provide } from "vue";
import App from "./App.vue";
import router from "./router";
import { ApolloClient, InMemoryCache } from "@apollo/client/core";
import { DefaultApolloClient } from "@vue/apollo-composable";
import "./assets/main.css";
import VueClosable from "vue-closable";

const cache = new InMemoryCache();

const apolloClient = new ApolloClient({
  cache,
  uri: `${import.meta.env.VITE_STRAPI_ENDPOINT}/graphql`,
});

const app = createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient);
  },
  render: () => h(App),
});

app.use(router);
app.use(VueClosable);
app.mount("#app");
