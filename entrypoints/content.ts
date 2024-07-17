import '../entrypoints/popup/style.css';
import { createApp } from 'vue';
import App from '../entrypoints/popup/App.vue';
import { savePrompt, getSavedPrompts } from '../utils/PromptManager';
import { Prompt } from '@/utils/type';

export default defineContentScript({
  matches: ['<all_urls>'], // Matches all URLs

  // Set cssInjectionMode
  cssInjectionMode: 'ui',

  async main(ctx) {
    const res = await fetch("http://localhost:3000/prompt", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    savePrompt(data);

    // Define your UI
    const ui = await createShadowRootUi(ctx, {
      name: 'example-ui',
      position: 'overlay',
      zIndex: 10000,
      onMount: (container) => {
        // Add an ID to the container for CSS targeting
        container.id = 'example-ui-container';

        // Define how your UI will be mounted inside the container
        const app = createApp(App);
        app.mount(container); // Mount the app on the container
      },
    });

    const text = document.querySelector('#prompt-textarea') as HTMLTextAreaElement;
    const sendButton = document.querySelector('[data-testid="fruitjuice-send-button"]') as HTMLButtonElement;

    // Fetch saved prompts and use the description of the first prompt as the default value
    const savedPrompts = await getSavedPrompts();
    const defaultValue = savedPrompts.length > 0 ? savedPrompts[0].description : ''; // Use first prompt's description or empty string

    let userInput = '';

    // Handle continuous input changes
    const handleChange = (event: any) => {
      userInput = event.target.value;
    };

    text.addEventListener('input', handleChange);
    console.log(userInput);
    // Handle button click to combine default value and user input, then send
    const handleSubmit = () => {
      const combinedValue = `${defaultValue} ${userInput}`.trim();
      console.log("combined: ", combinedValue);

      // Set textarea value to the combined value
      text.value = combinedValue;

      console.log("combined: ", text.value);

      // Trigger the button click programmatically (assuming this triggers some action)
      sendButton.click();
    };

    sendButton.addEventListener('click', handleSubmit);

    // Use a MutationObserver to watch for attribute changes
    const observer = new MutationObserver((mutationsList) => {
      for (const mutation of mutationsList) {
        if (mutation.type === 'attributes' && mutation.attributeName === 'data-id') {
          if (text.getAttribute('data-id') === 'root') {
            ui.mount();
          } else {
            ui.remove();
          }
        }
      }
    });

    observer.observe(text, { attributes: true });

    // Mount the UI if the initial condition is met
    if (text.getAttribute('data-id') === 'root') {
      ui.mount();
    }

    // Handle input event to hide the UI
    text.addEventListener('input', () => {
      ui.remove();
    });

    // Handle page reload to maintain state (optional)
    // window.addEventListener('beforeunload', () => {
    //   // Save any necessary state to local storage or browser storage
    //   // Example: browser.storage.local.set({ lastTextValue: text.value });
    // });
  },
});
