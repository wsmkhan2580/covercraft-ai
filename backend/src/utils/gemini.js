

// const https = require('https')

// function buildPrompt({
//   candidateName, email, jobRole, company,
//   skills, experienceLevel, jobDescription, resumeText
// }) {
//   const variation = Math.random().toString(36).slice(2, 8)

//   return `You are a senior career consultant and professional writer who has helped 10,000+ candidates land jobs at top companies. You write cover letters that sound completely human, are deeply personalized, and consistently get candidates to the interview stage.

// Write a COMPLETE, DETAILED, PROFESSIONAL cover letter. Minimum 400 words. Variation: ${variation}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// CANDIDATE DETAILS:
// - Full Name: ${candidateName}
// - Email: ${email}
// - Experience Level: ${experienceLevel}
// - Key Skills: ${skills}

// TARGET POSITION:
// - Job Role: ${jobRole}
// - Company: ${company}

// JOB DESCRIPTION:
// ${jobDescription}

// ${resumeText ? `CANDIDATE RESUME:\n${resumeText.slice(0, 3000)}` : ''}
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// LETTER STRUCTURE (follow exactly):

// 1. DATE — Write today's date at top

// 2. SALUTATION — "Dear Hiring Manager,"

// 3. OPENING PARAGRAPH (60-80 words)
//    - Immediately mention the exact job title and company name
//    - Show genuine excitement with a specific reason why THIS company
//    - Mention one powerful achievement or skill upfront
//    - Do NOT start with "I am writing to..."

// 4. BODY PARAGRAPH 1 — SKILLS & EXPERIENCE (100-120 words)
//    - Pick 3 most relevant skills from the job description
//    - For each skill give a SPECIFIC example or achievement
//    - Use numbers/metrics where possible
//    - Connect directly to what the job description asks for

// 5. BODY PARAGRAPH 2 — COMPANY FIT (80-100 words)
//    - Show you researched the company
//    - Explain specifically why you want to work THERE
//    - Connect your personal goals to the company mission
//    - Show cultural fit and long-term commitment

// 6. CLOSING PARAGRAPH (50-60 words)
//    - Restate your top value proposition
//    - Express enthusiasm for an interview
//    - Thank them for their time
//    - Confident, professional tone

// 7. SIGN OFF
//    Sincerely,
//    ${candidateName}
//    ${email}

// STRICT RULES:
// - Minimum 400 words — write all sections fully
// - Sound completely human — warm, confident, specific
// - NEVER use: "I am writing to express", "I believe I am the perfect candidate", "I am passionate about"
// - Active voice only
// - No bullet points inside the letter — pure prose paragraphs
// - Do not add any notes after the letter ends
// - Do not stop early — write every section completely

// Write the full cover letter now:`
// }

// function callGeminiREST(apiKey, modelName, prompt) {
//   return new Promise((resolve, reject) => {
//     const body = JSON.stringify({
//       contents: [{
//         parts: [{ text: prompt }]
//       }],
//       generationConfig: {
//         temperature: 1.0 + Math.random() * 0.4,
//         topP: 0.95,
//         topK: 64,
//         maxOutputTokens: 2048,
//       }
//     })

//     const options = {
//       hostname: 'generativelanguage.googleapis.com',
//       path: `/v1beta/models/${modelName}:generateContent?key=${apiKey}`,
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'Content-Length': Buffer.byteLength(body),
//       },
//     }

//     const req = https.request(options, (res) => {
//       let data = ''
//       res.on('data', chunk => data += chunk)
//       res.on('end', () => {
//         try {
//           const parsed = JSON.parse(data)

//           if (parsed.error) {
//             reject(new Error(`${parsed.error.code}: ${parsed.error.message}`))
//             return
//           }

//           const text = parsed?.candidates?.[0]?.content?.parts?.[0]?.text
//           if (!text) {
//             reject(new Error('Empty response from Gemini'))
//             return
//           }

//           resolve(text.trim())
//         } catch (e) {
//           reject(new Error('Failed to parse Gemini response'))
//         }
//       })
//     })

//     req.on('error', (e) => reject(new Error(`Network error: ${e.message}`)))
//     req.write(body)
//     req.end()
//   })
// }

// const MODELS = [
//   'gemini-2.0-flash',
//   'gemini-2.0-flash-lite',
//   'gemini-2.5-flash',
//   'gemini-2.5-pro',
// ]

// async function generateCoverLetter(params) {
//   const apiKey = process.env.GEMINI_API_KEY
//   if (!apiKey) {
//     throw new Error('GEMINI_API_KEY is not set in .env file')
//   }

//   const prompt = buildPrompt(params)
//   let lastError = null

//   for (const modelName of MODELS) {
//     try {
//       console.log(`🔄 Trying: ${modelName}`)
//       const text = await callGeminiREST(apiKey, modelName, prompt)
//       console.log(`✅ Success: ${modelName}`)
//       return text
//     } catch (err) {
//       console.warn(`⚠️  ${modelName} failed: ${err.message}`)
//       lastError = err

//       const shouldRetry =
//         err.message?.includes('404') ||
//         err.message?.includes('429') ||
//         err.message?.includes('not found') ||
//         err.message?.includes('quota') ||
//         err.message?.includes('deprecated')

//       if (!shouldRetry) break
//       await new Promise(r => setTimeout(r, 800))
//     }
//   }

//   const msg = lastError?.message || 'Unknown error'
//   if (msg.includes('403') || msg.includes('invalid') || msg.includes('API_KEY')) {
//     throw new Error('Invalid Gemini API key. Get a new one from aistudio.google.com')
//   }
//   if (msg.includes('429') || msg.includes('quota')) {
//     throw new Error('Rate limit reached. Wait 1-2 minutes and try again.')
//   }
//   throw new Error(`Generation failed: ${msg}`)
// }

// module.exports = { generateCoverLetter }

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
- MUST be between 500 and 700 words
- MUST fully fill one professional PDF page
- Every section must be fully written
- Do not summarize
- Do not shorten paragraphs
- Write detailed recruiter-quality content
- The cover letter must contain 4 to 6 complete paragraphs
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

2. OPENING PARAGRAPH
- Immediately mention the exact job title and company name
- Show genuine excitement about the company
- Mention one strong technical capability upfront
- Do NOT start with "I am writing to..."

3. BODY PARAGRAPH 1 — TECHNICAL SKILLS
- Highlight the most relevant technical skills
- Include practical examples and achievements
- Mention projects, tools, technologies, or contributions
- Connect skills directly with the role requirements

4. BODY PARAGRAPH 2 — EXPERIENCE & VALUE
- Explain problem-solving ability
- Mention collaboration, teamwork, or leadership
- Show how previous experience can help the company
- Include measurable impact if possible

5. BODY PARAGRAPH 3 — COMPANY FIT
- Explain why this specific company interests you
- Connect your goals with the company mission
- Show long-term interest and cultural alignment

6. CLOSING PARAGRAPH
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
        temperature: 0.7,
        topP: 0.95,
        topK: 64,
        maxOutputTokens: 2048,
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

      const text = await callGeminiREST(
        apiKey,
        modelName,
        prompt
      )

      const currentDate = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })

      const finalLetter = `${currentDate}

${text}`

      console.log(`✅ Success: ${modelName}`)

      return finalLetter

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