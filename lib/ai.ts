import axios from "axios";


export interface AIUserData {
  personalInfo?: { fullName?: string };
  skills?: string[];
  education?: Array<Record<string, unknown>>;
  experience?: Array<Record<string, unknown>>;
  projects?: Array<Record<string, unknown>>;
}

export async function generateResumeContent(userData: AIUserData) {
  const AI_API_KEY = process.env.AI_API_KEY;
  const AI_MODEL_NAME = process.env.AI_MODEL_NAME || "grok-beta";
  const AI_BASE_URL = process.env.AI_BASE_URL || "https://api.x.ai/v1";

  if (!AI_API_KEY) {
    throw new Error("AI_API_KEY is not configured");
  }

  const prompt = `
    Generate professional resume content for the following user:
    Name: ${userData.personalInfo?.fullName}
    Skills: ${userData.skills?.join(", ")}
    Education: ${JSON.stringify(userData.education)}
    Work Experience: ${JSON.stringify(userData.experience)}
    Projects: ${JSON.stringify(userData.projects)}

    Output ONLY a valid JSON object matching this exact structure, with no markdown formatting or other text:
    {
      "summary": "A powerful 3-4 sentence professional summary",
      "experience": [
        {
          "company": "Company Name from input",
          "description": "Improved bullet points (focus on impact and metrics)"
        }
      ],
      "skills": ["Suggested skill 1", "Suggested skill 2"]
    }
    
    Structure the response precisely as JSON.
  `;

  try {
    const response = await axios.post(
      `${AI_BASE_URL}/chat/completions`,
      {
        model: AI_MODEL_NAME,
        messages: [
          { role: "system", content: "You are an expert resume writer and career coach." },
          { role: "user", content: prompt }
        ],
        response_format: { type: "json_object" }
      },
      {
        headers: {
          "Authorization": `Bearer ${AI_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    return JSON.parse(response.data.choices[0].message.content);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("AI Generation Error:", error.response?.data || error.message);
    }
    throw new Error("Failed to generate AI content");
  }
}

export async function generateLinkedInSummary(userData: AIUserData, tone: string = "professional") {
    const AI_API_KEY = process.env.AI_API_KEY;
    const AI_MODEL_NAME = process.env.AI_MODEL_NAME || "grok-beta";
    const AI_BASE_URL = process.env.AI_BASE_URL || "https://api.x.ai/v1";

    if (!AI_API_KEY) {
        throw new Error("AI_API_KEY is not configured");
    }

    const prompt = `
    Generate a compelling LinkedIn "About" section summary for:
    Name: ${userData.personalInfo?.fullName}
    Occupation/Experience: ${userData.experience?.[0]?.role} at ${userData.experience?.[0]?.company}
    Skills: ${userData.skills?.join(", ")}
    Tone: ${tone}

    Keep it impactful, engaging, and suitable for LinkedIn. Output the plain text summary only.
  `;

  try {
    const response = await axios.post(
        `${AI_BASE_URL}/chat/completions`,
        {
          model: AI_MODEL_NAME,
          messages: [
            { role: "system", content: "You are an expert career brand builder." },
            { role: "user", content: prompt }
          ],
        },
        {
          headers: {
            "Authorization": `Bearer ${AI_API_KEY}`,
            "Content-Type": "application/json"
          }
        }
      );
  
      return response.data.choices[0].message.content;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("AI LinkedIn Error:", error.response?.data || error.message);
    }
    throw new Error("Failed to generate LinkedIn summary");
  }
}
