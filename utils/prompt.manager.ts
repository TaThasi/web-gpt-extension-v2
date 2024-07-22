// import { Prompt } from "./type";

// const defaultPrompts: Prompt[] = [
//     {
//         title: "Article Outrank Rival",
//         description: "By creating a comprehensive article that is similar to your competitor, but with better SEO (based on the URL of your...",
//         tags: ["SEO / Writing"],
//         status: "Live Crawling",
//         author: "MaxAI.me",
//         id: "uuid-1" 
//     },
//     {
//         title: "WebChatGPT: ChatGPT with internet access",
//         description: "Augment your ChatGPT prompts with relevant web search [PROMPT USER] results through web browsing. Entering your query to start.",
//         tags: ["All / All"],
//         status: "Web Search",
//         author: "MaxAI.me",
//         id: "uuid-2" 
//     },
//     {
//         title: "Social Media Content Generator",
//         description: "Create engaging and viral social media content tailored to your audience, leveraging trending topics and keywords.",
//         tags: ["Marketing / Social Media"],
//         status: "Idea",
//         author: "MaxAI.me",
//         id: "uuid-3" 
//     },
//     {
//         title: "Email Campaign Optimization",
//         description: "Optimize your email campaigns for better open and click-through rates using personalized subject lines and content.",
//         tags: ["Marketing / Email"],
//         status: "In Progress",
//         author: "MaxAI.me",
//         id: "uuid-4" 
//     },
//     {
//         title: "Product Description Enhancer",
//         description: "Enhance your product descriptions to highlight features and benefits, improving conversion rates.",
//         tags: ["E-commerce / Copywriting"],
//         status: "Complete",
//         author: "MaxAI.me",
//         id: "uuid-5" 
//     },
//     {
//         title: "Customer Feedback Analysis",
//         description: "Analyze customer feedback to identify key areas for improvement and boost customer satisfaction.",
//         tags: ["Analytics / Customer Service"],
//         status: "Analyzing",
//         author: "MaxAI.me",
//         id: "uuid-6" 
//     },
//     {
//         title: "Competitor Analysis Report",
//         description: "Generate a detailed competitor analysis report to identify strengths, weaknesses, opportunities, and threats.",
//         tags: ["Business / Strategy"],
//         status: "Pending",
//         author: "MaxAI.me",
//         id: "uuid-7" 
//     },
//     {
//         title: "SEO Keyword Research",
//         description: "Perform in-depth keyword research to find the best keywords for your SEO strategy, increasing organic traffic.",
//         tags: ["SEO / Research"],
//         status: "Complete",
//         author: "MaxAI.me",
//         id: "uuid-8" 
//     }
// ];


// const STORAGE_KEY = 'storedPrompts';

// export const getStoredPrompts = async (includeDefaults = true): Promise<Prompt[]> => {
//     const { [STORAGE_KEY]: storedPrompts = [] } = await chrome.storage.local.get([STORAGE_KEY]);
//     console.log(storedPrompts);
//     return includeDefaults ? storedPrompts.concat(defaultPrompts) : storedPrompts;
// }

// export const savePrompts = async (prompts: Prompt[]) => {
//     try {
//         await chrome.storage.local.set({ [STORAGE_KEY]: prompts });
//         console.log('Prompts saved successfully');
//     } catch (error) {
//         console.error('Error saving prompts:', error);
//     }
// };
