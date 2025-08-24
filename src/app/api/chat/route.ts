import { openai } from "@/lib/openai";
import { NextResponse } from "next/server";
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";

export async function POST(req: Request) {
  const { prompt, messages } = await req.json();

  const history = messages.slice(-10).map((message: { isUser: boolean; text: string }) => ({
    role: message.isUser ? "user" : "assistant",
    content: message.text,
  }));

  const chatMessages: ChatCompletionMessageParam[] = [
    {
      role: "system",
      content: "You are a helpful AI chatbot.",
    },
    ...history,
    {
      role: "user",
      content: prompt,
    },
  ];

  try {
    const response = await openai.chat.completions.create({
      model: "meta-llama/llama-3-70b-instruct",
      messages: chatMessages,
    });

    return NextResponse.json({ response: response.choices[0].message.content });
  } catch (error) {
    console.error("Chatbot error:", error);
    return NextResponse.json(
      { error: "Something went wrong with the chatbot." },
      { status: 500 }
    );
  }
}
