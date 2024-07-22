export type Prompt = {
    title: string;
    description: string;
    tags: string[];
    status: string;
    author: string;
    id: string; // Assuming uuid is part of Prompt
};


export interface UserConfig {
    language: string;
}
