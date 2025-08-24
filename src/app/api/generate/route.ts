export const runtime = "edge";

import { openai } from "@/lib/openai";
import { NextResponse } from "next/server";
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";

export async function POST(req: Request) {
  const { prompt, type, originalPrompt, previousResponse, isImproving } = await req.json();

   const messages: ChatCompletionMessageParam[] = isImproving
  ? [
      {
        role: "system",
        content: `You are an assistant helping to improve user-generated content.`,
      },
      {
        role: "user",
        content: `Original prompt:\n${originalPrompt}`,
      },
      {
        role: "assistant",
        content: previousResponse,
      },
      {
        role: "user",
        content: `Improve the above based on this instruction:\n${prompt}`,
      },
    ]
  : [
      {
        role: "user",
        content: `Generate a professional ${type.toLowerCase()} based on:\n${prompt}`,
      },
    ];

  try {
    const response = await openai.chat.completions.create({
      model: "meta-llama/llama-3-70b-instruct",
      stream: true,
      messages,
    });

    const encoder = new TextEncoder();

    const stream = new ReadableStream({
      async start(controller) {
        for await (const chunk of response) {
          const token = chunk.choices?.[0]?.delta?.content || "";
          controller.enqueue(encoder.encode(token));
        }
        controller.close();
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
      },
    });
  } catch (error) {
    console.error("Streaming error:", error);
    return NextResponse.json(
      { error: "Something went wrong while generating content." },
      { status: 500 }
    );
  }
}