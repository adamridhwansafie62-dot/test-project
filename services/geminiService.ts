import { GoogleGenAI, Modality } from "@google/genai";

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

interface EditImageResult {
  newImage: string | null;
  text: string | null;
}

export const editImage = async (
  base64Image1Data: string,
  mimeType1: string,
  base64Image2Data: string,
  mimeType2: string,
  prompt: string
): Promise<EditImageResult> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image-preview',
      contents: {
        parts: [
          {
            inlineData: {
              data: base64Image1Data,
              mimeType: mimeType1,
            },
          },
          {
            inlineData: {
                data: base64Image2Data,
                mimeType: mimeType2,
            }
          },
          {
            text: prompt,
          },
        ],
      },
      config: {
        responseModalities: [Modality.IMAGE, Modality.TEXT],
      },
    });

    let newImage: string | null = null;
    let text: string | null = null;

    if (response.candidates && response.candidates[0].content.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          newImage = part.inlineData.data;
        } else if (part.text) {
          text = part.text;
        }
      }
    }

    return { newImage, text };
    
  } catch (error) {
    console.error("Error editing image with Gemini:", error);
    if (error instanceof Error) {
        throw new Error(`AI generation failed: ${error.message}`);
    }
    throw new Error("An unknown error occurred during AI image generation.");
  }
};