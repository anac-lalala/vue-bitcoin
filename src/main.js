import { createApp } from "vue";
import App from "./App.vue";
import "@/assets/css/tailwind.css";
import router from "@/router";
import { dollarFilter, percentFilter } from "@/filters";

// Vue.filter("dollar", dollarfilter);
const app = createApp(App).use(router);

app.config.globalProperties.$filters = {
  dollarFilter,
  percentFilter,
};

app.mount("#app");
