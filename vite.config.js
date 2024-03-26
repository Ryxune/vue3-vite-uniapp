import { defineConfig, loadEnv } from 'vite'
import { fileURLToPath } from 'node:url'
import uni from '@dcloudio/vite-plugin-uni'


const UNI_PLATFORM = {
  app: 'uni',
  web: 'uni',
  'mp-weixin': 'wx',
  'mp-baidu': 'swan',
  'mp-alipay': 'my',
  'mp-toutiao': 'tt',
  'mp-lark': 'tt',
  'mp-qq': 'qq',
  'mp-kuaishou': 'ks',
  'mp-jd': 'jd',
  'mp-360': 'qh',
  'quickapp-webview-union': 'qa',
  'quickapp-webview-huawei': 'qa',
  'quickapp-webview': 'qa',
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    plugins: [uni()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    // define: {
    //   global: UNI_PLATFORM[loadEnv(mode, process.cwd(), '').UNI_PLATFORM],
    //   wx: UNI_PLATFORM[loadEnv(mode, process.cwd(), '').UNI_PLATFORM],
    // },
    define: {
      global: UNI_PLATFORM[process.env.UNI_PLATFORM],
      wx: UNI_PLATFORM[process.env.UNI_PLATFORM],
    },

  }
})
