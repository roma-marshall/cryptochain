import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import App from './App.vue'

import VueApexCharts from 'vue3-apexcharts'

const pinia = createPinia()

createApp(App)
  .use(pinia)
  .use(VueApexCharts)
  .mount('#app')
