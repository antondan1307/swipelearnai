import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { 
      userId, 
      currentLevel, 
      interests = [], 
      learningGoals = [], 
      timeAvailable = 30,
      preferredDifficulty = 'intermediate' 
    } = await request.json();

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    // Create personalized learning path using OpenAI
    const systemPrompt = `You are an expert English language learning curriculum designer. Create a personalized 7-day learning path for an English learner.

User Profile:
- Current Level: ${currentLevel}
- Interests: ${interests.join(', ')}
- Learning Goals: ${learningGoals.join(', ')}
- Available Time: ${timeAvailable} minutes per day
- Preferred Difficulty: ${preferredDifficulty}

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

    let learningPath;
    try {
      learningPath = JSON.parse(completion.choices[0].message.content || '[]');
    } catch (parseError) {
      console.error('Failed to parse OpenAI response:', parseError);
      return NextResponse.json({ error: 'Failed to generate learning path' }, { status: 500 });
    }

    // Store learning path in database (mock implementation)
    const pathId = `path_${userId}_${Date.now()}`;
    
    return NextResponse.json({
      pathId,
      userId,
      learningPath,
      metadata: {
        createdAt: new Date().toISOString(),
        currentLevel,
        interests,
        learningGoals,
        timeAvailable,
        preferredDifficulty
      }
    });

  } catch (error) {
    console.error('Error generating learning path:', error);
    return NextResponse.json(
      { error: 'Failed to generate learning path' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const pathId = searchParams.get('pathId');

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    // In a real implementation, fetch from database
    // For demo, return mock data
    const mockLearningPath = {
      pathId: pathId || `path_${userId}_demo`,
      userId,
      learningPath: [
        {
          day: 1,
          title: "Business English Fundamentals",
          description: "Essential vocabulary and phrases for professional communication",
          topics: ["Email Writing", "Meeting Vocabulary", "Professional Greetings"],
          difficulty: "intermediate",
          estimatedTime: "30",
          focusAreas: ["vocabulary", "usage"],
          keySkills: ["formal communication", "business terminology", "email etiquette"]
        }
        // ... more days would be here
      ],
      metadata: {
        createdAt: new Date().toISOString(),
        currentLevel: "intermediate",
        interests: ["business", "technology"],
        learningGoals: ["professional communication", "presentation skills"],
        timeAvailable: 30,
        preferredDifficulty: "intermediate"
      }
    };

    return NextResponse.json(mockLearningPath);

  } catch (error) {
    console.error('Error fetching learning path:', error);
    return NextResponse.json(
      { error: 'Failed to fetch learning path' },
      { status: 500 }
    );
  }
}