import { createSSRApp } from 'vue';
import uviewPlus from 'uview-plus';
import { initPermission } from './src/utils/permission';
import App from './App.vue';
import uCharts from '@qiun/ucharts';

export function createApp() {
  const app = createSSRApp(App);
  app.use(uviewPlus);
  initPermission(); // 初始化路由拦截
  app.config.globalProperties.$uCharts = uCharts;
  return {
    app,
  };
}
