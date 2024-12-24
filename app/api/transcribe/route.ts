import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import fs from 'fs';
import os from 'os';
import path from 'path';

const openai = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: 'https://api.groq.com/openai/v1',
});

/**
 * Handles POST requests for audio transcription.
 * @param {NextRequest} request - The incoming HTTP request containing the audio file.
 * @returns {Promise<NextResponse>} A JSON response with the transcription or an error message.
 * @throws {Error} If there's an issue during file processing or transcription.
 */
export async function POST(request: NextRequest) {
  console.log('Transcription request received');

  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      console.log('No file provided');
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    console.log('File received:', file.name);

    // Create a temporary file
    const tempFilePath = path.join(os.tmpdir(), file.name);
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Write the buffer to the temporary file
    fs.writeFileSync(tempFilePath, buffer);

    console.log('Sending request to Groq API');
    const response = await openai.audio.transcriptions.create({
      file: fs.createReadStream(tempFilePath),
      model: 'whisper-large-v3',
    });

    // Delete the temporary file
    fs.unlinkSync(tempFilePath);

    console.log('Transcription received:', response);

    return NextResponse.json({ transcription: response.text });
  } catch (error) {
    console.error('Error during transcription:', error);
    return NextResponse.json({ error: 'Transcription failed' }, { status: 500 });
  }
}