export async function getAISafetySuggestions(promptText) {
  try {
    const res = await fetch("/api/openai", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt })
    });
    if (!res.ok) throw new Error('AI server error');
    const data = await res.json();
    return data; 
  } catch (err) {
    console.warn("AI request failed:", err);
    return { error: err.message };
  }
}
