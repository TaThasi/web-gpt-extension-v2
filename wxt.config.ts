import { defineConfig } from 'wxt';
// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ['@wxt-dev/module-vue'],
  manifest: {
    permissions: ['storage', 'tabs', 'scripting'],
    web_accessible_resources: [
      {
        resources: ['example-iframe.html'],
        matches: [ "*://*/*"],
      },
    ],
  },
});