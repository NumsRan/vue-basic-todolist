import { createApp } from "vue";
import App from "./App.vue";

const todoApp = createApp(App)

todoApp.config.errorHandler = (err) => {
    console.log("ToDoApp Error: ", err)
}

todoApp.mount('#app')