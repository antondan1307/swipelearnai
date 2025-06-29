import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { videoUrl, transcript, difficulty = 'intermediate', topic = '', customPrompt = '' } = await request.json();

    if (!transcript) {
      return NextResponse.json({ error: 'Transcript is required' }, { status: 400 });
    }

    // Create a prompt for flashcard generation
    const systemPrompt = `You are an expert English language tutor specializing in creating effective flashcards for vocabulary learning. 

Your task is to analyze the provided transcript and create engaging flashcards that help students learn English vocabulary, phrases, and concepts.

Guidelines:
- Create 5-8 flashcards per transcript
- Focus on vocabulary, phrases, idioms, and key concepts
- Make questions clear and educational
- Provide comprehensive answers with context and examples
- Adjust difficulty based on the specified level: ${difficulty}
- Include pronunciation tips when relevant
- Add usage examples in different contexts

${topic ? `Special focus area: ${topic}` : ''}
${customPrompt ? `Additional instructions: ${customPrompt}` : ''}

Format your response as a JSON array of flashcard objects with the following structure:
{
  "question": "What does [word/phrase] mean?",
  "answer": "Detailed explanation with examples and context",
  "difficulty": "easy|medium|hard",
  "category": "vocabulary|grammar|pronunciation|idioms"
}`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: `Please create flashcards from this transcript:\n\n${transcript}` }
      ],
      temperature: 0.7,
      max_tokens: 2000,
    });

    let flashcards;
    try {
      flashcards = JSON.parse(completion.choices[0].message.content || '[]');
    } catch (parseError) {
      console.error('Failed to parse OpenAI response:', parseError);
      return NextResponse.json({ error: 'Failed to generate flashcards' }, { status: 500 });
    }

    return NextResponse.json({
      flashcards,
      metadata: {
        videoUrl,
        difficulty,
        topic,
        generatedAt: new Date().toISOString(),
        wordCount: transcript.split(' ').length
      }
    });

  } catch (error) {
    console.error('Error generating flashcards:', error);
    return NextResponse.json(
      { error: 'Failed to generate flashcards' },
      { status: 500 }
    );
  }
}