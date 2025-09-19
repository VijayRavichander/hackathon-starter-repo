import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { convertToModelMessages, streamText, type UIMessage, stepCountIs } from "ai";
import { getWeather } from "@/lib/ai/tools"

export const maxDuration = 300;

export async function POST(req: Request) {

	const { messages, body }: { messages: UIMessage[], body: any } = await req.json();

    console.log("BODY", body)
	const openrouter = createOpenRouter({
		apiKey: process.env.OPENROUTER_API_KEY,
	});

    const model = openrouter.chat("openai/gpt-5-mini");

	const result = streamText({
        model,
        system: `You are a helpful AI assistant. Use the available tools when appropriate to provide accurate and helpful responses to users. 
        Always make a tool call to answer the user's question. Always answer with normal text and not in markdown format.`,
        messages: convertToModelMessages(messages),
        tools: { getWeather },
        stopWhen: stepCountIs(10),
        maxOutputTokens: 10000, 
	});
    
	return result.toUIMessageStreamResponse({ sendReasoning: true });
} 

