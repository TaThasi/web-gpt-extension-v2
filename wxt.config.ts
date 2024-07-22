import { defineConfig } from 'wxt';
// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ['@wxt-dev/module-vue'],
  manifest: {
    permissions: ['storage', 'tabs', 'scripting'],
    action: {
      default_popup: ''
    },
    web_accessible_resources: [
      {
        resources: ['index.html'],
        matches: [ "*://*/*"],
      },
    ],
    
  },
});