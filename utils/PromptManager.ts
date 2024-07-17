
import { Prompt } from "./type";
const prompt: Prompt[] = [
    {
        title: "Article Outrank Rival",
        description: "By creating a comprehensive article that is similar to your competitor, but with better SEO (based on the URL of your...",
        tags: ["SEO / Writing"],
        status: "Live Crawling",
        author: "MaxAI.me",
        id: "uuid-1" // Added UUID
    },
    {
        title: "WebChatGPT: ChatGPT with internet access",
        description: "Augment your ChatGPT prompts with relevant web search results through web browsing. Entering your query to start.",
        tags: ["All / All"],
        status: "Web Search",
        author: "MaxAI.me",
        id: "uuid-2" // Added UUID
    }
];

const SAVED_PROMPTS_KEY = 'savedPrompts';

export const getSavedPrompts =  async (addDefaults = true)  : Promise<Prompt[]> => {
    const { [SAVED_PROMPTS_KEY]: savedPrompts = [] } = await chrome.storage.local.get([SAVED_PROMPTS_KEY]);
    console.log(savedPrompts);
    return addDefaults ? addDefaultPrompts(savedPrompts) : savedPrompts;
    
}

export const savePrompt = async (prompts: Prompt[]) => {
    try {
        await chrome.storage.local.set({ [SAVED_PROMPTS_KEY]: prompts });
        // chrome.storage.local.get([SAVED_PROMPTS_KEY], function(result) {
        //     console.log(result);
        // });

        console.log('Prompts saved successfully');
    } catch (error) {
        console.error('Error saving prompts:', error);
    }
};

// Example usage


savePrompt(prompt);

function addDefaultPrompts(savedPrompts: Prompt[]): Prompt[] {
    // Assuming this function adds some default prompts if none exist
    if (savedPrompts.length === 0) {
        return prompt; // Return the initial prompt array if savedPrompts is empty
    }
    return savedPrompts;
}
