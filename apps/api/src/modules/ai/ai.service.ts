import { Injectable, Logger } from '@nestjs/common';
import OpenAI from 'openai';
import Anthropic from '@anthropic-ai/sdk';
import { GoogleGenAI } from '@google/genai';

export type AiProvider = 'openai' | 'anthropic' | 'gemini';

@Injectable()
export class AiService {
  private readonly logger = new Logger(AiService.name);
  
  private openai: OpenAI;
  private anthropic: Anthropic;
  private gemini: GoogleGenAI;

  constructor() {
    this.openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY || 'placeholder' });
    this.anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY || 'placeholder' });
    this.gemini = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || 'placeholder' });
  }

  async analyzeApp(prompt: string, provider: AiProvider = 'openai'): Promise<string> {
    this.logger.log(`Analyzing app with provider: ${provider}`);
    
    try {
      if (provider === 'openai') {
        const response = await this.openai.chat.completions.create({
          model: 'gpt-4o',
          messages: [{ role: 'user', content: prompt }],
        });
        return response.choices[0].message.content || '';
      }
      
      if (provider === 'anthropic') {
        const response = await this.anthropic.messages.create({
          model: 'claude-3-5-sonnet-20240620',
          max_tokens: 1024,
          messages: [{ role: 'user', content: prompt }],
        });
        // Handle content extraction carefully since anthropic returns blocks
        return response.content.map(block => block.type === 'text' ? block.text : '').join('');
      }

      if (provider === 'gemini') {
        const response = await this.gemini.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: prompt,
        });
        return response.text || '';
      }
      
      throw new Error(`Unsupported provider: ${provider}`);
    } catch (error) {
      this.logger.error(`Error with ${provider}:`, error);
      throw error;
    }
  }
}
