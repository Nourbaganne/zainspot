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

      // Translate each chunk with a delay between requests
      const translatedChunks = [];
      for (const chunk of chunks) {
        const translation = await this.translateWithDelay(chunk, sourceLanguage, targetLanguage);
        translatedChunks.push(translation);
      }

      // Combine translated chunks
      return translatedChunks.join(' ');
    } catch (error) {
      console.error('Translation error:', error.response?.data || error.message);
      return text; // Return original text as fallback
    }
  }



  async translateMultipleTexts(
    texts: string[],
    sourceLanguage: string,
    targetLanguage: string,
  ): Promise<string[]> {
    try {
      // Combine texts with a delimiter
      const delimiter = '|||'; // Ensure this doesn't exist in your texts
      const combinedText = texts.join(delimiter);

      // Translate the combined text
      const translatedCombinedText = await this.translateText(
        combinedText,
        sourceLanguage,
        targetLanguage,
      );

      // Split the translated result back into separate fields
      return translatedCombinedText.split(delimiter);
    } catch (error) {
      console.error('Batch translation error:', error.response?.data || error.message);
      return texts; // Fallback to original texts
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

  private async translateWithDelay(
    text: string,
    sourceLanguage: string,
    targetLanguage: string,
    delayMs = 1000, // Delay between requests (1 second by default)
  ): Promise<string> {
    try {
      const url = `${this.apiUrl}/${sourceLanguage}/${targetLanguage}/${encodeURIComponent(text)}`;
      const response = await axios.get(url);
      // Introduce delay between requests
      await this.delay(delayMs);
      return response.data.translation;
    } catch (error) {
      console.error('Translation error:', error.response?.data || error.message);
      return text; // Return original text as fallback
    }
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
