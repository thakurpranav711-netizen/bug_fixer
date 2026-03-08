// ============================================
// bugChecker.js - Groq API Version
// Fast & Free AI Bug Checker
// ============================================

const Groq = require("groq-sdk");
const dotenv = require("dotenv");

dotenv.config();

// Create Groq client
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

async function checkCodeForBugs(code, language) {
  // Build the prompt
  const prompt = `
You are an expert code reviewer and bug detector. 
Analyze the following ${language} code carefully.

Provide your response in this EXACT format:

## 🐛 Bugs Found
List each bug with:
- **Bug #1:** [description]
  - **Line:** [approximate line number]
  - **Severity:** [High / Medium / Low]
  - **Fix:** [how to fix it]

## ⚠️ Potential Issues
List warnings or potential problems.

## ✅ Fixed Code
Provide the COMPLETE corrected version of the full code in a code block.
Make sure to fix ALL bugs and issues found above.

## 💡 Suggestions
Any improvements or best practices.

If NO bugs found, say "No bugs found! Your code looks clean ✅" and still provide the original code in the Fixed Code section along with suggestions.

Here is the code to analyze:

\`\`\`${language}
${code}
\`\`\`
`;

  try {
    // Use Groq API with Llama model
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "You are an expert programmer and code reviewer. You find bugs, security issues, and provide corrected code. Always provide the complete fixed code, not just snippets.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      model: "llama-3.3-70b-versatile",
      temperature: 0.3,
      max_tokens: 4096,
      top_p: 1,
      stream: false,
    });

    // Extract the response text
    const text = chatCompletion.choices[0]?.message?.content;

    if (!text) {
      throw new Error("No response received from AI");
    }

    return text;
  } catch (error) {
    console.error("Groq API Error:", error.message);

    if (error.message.includes("API key") || error.message.includes("invalid_api_key")) {
      throw new Error(
        "Invalid API key. Check your GROQ_API_KEY in .env file."
      );
    }
    if (error.message.includes("rate_limit") || error.message.includes("429")) {
      throw new Error(
        "Rate limit reached. Please wait a moment and try again."
      );
    }
    if (error.message.includes("context_length") || error.message.includes("too long")) {
      throw new Error(
        "Code is too long. Please send smaller code snippets."
      );
    }

    throw new Error(`AI Error: ${error.message}`);
  }
}

module.exports = { checkCodeForBugs };