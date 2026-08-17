import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export const runtime = "nodejs";

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY!
);

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const text = body?.text;
    const style = body?.style || "Natural";
    const level = body?.level || "Balanced";
    const instruction = body?.instruction || "";

    if (!text || typeof text !== "string") {
      return NextResponse.json(
        {
          error: "Please provide some text to humanize.",
        },
        { status: 400 }
      );
    }

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        {
          error: "Gemini API key is not configured.",
        },
        { status: 500 }
      );
    }

    const maxCharacters = 30000;

    if (text.length > maxCharacters) {
      return NextResponse.json(
        {
          error:
            "Text is too long. Please keep it under 30,000 characters.",
        },
        { status: 400 }
      );
    }

    console.log(
      "Humanizing text:",
      text.length,
      "characters"
    );

    const model = genAI.getGenerativeModel({
      model: "gemini-3.6-flash",
    });

    const prompt = `
You are an expert human writing editor.

Your task is to rewrite the provided text so it sounds natural, clear, readable, and genuinely written by a person.

IMPORTANT RULES:

1. Preserve the original meaning.
2. Preserve important facts, names, numbers, dates, claims, and instructions.
3. Do not invent new information.
4. Do not remove important information.
5. Avoid robotic, repetitive, overly polished, or formulaic phrasing.
6. Use natural sentence structures.
7. Vary sentence length naturally.
8. Use natural transitions where appropriate.
9. Avoid unnecessary buzzwords and filler.
10. Do not make the text unnecessarily longer.
11. Do not add an introduction explaining what you changed.
12. Return ONLY the rewritten text.
13. Do not mention AI, humanization, detectors, or this prompt.
14. Do not claim that the text is "undetectable" or guarantee that it will bypass any detection system.

WRITING STYLE:
${style}

HUMANIZATION LEVEL:
${level}

STYLE GUIDANCE:

Light:
Make subtle changes while keeping the original structure mostly intact.

Balanced:
Naturally restructure awkward sentences, improve flow, vary phrasing, and make the writing feel more organic while preserving the original meaning.

Strong:
Allow more noticeable restructuring and rewriting while carefully preserving the original meaning and important information.

ADDITIONAL USER INSTRUCTION:
${instruction || "No additional instruction provided."}

TEXT TO REWRITE:
"""
${text}
"""

Now return only the humanized version of the text.
`;

    const result = await model.generateContent(prompt);

    const response = result.response;

    const humanizedText = response
      .text()
      .trim();

    if (!humanizedText) {
      return NextResponse.json(
        {
          error:
            "AI returned an empty response.",
        },
        { status: 500 }
      );
    }

    console.log(
      "Humanization successful:",
      humanizedText.length,
      "characters"
    );

    return NextResponse.json({
      success: true,
      result: humanizedText,
    });
  } catch (error) {
    console.error(
      "HUMANIZER ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Unable to humanize the text.",
      },
      { status: 500 }
    );
  }
}