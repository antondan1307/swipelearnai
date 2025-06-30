import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { apiKey } = await request.json();

    if (!apiKey) {
      return NextResponse.json({ error: 'API key is required' }, { status: 400 });
    }

    // Test the API key with a simple request
    const response = await fetch('https://api.perplexity.ai/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.1-sonar-small-128k-online',
        messages: [
          { role: 'user', content: 'Hello, this is a test message.' }
        ],
        max_tokens: 10,
      }),
    });

    if (response.ok) {
      return NextResponse.json({ valid: true, message: 'API key is valid' });
    } else {
      const errorData = await response.text();
      return NextResponse.json({ 
        valid: false, 
        message: 'Invalid API key',
        error: errorData 
      }, { status: 400 });
    }

  } catch (error) {
    console.error('Error testing API key:', error);
    return NextResponse.json(
      { valid: false, message: 'Error testing API key' },
      { status: 500 }
    );
  }
}