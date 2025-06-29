import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateFlashcards(transcript: string, options: {
  difficulty?: string;
  topic?: string;
  customPrompt?: string;
}) {
  const { difficulty = 'intermediate', topic = '', customPrompt = '' } = options;

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

  return JSON.parse(completion.choices[0].message.content || '[]');
}

export async function transcribeAudio(audioFile: File) {
  const transcription = await openai.audio.transcriptions.create({
    file: audioFile,
    model: "whisper-1",
    language: "en",
    response_format: "verbose_json",
    temperature: 0.2,
  });

  return {
    transcript: transcription.text,
    segments: transcription.segments?.map(segment => ({
      start: segment.start,
      end: segment.end,
      text: segment.text.trim()
    })) || [],
    duration: transcription.duration,
    language: transcription.language,
  };
}

export async function generateLearningPath(userProfile: {
  currentLevel: string;
  interests: string[];
  learningGoals: string[];
  timeAvailable: number;
  preferredDifficulty: string;
}) {
  const systemPrompt = `You are an expert English language learning curriculum designer. Create a personalized 7-day learning path for an English learner.

User Profile:
- Current Level: ${userProfile.currentLevel}
- Interests: ${userProfile.interests.join(', ')}
- Learning Goals: ${userProfile.learningGoals.join(', ')}
- Available Time: ${userProfile.timeAvailable} minutes per day
- Preferred Difficulty: ${userProfile.preferredDifficulty}

Create a 7-day learning path with daily modules. Each day should build upon the previous day's learning. Focus on practical vocabulary and phrases that align with the user's interests and goals.

Format your response as a JSON array of 7 learning modules with this structure:
{
  "day": 1,
  "title": "Module Title",
  "description": "Brief description of what will be learned",
  "topics": ["topic1", "topic2", "topic3"],
  "difficulty": "beginner|intermediate|advanced",
  "estimatedTime": "minutes",
  "focusAreas": ["vocabulary", "pronunciation", "grammar", "usage"],
  "keySkills": ["skill1", "skill2", "skill3"]
}`;

  const completion = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: "Please create a personalized 7-day English learning path based on my profile." }
    ],
    temperature: 0.8,
    max_tokens: 2500,
  });

  return JSON.parse(completion.choices[0].message.content || '[]');
}

export default openai;