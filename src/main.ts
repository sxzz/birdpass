import { createApp } from 'vue'
import App from './App.vue'

import '@unocss/reset/tailwind.css'
import './styles/main.css'
import 'uno.css'

createApp(App).mount('#app')

if (navigator.userAgent.includes('MicroMessenger')) {
  // eslint-disable-next-line no-alert
  alert('请在系统浏览器中打开，不支持微信内置浏览器')
}
