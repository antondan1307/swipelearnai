import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const audioFile = formData.get('audio') as File;

    if (!audioFile) {
      return NextResponse.json({ error: 'Audio file is required | Cần có file âm thanh' }, { status: 400 });
    }

    // Check file size (25MB limit)
    if (audioFile.size > 25 * 1024 * 1024) {
      return NextResponse.json({ error: 'File too large. Maximum size is 25MB. | File quá lớn. Kích thước tối đa là 25MB.' }, { status: 400 });
    }

    // Note: Perplexity doesn't support audio transcription
    // We need to use a different service or implement a fallback
    // For now, we'll return a mock response or suggest using OpenAI Whisper

    return NextResponse.json({
      error: 'Audio transcription not available with Perplexity API. Please use OpenAI Whisper or another transcription service. | Chuyển đổi âm thanh không khả dụng với Perplexity API. Vui lòng sử dụng OpenAI Whisper hoặc dịch vụ khác.',
      suggestion: 'Consider using OpenAI Whisper API for audio transcription | Hãy xem xét sử dụng OpenAI Whisper API để chuyển đổi âm thanh'
    }, { status: 501 });

  } catch (error) {
    console.error('Error transcribing audio:', error);
    return NextResponse.json(
      { error: 'Failed to transcribe audio | Không thể chuyển đổi âm thanh' },
      { status: 500 }
    );
  }
}