export default defineBackground(() => {
  console.log('Hello background!', { id: browser.runtime.id });
});

browser.runtime.onInstalled.addListener(async () => {
  openChatGPTWeb()
})

function openChatGPTWeb() {
  browser.tabs.create({
    url: 'https://chatgpt.com',
  })
}



