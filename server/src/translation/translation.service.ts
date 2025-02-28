import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class TranslationService {
  private readonly apiUrl = 'https://lingva.ml/api/v1';

  async translateText(
    text: string,
    sourceLanguage: string,
    targetLanguage: string,
  ): Promise<string> {
    try {
      // Split and sanitize text
      const chunks = this.splitAndSanitizeText(text);

      // Translate each chunk
      const translatedChunks = await Promise.all(
        chunks.map(async (chunk) => {
          const url = `${this.apiUrl}/${sourceLanguage}/${targetLanguage}/${encodeURIComponent(chunk)}`;
          const response = await axios.get(url);
          return response.data.translation;
        }),
      );

      // Combine translated chunks
      return translatedChunks.join(' ');
    } catch (error) {
      console.error('Translation error:', error.response?.data || error.message);
      return text; // Return original text as fallback
    }
  }

  private splitAndSanitizeText(text: string, maxLength = 300): string[] {
    // Normalize line breaks and trim whitespace
    const sanitizedText = text.replace(/\r\n|\n|\r/g, ' ').trim();

    // Split into sentences
    const sentences = sanitizedText.match(/[^.!?]+[.!?]*/g) || [sanitizedText];
    const chunks: string[] = [];
    let currentChunk = '';

    for (const sentence of sentences) {
      if ((currentChunk + sentence).length > maxLength) {
        chunks.push(currentChunk.trim());
        currentChunk = '';
      }
      currentChunk += ` ${sentence}`;
    }

    if (currentChunk) {
      chunks.push(currentChunk.trim());
    }

    return chunks;
  }
}
