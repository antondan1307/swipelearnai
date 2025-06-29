import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const audioFile = formData.get('audio') as File;

    if (!audioFile) {
      return NextResponse.json({ error: 'Audio file is required' }, { status: 400 });
    }

    // Check file size (25MB limit for Whisper)
    if (audioFile.size > 25 * 1024 * 1024) {
      return NextResponse.json({ error: 'File too large. Maximum size is 25MB.' }, { status: 400 });
    }

    // Transcribe audio using Whisper
    const transcription = await openai.audio.transcriptions.create({
      file: audioFile,
      model: "whisper-1",
      language: "en", // Specify English for better accuracy
      response_format: "verbose_json",
      temperature: 0.2, // Lower temperature for more accurate transcription
    });

    // Extract transcript segments with timestamps
    const segments = transcription.segments?.map(segment => ({
      start: segment.start,
      end: segment.end,
      text: segment.text.trim()
    })) || [];

    return NextResponse.json({
      transcript: transcription.text,
      segments,
      duration: transcription.duration,
      language: transcription.language,
    });

  } catch (error) {
    console.error('Error transcribing audio:', error);
    return NextResponse.json(
      { error: 'Failed to transcribe audio' },
      { status: 500 }
    );
  }
}