export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { system, messages } = req.body;
  const apiKey = process.env.GEMINI_API_KEY;

  // Convertir historial al formato de Gemini
  const contents = messages.map(m => ({
    role: m.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: m.content }]
  }));

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: system }] },
          contents,
          generationConfig: {
            maxOutputTokens: 64,
            temperature: 0.1,
          }
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({ error: data.error?.message || 'Error en Gemini API' });
    }

    // Adaptar respuesta al formato que espera el juego
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || '⚠ Sin respuesta';
    return res.status(200).json({
      content: [{ text: text.trim() }]
    });

  } catch (error) {
    return res.status(500).json({ error: 'Error conectando con Gemini: ' + error.message });
  }
}
