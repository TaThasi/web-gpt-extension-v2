import '../entrypoints/popup/style.css';
import { createApp } from 'vue';
import App from '../entrypoints/popup/App.vue';

export default defineContentScript({
  matches: ['https://chatgpt.com/'], 
  cssInjectionMode: 'ui',

  async main(ctx) {
    
    const ui = await createShadowRootUi(ctx, {
      name: 'example-ui',
      position: 'overlay',
      onMount: (container) => {
        const logoDiv = document.querySelector('[class="flex h-full flex-col items-center justify-center text-token-text-primary"]');
        const suggestDiv = document.querySelector('[class="absolute bottom-full left-0 right-0 z-20"]');
        
        if (logoDiv) {
          suggestDiv?.classList.add('hidden');
          logoDiv.classList.add('hidden');
        }        
        const app = createApp(App);
        app.mount(container);
      },



    });

    const text = document.querySelector('#prompt-textarea') as HTMLTextAreaElement;
    const sendButton = document.querySelector('[class="mb-1 me-1 flex h-8 w-8 items-center justify-center rounded-full bg-black text-white transition-colors hover:opacity-70 focus-visible:outline-none focus-visible:outline-black disabled:bg-[#D7D7D7] disabled:text-[#f4f4f4] disabled:hover:opacity-100 dark:bg-white dark:text-black dark:focus-visible:outline-white disabled:dark:bg-token-text-quaternary dark:disabled:text-token-main-surface-secondary"]') as HTMLButtonElement;

    if (!text || !sendButton) {
      console.error('Text area or send button not found');
      return;
    }

    // Load and prepare prompt data
    let userInput = '';
    let savedDefaults = '';
    const eventType = "prompt-selected";

    const eventListener = (event: CustomEvent) => {
      savedDefaults = event.detail.description;
      console.log('Saved defaults:', savedDefaults);
    };
    
    window.addEventListener(eventType, eventListener as EventListener);

    const promptUser = '[promptuser]';
    let fontdefaultValue = '';
    let endDefaultValue = '';
    const setDefaults = async () => {
      // language = getUserConfig();
      const promptUserIndex = savedDefaults.indexOf(promptUser);
      fontdefaultValue = promptUserIndex !== -1 ? savedDefaults.slice(0, promptUserIndex) : '';
      endDefaultValue = promptUserIndex !== -1 ? savedDefaults.slice(promptUserIndex + promptUser.length) : '';
      console.log('Font default value:', savedDefaults);
    };

    function handleChange(event: Event) {
      const target = event.target as HTMLInputElement;
      userInput = target.value;
      console.log('User input:', userInput);
    }
    async function handleSubmit() {
      try {
        if (!savedDefaults) {
          console.error('Saved defaults are not set');
          return;
        }
        await setDefaults();
        const language = localStorage.getItem('language') || 'English';
        console.log('Language:', language);
        const combinedValue = (fontdefaultValue + userInput + endDefaultValue  + " using " + language).trim();
        text.value = combinedValue;
        console.log('Combined value:', combinedValue);
        console.log("Submit: ", combinedValue);
      } catch (error) {
        console.error('Error submitting form:', error);
      } finally {
        sendButton.click();
      }
    }


    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Enter') {
        event.preventDefault();
        ui.remove();
        
        handleSubmit();
      }
    }

    // Attach event listeners
    text.addEventListener('input', handleChange);
    sendButton.addEventListener('click', handleSubmit);
    text.addEventListener('keydown', handleKeyDown);

    const observer = new MutationObserver(() => {});

    observer.observe(text, { attributes: true });

    if (text.getAttribute('data-id') === 'root') {
      ui.mount();
    }

    observer.observe(text, { attributes: true });

    sendButton.addEventListener('click', () => {
      ui.remove();
    });

    browser.runtime.onMessage.addListener((message) => {
      console.log('Received message:', message);
      if (message.type === 'prompt-selected') {
        handleSubmit();
      }
    });

}});
