import { createOpenAI } from 'ai';

// Perplexity API configuration
const perplexity = createOpenAI({
  apiKey: process.env.PERPLEXITY_API_KEY,
  baseURL: 'https://api.perplexity.ai',
});

export async function generateFlashcards(transcript: string, options: {
  difficulty?: string;
  topic?: string;
  customPrompt?: string;
}) {
  const { difficulty = 'intermediate', topic = '', customPrompt = '' } = options;

  const systemPrompt = `Bạn là một chuyên gia dạy tiếng Anh chuyên tạo flashcard hiệu quả để học từ vựng.

Nhiệm vụ của bạn là phân tích transcript được cung cấp và tạo ra các flashcard hấp dẫn giúp học sinh học từ vựng, cụm từ và khái niệm tiếng Anh.

Hướng dẫn:
- Tạo 5-8 flashcard cho mỗi transcript
- Tập trung vào từ vựng, cụm từ, thành ngữ và khái niệm chính
- Làm cho câu hỏi rõ ràng và có tính giáo dục
- Cung cấp câu trả lời toàn diện với ngữ cảnh và ví dụ
- Điều chỉnh độ khó dựa trên cấp độ được chỉ định: ${difficulty}
- Bao gồm mẹo phát âm khi có liên quan
- Thêm ví dụ sử dụng trong các ngữ cảnh khác nhau
- Sử dụng song ngữ Việt-Anh để giúp người học Việt Nam hiểu rõ hơn

${topic ? `Lĩnh vực trọng tâm: ${topic}` : ''}
${customPrompt ? `Hướng dẫn bổ sung: ${customPrompt}` : ''}

Định dạng phản hồi của bạn dưới dạng mảng JSON của các đối tượng flashcard với cấu trúc sau:
{
  "question": "Từ/cụm từ [word/phrase] có nghĩa là gì? | What does [word/phrase] mean?",
  "answer": "Giải thích chi tiết với ví dụ và ngữ cảnh bằng tiếng Việt và tiếng Anh | Detailed explanation with examples and context in Vietnamese and English",
  "difficulty": "easy|medium|hard",
  "category": "vocabulary|grammar|pronunciation|idioms"
}`;

  try {
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
          { role: 'user', content: `Vui lòng tạo flashcard từ transcript này:\n\n${transcript}` }
        ],
        temperature: 0.7,
        max_tokens: 2000,
      }),
    });

    if (!response.ok) {
      throw new Error(`Perplexity API error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices[0]?.message?.content || '[]';
    
    try {
      return JSON.parse(content);
    } catch (parseError) {
      console.error('Failed to parse Perplexity response:', parseError);
      return [];
    }
  } catch (error) {
    console.error('Error calling Perplexity API:', error);
    throw error;
  }
}

export async function transcribeAudio(audioFile: File) {
  // Note: Perplexity doesn't have audio transcription capabilities
  // We'll need to use a different service for this or implement a fallback
  throw new Error('Audio transcription not available with Perplexity API. Please use OpenAI Whisper or another transcription service.');
}

export async function generateLearningPath(userProfile: {
  currentLevel: string;
  interests: string[];
  learningGoals: string[];
  timeAvailable: number;
  preferredDifficulty: string;
}) {
  const systemPrompt = `Bạn là một chuyên gia thiết kế chương trình học tiếng Anh. Tạo lộ trình học 7 ngày được cá nhân hóa cho người học tiếng Anh.

Hồ sơ người dùng:
- Cấp độ hiện tại: ${userProfile.currentLevel}
- Sở thích: ${userProfile.interests.join(', ')}
- Mục tiêu học tập: ${userProfile.learningGoals.join(', ')}
- Thời gian có sẵn: ${userProfile.timeAvailable} phút mỗi ngày
- Độ khó ưa thích: ${userProfile.preferredDifficulty}

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

  try {
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
      throw new Error(`Perplexity API error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices[0]?.message?.content || '[]';
    
    try {
      return JSON.parse(content);
    } catch (parseError) {
      console.error('Failed to parse Perplexity response:', parseError);
      return [];
    }
  } catch (error) {
    console.error('Error calling Perplexity API:', error);
    throw error;
  }
}

export default perplexity;