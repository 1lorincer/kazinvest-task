import {GoogleGenAI} from "@google/genai";
import {env} from "./env.config.js";

let geminiInstance = null;

export const gemini = {
    get models() {
        if (!geminiInstance) {
            if (!env.GOOGLE_API_KEY) {
                throw new Error("Missing GEMINI_API_KEY environment variable");
            }
            geminiInstance = new GoogleGenAI({apiKey: env.GOOGLE_API_KEY});
        }
        return geminiInstance.models;
    }
};