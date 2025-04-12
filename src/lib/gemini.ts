export async function getCropRecommendations(prompt: string) {
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error?.message || "Failed to fetch Gemini response.");
  }

  return (
    data.candidates?.[0]?.content?.parts?.[0]?.text ||
    "No response from Gemini."
  );
}
