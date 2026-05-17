const https = require('https')

function buildPrompt({
  candidateName,
  email,
  jobRole,
  company,
  skills,
  experienceLevel,
  jobDescription,
  resumeText
}) {
  const variation = Math.random().toString(36).slice(2, 8)

  return `You are a senior career consultant and professional writer who has helped 10,000+ candidates land jobs at top companies. You write cover letters that sound completely human, are deeply personalized, and consistently get candidates to the interview stage.

Write a COMPLETE, DETAILED, PROFESSIONAL cover letter.

STRICT REQUIREMENTS:
- MUST be MINIMUM 600 words, TARGET 700 words
- NEVER write less than 600 words under any circumstances
- Count your words before responding
- MUST fully fill one professional PDF page
- Every section must be fully written
- Do not summarize
- Do not shorten paragraphs
- Write detailed recruiter-quality content
- The cover letter must contain 4 to 6 complete paragraphs
- Each paragraph must be at least 4-5 sentences long
- Each paragraph should contain meaningful detailed content
- The response must end with a complete professional conclusion
- Never stop mid-sentence

Variation: ${variation}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CANDIDATE DETAILS:
- Full Name: ${candidateName}
- Email: ${email}
- Experience Level: ${experienceLevel}
- Key Skills: ${skills}

TARGET POSITION:
- Job Role: ${jobRole}
- Company: ${company}

JOB DESCRIPTION:
${jobDescription}

${resumeText ? `CANDIDATE RESUME:\n${resumeText.slice(0, 3000)}` : ''}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

LETTER STRUCTURE (follow exactly):

1. SALUTATION
"Dear Hiring Manager,"

2. OPENING PARAGRAPH (minimum 4 sentences)
- Immediately mention the exact job title and company name
- Show genuine excitement about the company
- Mention one strong technical capability upfront
- Do NOT start with "I am writing to..."

3. BODY PARAGRAPH 1 — TECHNICAL SKILLS (minimum 5 sentences)
- Highlight the most relevant technical skills
- Include practical examples and achievements
- Mention projects, tools, technologies, or contributions
- Connect skills directly with the role requirements

4. BODY PARAGRAPH 2 — EXPERIENCE & VALUE (minimum 5 sentences)
- Explain problem-solving ability
- Mention collaboration, teamwork, or leadership
- Show how previous experience can help the company
- Include measurable impact if possible

5. BODY PARAGRAPH 3 — COMPANY FIT (minimum 4 sentences)
- Explain why this specific company interests you
- Connect your goals with the company mission
- Show long-term interest and cultural alignment

6. CLOSING PARAGRAPH (minimum 4 sentences)
- Restate your strongest value proposition
- Express enthusiasm for an interview
- Thank them professionally
- End confidently

7. SIGN OFF
Sincerely,
${candidateName}
${email}

STRICT RULES:
- Sound completely human, natural, and professional
- Use active voice only
- No bullet points inside the letter
- No placeholders
- No AI-sounding phrases
- NEVER use:
  "I am writing to express"
  "I believe I am the perfect candidate"
  "I am passionate about"
- Do NOT generate any date
- Start directly from "Dear Hiring Manager,"
- Do not add notes after the cover letter
- Return ONLY the cover letter text
- REMEMBER: minimum 600 words, count before submitting

Write the full cover letter now:`
}

function callGeminiREST(apiKey, modelName, prompt) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({
      contents: [
        {
          parts: [{ text: prompt }]
        }
      ],
      generationConfig: {
        temperature: 0.8,        // ✅ FIX 1: was 0.7
        topP: 0.95,
        topK: 64,
        maxOutputTokens: 8192,   // ✅ FIX 2: was 2048 (too short)
      }
    })

    const options = {
      hostname: 'generativelanguage.googleapis.com',
      path: `/v1beta/models/${modelName}:generateContent?key=${apiKey}`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(body),
      },
    }

    const req = https.request(options, (res) => {
      let data = ''

      res.on('data', chunk => {
        data += chunk
      })

      res.on('end', () => {
        try {
          const parsed = JSON.parse(data)

          if (parsed.error) {
            reject(
              new Error(`${parsed.error.code}: ${parsed.error.message}`)
            )
            return
          }

          const text =
            parsed?.candidates?.[0]?.content?.parts?.[0]?.text

          if (!text) {
            reject(new Error('Empty response from Gemini'))
            return
          }

          resolve(text.trim())
        } catch (e) {
          reject(new Error('Failed to parse Gemini response'))
        }
      })
    })

    req.on('error', (e) => {
      reject(new Error(`Network error: ${e.message}`))
    })

    req.write(body)
    req.end()
  })
}

const MODELS = [
  'gemini-2.5-pro',
  'gemini-2.5-flash',
  'gemini-2.0-flash',
]

async function generateCoverLetter(params) {
  const apiKey = process.env.GEMINI_API_KEY

  if (!apiKey) {
    throw new Error('GEMINI_API_KEY is not set in .env file')
  }

  const prompt = buildPrompt(params)

  let lastError = null

  for (const modelName of MODELS) {
    try {
      console.log(`🔄 Trying: ${modelName}`)

      const text = await callGeminiREST(apiKey, modelName, prompt)

      // ✅ FIX 3: removed random date that was prepended to letter
      console.log(`✅ Success: ${modelName}`)

      return text

    } catch (err) {
      console.warn(`⚠️ ${modelName} failed: ${err.message}`)

      lastError = err

      const shouldRetry =
        err.message?.includes('404') ||
        err.message?.includes('429') ||
        err.message?.includes('not found') ||
        err.message?.includes('quota') ||
        err.message?.includes('deprecated')

      if (!shouldRetry) break

      await new Promise(r => setTimeout(r, 800))
    }
  }

  const msg = lastError?.message || 'Unknown error'

  if (
    msg.includes('403') ||
    msg.includes('invalid') ||
    msg.includes('API_KEY')
  ) {
    throw new Error(
      'Invalid Gemini API key. Get a new one from aistudio.google.com'
    )
  }

  if (
    msg.includes('429') ||
    msg.includes('quota')
  ) {
    throw new Error(
      'Rate limit reached. Wait 1-2 minutes and try again.'
    )
  }

  throw new Error(`Generation failed: ${msg}`)
}

module.exports = { generateCoverLetter }
        
