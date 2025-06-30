import { NextRequest, NextResponse } from 'next/server';

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
      return NextResponse.json({ error: 'User ID is required | Cần có User ID' }, { status: 400 });
    }

    // Create personalized learning path using Perplexity
    const systemPrompt = `Bạn là một chuyên gia thiết kế chương trình học tiếng Anh. Tạo lộ trình học 7 ngày được cá nhân hóa cho người học tiếng Anh.

Hồ sơ người dùng:
- Cấp độ hiện tại: ${currentLevel}
- Sở thích: ${interests.join(', ')}
- Mục tiêu học tập: ${learningGoals.join(', ')}
- Thời gian có sẵn: ${timeAvailable} phút mỗi ngày
- Độ khó ưa thích: ${preferredDifficulty}

Tạo lộ trình học 7 ngày với các module hàng ngày. Mỗi ngày nên xây dựng dựa trên việc học của ngày trước. Tập trung vào từ vựng và cụm từ thực tế phù hợp với sở thích và mục tiêu của người dùng.

Định dạng phản hồi của bạn dưới dạng mảng JSON của 7 module học tập với cấu trúc này:
{
  "day": 1,
  "title": "Tiêu đề Module | Module Title",
  "description": "Mô tả ngắn gọn về những gì sẽ được học | Brief description of what will be learned",
  "topics": ["chủ đề1", "chủ đề2", "chủ đề3"],
  "difficulty": "beginner|intermediate|advanced",
  "estimatedTime": "phút",
  "focusAreas": ["vocabulary", "pronunciation", "grammar", "usage"],
  "keySkills": ["kỹ năng1", "kỹ năng2", "kỹ năng3"]
}`;

    const response = await fetch('https://api.perplexity.ai/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.PERPLEXITY_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.1-sonar-small-128k-online',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: 'Vui lòng tạo lộ trình học tiếng Anh 7 ngày được cá nhân hóa dựa trên hồ sơ của tôi.' }
        ],
        temperature: 0.8,
        max_tokens: 2500,
      }),
    });

    if (!response.ok) {
      console.error('Perplexity API error:', response.status, response.statusText);
      return NextResponse.json({ error: 'Failed to generate learning path | Không thể tạo lộ trình học' }, { status: 500 });
    }

    const data = await response.json();
    const content = data.choices[0]?.message?.content || '[]';

    let learningPath;
    try {
      learningPath = JSON.parse(content);
    } catch (parseError) {
      console.error('Failed to parse Perplexity response:', parseError);
      return NextResponse.json({ error: 'Failed to generate learning path | Không thể tạo lộ trình học' }, { status: 500 });
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
        preferredDifficulty,
        provider: 'Perplexity AI'
      }
    });

  } catch (error) {
    console.error('Error generating learning path:', error);
    return NextResponse.json(
      { error: 'Failed to generate learning path | Không thể tạo lộ trình học' },
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
      return NextResponse.json({ error: 'User ID is required | Cần có User ID' }, { status: 400 });
    }

    // In a real implementation, fetch from database
    // For demo, return mock data
    const mockLearningPath = {
      pathId: pathId || `path_${userId}_demo`,
      userId,
      learningPath: [
        {
          day: 1,
          title: "Tiếng Anh Thương mại Cơ bản | Business English Fundamentals",
          description: "Từ vựng và cụm từ thiết yếu cho giao tiếp chuyên nghiệp | Essential vocabulary and phrases for professional communication",
          topics: ["Viết Email | Email Writing", "Từ vựng Họp | Meeting Vocabulary", "Chào hỏi Chuyên nghiệp | Professional Greetings"],
          difficulty: "intermediate",
          estimatedTime: "30",
          focusAreas: ["vocabulary", "usage"],
          keySkills: ["giao tiếp trang trọng | formal communication", "thuật ngữ kinh doanh | business terminology", "phép lịch sự email | email etiquette"]
        }
        // ... more days would be here
      ],
      metadata: {
        createdAt: new Date().toISOString(),
        currentLevel: "intermediate",
        interests: ["business", "technology"],
        learningGoals: ["professional communication", "presentation skills"],
        timeAvailable: 30,
        preferredDifficulty: "intermediate",
        provider: 'Perplexity AI'
      }
    };

    return NextResponse.json(mockLearningPath);

  } catch (error) {
    console.error('Error fetching learning path:', error);
    return NextResponse.json(
      { error: 'Failed to fetch learning path | Không thể lấy lộ trình học' },
      { status: 500 }
    );
  }
}