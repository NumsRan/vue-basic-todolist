import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap'
import 'bootstrap-icons/font/bootstrap-icons.css'

import { createApp } from "vue";
import App from "./App.vue";

const todoApp = createApp(App)

todoApp.config.errorHandler = (err) => {
    console.error("ToDoApp Error: ", err)
}

todoApp.mount('#app')