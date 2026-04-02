import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { text } = await req.json();

  const res = await fetch(
    `https://api.elevenlabs.io/v1/text-to-speech/${process.env.ELEVENLABS_VOICE_ID}`,
    {
      method: "POST",
      headers: {
        "xi-api-key": process.env.ELEVENLABS_API_KEY!,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text,
        model_id: "eleven_multilingual_v2",
        voice_settings: { stability: 0.5, similarity_boost: 0.75 },
      }),
    }
  );

  if (!res.ok) {
    const err = await res.text();
    console.error('ElevenLabs error:', res.status, err);
    return NextResponse.json({ error: err }, { status: res.status });
  }

  const audio = await res.arrayBuffer();
  return new NextResponse(audio, {
    headers: { "Content-Type": "audio/mpeg" },
  });
}