import { createApp } from "vue";
import App from "./App.vue";
import "@/assets/css/tailwind.css";
import router from "@/router";
import { dollarFilter, percentFilter } from "@/filters";
import vueChartkick from "vue-chartkick";
import "chartkick/chart.js";

// Vue.filter("dollar", dollarfilter);
const app = createApp(App).use(router);
app.use(vueChartkick);
app.config.globalProperties.$filters = {
  dollarFilter,
  percentFilter,
};

app.mount("#app");
