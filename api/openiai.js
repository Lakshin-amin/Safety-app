import fetch from 'node-fetch';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  const body = req.body;
  const prompt = body.prompt || "Give brief safety tips in 5 lines";

  try {
    const r = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4o-mini", 
        messages: [{ role: "user", content: prompt }],
        max_tokens: 250,
        temperature: 0.6
      })
    });
    const data = await r.json();
    // extract text safely
    const text = data?.choices?.[0]?.message?.content || JSON.stringify(data);
    res.status(200).json({ text });
  } catch (err) {
    console.error("OpenAI error", err);
    res.status(500).json({ error: err.message || "OpenAI error" });
  }
}
