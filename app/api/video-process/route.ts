import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { videoUrl, maxDuration = 30 } = await request.json();

    if (!videoUrl) {
      return NextResponse.json({ error: 'Video URL is required' }, { status: 400 });
    }

    // Validate video URL format
    const isValidUrl = /^https?:\/\/(www\.)?(youtube\.com|youtu\.be|tiktok\.com)/.test(videoUrl);
    if (!isValidUrl) {
      return NextResponse.json({ error: 'Invalid video URL. Please use YouTube or TikTok URLs.' }, { status: 400 });
    }

    // In a real implementation, you would:
    // 1. Extract video ID from URL
    // 2. Use youtube-dl or similar to download video
    // 3. Use ffmpeg to extract audio and cut to maxDuration
    // 4. Store the processed files temporarily
    // 5. Return the processed video/audio URLs

    // For demo purposes, we'll simulate the process
    const videoId = extractVideoId(videoUrl);
    const processedVideoUrl = `https://example.com/processed/${videoId}.mp4`;
    const audioUrl = `https://example.com/audio/${videoId}.mp3`;

    return NextResponse.json({
      success: true,
      videoId,
      originalUrl: videoUrl,
      processedVideoUrl,
      audioUrl,
      duration: maxDuration,
      status: 'processed'
    });

  } catch (error) {
    console.error('Error processing video:', error);
    return NextResponse.json(
      { error: 'Failed to process video' },
      { status: 500 }
    );
  }
}

function extractVideoId(url: string): string {
  // Extract video ID from YouTube or TikTok URL
  if (url.includes('youtube.com/watch?v=')) {
    return url.split('v=')[1].split('&')[0];
  } else if (url.includes('youtu.be/')) {
    return url.split('youtu.be/')[1].split('?')[0];
  } else if (url.includes('tiktok.com')) {
    // Extract TikTok video ID (simplified)
    const matches = url.match(/\/video\/(\d+)/);
    return matches ? matches[1] : Math.random().toString(36).substr(2, 9);
  }
  
  return Math.random().toString(36).substr(2, 9);
}