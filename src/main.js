import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import VueFontawesome from "font-awesome/css/font-awesome.min.css";
import route from "@/js/router/route.js"
import Loading from "@/components/loading.vue"
import ToastMessage from '@/components/message.vue'
import PopUpDelete from '@/components/popupDelete.vue'

loadFonts()
const app = createApp(App);
app.config.globalProperties.GlobalAccountID = null;
app.config.globalProperties.GlobalEmployeeID = null;
app.use(vuetify)
  .use(route)
  .use(VueFontawesome)
  .component("Loading", Loading)
  .component("ToastMessage", ToastMessage)
  .component("PopUpDelete", PopUpDelete)
  .mount('#app')
