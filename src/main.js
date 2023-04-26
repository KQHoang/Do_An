import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import VueFontawesome from "font-awesome/css/font-awesome.min.css";
import route from "@/js/router/route.js"
import Loading from "@/components/loading.vue"

loadFonts()

createApp(App)
  .use(vuetify)
  .use(route)
  .use(VueFontawesome)
  .component("Loading", Loading)
  .mount('#app')
