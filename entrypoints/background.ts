
export default defineBackground(() => {
  
  browser.runtime.onInstalled.addListener(async () => {
    openChatGPTWeb()
  })
  function openChatGPTWeb() {
    browser.tabs.create({
      url: 'https://chatgpt.com',
    })
  } 
  browser.action.onClicked.addListener(() => {
    console.log('Button clicked!');
    openChatGPTWeb();
  });
  console.log('Hello background!', { id: browser.runtime.id });
});