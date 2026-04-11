const { Groq } = require('groq-sdk');
require('dotenv').config();
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
async function test() {
  try {
    const res = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [{role: "system", content: "Return ONLY JSON."}, {role: "user", content: "hello"}],
      response_format: { type: "json_object" }
    });
    console.log(res.choices[0].message.content);
  } catch(e) {
    console.error("GROQ ERROR:", e);
  }
}
test();
