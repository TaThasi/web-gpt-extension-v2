import '../entrypoints/popup/style.css';
import { createApp } from 'vue';
import App from '../entrypoints/popup/App.vue';
import { savePrompts, getStoredPrompts } from '../utils/prompt.manager';
import { Prompt } from '@/utils/type';
export default defineContentScript({
  matches: ['<all_urls>'], 

  cssInjectionMode: 'ui',

  async main(ctx) {
    const res = await fetch("http://localhost:3000/prompt", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data: Prompt[] = await res.json();
    savePrompts(data);

    const ui = await createShadowRootUi(ctx, {
      name: 'example-ui',
      position: 'overlay',
      onMount: (container) => {
        container.id = 'example-ui-container';
        // Hidden logo
        const logoDiv = document.querySelector('[class="flex h-full flex-col items-center justify-center text-token-text-primary"]');
        const suggestDiv = document.querySelector('[class="absolute bottom-full left-0 right-0 z-20"]')
        console.log(logoDiv);
        console.log(suggestDiv);
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
    console.log(text);
    console.log(sendButton);
    if (!text || !sendButton) {
      console.error('Text area or send button not found');
      return;
    }

    
    var userInput = '';
    const savedPrompts = await getStoredPrompts();
    const savedDefaults = savedPrompts.length > 0 ? savedPrompts[9]?.description ?? '' : '';
    const promptUser = '[promptuser]';
    const promptUserIndex = savedDefaults.indexOf(promptUser);

    const fontdefaultValue = promptUserIndex !== -1 ? savedDefaults.slice(0, promptUserIndex) : '';
    const endDefaultValue = promptUserIndex !== -1 ? savedDefaults.slice(promptUserIndex + promptUser.length) : '';

    
    const handleChange = (event: Event) => {
      const target = event.target as HTMLInputElement;
      userInput = target.value; 
      console.log('User input:', userInput);
    };

    text.addEventListener('input', handleChange);
    const handleSubmit = () => {
      try {
        console.log(userInput.length); 
        const defaultValue = fontdefaultValue + userInput + endDefaultValue;
        const combinedValue = `${defaultValue}`.trim();
        console.log("combined: ", combinedValue);
    
        text.value = combinedValue;
        console.log("submit: ", combinedValue);
        console.log("combined: ", text.value);
      } catch (err) {
        console.error('Error submitting form:', err);
      } finally {
        sendButton.click();
      }
    };
    
    sendButton.addEventListener('click', handleSubmit);
    

    const observer = new MutationObserver(() => {});

    observer.observe(text, { attributes: true });

    if (text.getAttribute('data-id') === 'root') {
      ui.mount();
    }

    sendButton.addEventListener('click', () => {
      ui.remove();
    });

    text.addEventListener('keydown', (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        ui.remove();
        handleSubmit();
      }
    });
  },
});
