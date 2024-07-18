import { Prompt } from "./type";

const defaultPrompts: Prompt[] = [
    {
        title: "Article Outrank Rival",
        description: "By creating a comprehensive article that is similar to your competitor, but with better SEO (based on the URL of your...",
        tags: ["SEO / Writing"],
        status: "Live Crawling",
        author: "MaxAI.me",
        id: "uuid-1" 
    },
    {
        title: "WebChatGPT: ChatGPT with internet access",
        description: "Augment your ChatGPT prompts with relevant web search ${[PROMPT USER] results through web browsing. Entering your query to start.",
        tags: ["All / All"],
        status: "Web Search",
        author: "MaxAI.me",
        id: "uuid-2" 
    }
];

const STORAGE_KEY = 'storedPrompts';

export const getStoredPrompts = async (includeDefaults = true): Promise<Prompt[]> => {
    const { [STORAGE_KEY]: storedPrompts = [] } = await chrome.storage.local.get([STORAGE_KEY]);
    console.log(storedPrompts);
    return includeDefaults ? mergeWithDefaultPrompts(storedPrompts) : storedPrompts;
}

export const savePrompts = async (prompts: Prompt[]) => {
    try {
        await chrome.storage.local.set({ [STORAGE_KEY]: prompts });
        console.log('Prompts saved successfully');
    } catch (error) {
        console.error('Error saving prompts:', error);
    }
};

function mergeWithDefaultPrompts(storedPrompts: Prompt[]): Prompt[] {
    if (storedPrompts.length === 0) {
        return defaultPrompts; 
    }
    return storedPrompts;
}
