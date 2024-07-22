
// import { UserConfig } from "./type";

// const USER_CONFIG_KEY = "userConfig";

// export const getUserConfig = async () : Promise<string> => {
//     const { [USER_CONFIG_KEY]: userConfig = {} } = await chrome.storage.local.get([USER_CONFIG_KEY]);
//     console.log(userConfig);
//     return userConfig;
// }
// export const saveConfigs = async (config: UserConfig) => {
//     try {
//         await chrome.storage.local.set({ [USER_CONFIG_KEY] : config.language });
//         console.log('config saved successfully', config);
//     } catch (error) {
//         console.error('Error saving prompts:', error);
//     }
// };
