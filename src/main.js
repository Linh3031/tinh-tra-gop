import { mount } from 'svelte'
import './app.css'
import App from './App.svelte'

// --- PWA LOADER ---
import { registerSW } from 'virtual:pwa-register'

const updateSW = registerSW({
  onNeedRefresh() {
    if (confirm('Có bản cập nhật mới. Tải lại trang?')) {
      updateSW(true)
    }
  },
  onOfflineReady() {
    console.log('App sẵn sàng chạy offline')
  },
})
// ------------------

const app = mount(App, {
  target: document.getElementById('app'),
})

export default app