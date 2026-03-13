export default async function handler(req, res) {
  // Solo aceptar POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Comprobar que existe la API key
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'GEMINI_API_KEY no configurada en las variables de entorno de Vercel' });
  }

  const { system, messages } = req.body;

  if (!messages || !Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: 'Falta el campo messages' });
  }

  // Convertir al formato que usa Gemini
  const contents = messages.map((m) => ({
    role: m.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: m.content }],
  }));

  const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

  try {
    const geminiRes = await fetch(geminiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        system_instruction: {
          parts: [{ text: system || '' }],
        },
        contents,
        generationConfig: {
          maxOutputTokens: 64,
          temperature: 0.1,
        },
      }),
    });

    const data = await geminiRes.json();

    if (!geminiRes.ok) {
      const msg = data?.error?.message || 'Error desconocido en Gemini';
      return res.status(geminiRes.status).json({ error: msg });
    }

    const text =
      data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ||
      '⚠ Sin respuesta';

    return res.status(200).json({ content: [{ text }] });

  } catch (err) {
    return res.status(500).json({ error: 'Error de red: ' + err.message });
  }
}
