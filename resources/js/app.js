import "./bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

import { createApp } from "vue";
import "@mdi/font/css/materialdesignicons.css";
import router from "./router";

import App from "./App.vue";

router.beforeEach((toRoute, fromRoute, next) => {
    if (!localStorage.getItem("token") && toRoute.name !== "Login") {
        next({ name: "Login" });
    } else if (localStorage.getItem("token") && toRoute.name === "Login") {
        next({ name: "home" });
    } else {
        next();
    }
    document.title = toRoute.meta.title || "Stock";
});
createApp(App).use(router).mount("#app");
