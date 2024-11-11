import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import axios from 'axios';
import * as ElementPlusIconsVue from '@element-plus/icons-vue'; // 导入图标库

const app = createApp(App);

// 将 axios 添加到 globalProperties
app.config.globalProperties.$axios = axios;

// 注册 ElementPlus 的所有图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component);
}

app.use(store).use(router).use(ElementPlus).mount('#app');

