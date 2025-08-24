export async function generateText({
  prompt,
  type,
  tone,
  length,
  keywords,
  uid,
  onToken,
  originalPrompt,
  previousResponse,
  isImproving = false,
  language = 'English',
}: {
  prompt: string;
  type: string;
  tone: string;
  length: string;
  keywords?: string;
  uid: string;
  onToken?: (token: string) => void;
  originalPrompt?: string;
  previousResponse?: string;
  isImproving?: boolean;
  language?: string;
}) {
  let fullPrompt = prompt;

  if (isImproving) {
    fullPrompt = `Improve the following ${type} with a ${tone} tone and ${length} length. Original content: "${originalPrompt}". Previous response: "${previousResponse}". Instructions: "${prompt}"`;
  } else {
    fullPrompt = `Generate a ${type} in ${language} with a ${tone} tone and ${length} length based on the following: "${prompt}"`;
  }
  if (keywords && keywords.trim() !== "") {
    fullPrompt += ` Keywords: ${keywords}`;
  }

  const response = await fetch("/api/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      prompt: fullPrompt,
      type,
      uid,
      // mode, // Removed mode
      language,
      ...(isImproving && {
        isImproving: true,
        originalPrompt,
        previousResponse,
      }),
    }),
  });

  if (!response.ok) {
    throw new Error(`Failed to generate ${type}`);
  }

  const reader = response.body?.getReader();
  const decoder = new TextDecoder();
  let result = "";

  if (!reader) throw new Error("No stream received");

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    const chunk = decoder.decode(value, { stream: true });
    result += chunk;
    onToken?.(chunk);
  }

  // 🔁 Save full result after streaming is complete
  if (uid && result) {
    await fetch("/api/save", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        prompt,
        result,
        uid,
        type, // actual content type like "Email", "Post"
        // mode: isImproving ? "improve" : mode, // Removed mode
      }),
    });
  }

  return result;
}