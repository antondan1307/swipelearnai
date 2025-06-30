import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { videoUrl, transcript, difficulty = 'intermediate', topic = '', customPrompt = '' } = await request.json();

    if (!transcript) {
      return NextResponse.json({ error: 'Transcript is required | Cần có transcript' }, { status: 400 });
    }

    // Create a prompt for flashcard generation using Perplexity
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
      console.error('Perplexity API error:', response.status, response.statusText);
      return NextResponse.json({ error: 'Failed to generate flashcards | Không thể tạo flashcard' }, { status: 500 });
    }

    const data = await response.json();
    const content = data.choices[0]?.message?.content || '[]';

    let flashcards;
    try {
      flashcards = JSON.parse(content);
    } catch (parseError) {
      console.error('Failed to parse Perplexity response:', parseError);
      return NextResponse.json({ error: 'Failed to generate flashcards | Không thể tạo flashcard' }, { status: 500 });
    }

    return NextResponse.json({
      flashcards,
      metadata: {
        videoUrl,
        difficulty,
        topic,
        generatedAt: new Date().toISOString(),
        wordCount: transcript.split(' ').length,
        provider: 'Perplexity AI'
      }
    });

  } catch (error) {
    console.error('Error generating flashcards:', error);
    return NextResponse.json(
      { error: 'Failed to generate flashcards | Không thể tạo flashcard' },
      { status: 500 }
    );
  }
}