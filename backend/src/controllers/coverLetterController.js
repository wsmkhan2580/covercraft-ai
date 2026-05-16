const { extractTextFromPDF, cleanExtractedText, cleanupFile } = require('../utils/pdfParser');
const { generateCoverLetter } = require('../utils/gemini');

/**
 * POST /api/generate
 * Generates a cover letter using Gemini AI with optional PDF resume parsing
 */
async function generate(req, res, next) {
  const uploadedFilePath = req.file?.path;

  try {
    // Validate required fields
    const { candidateName, email, jobRole, company, skills, experienceLevel, jobDescription } = req.body;

    const missing = [];
    if (!candidateName?.trim()) missing.push('candidateName');
    if (!email?.trim()) missing.push('email');
    if (!jobRole?.trim()) missing.push('jobRole');
    if (!company?.trim()) missing.push('company');
    if (!skills?.trim()) missing.push('skills');
    if (!experienceLevel?.trim()) missing.push('experienceLevel');
    if (!jobDescription?.trim()) missing.push('jobDescription');

    if (missing.length > 0) {
      return res.status(400).json({
        error: 'Missing required fields',
        missingFields: missing,
      });
    }

    // Extract resume text if PDF was uploaded
    let resumeText = '';
    let resumePreview = '';
    let resumePages = 0;

    if (uploadedFilePath) {
      try {
        const parsed = await extractTextFromPDF(uploadedFilePath);
        resumeText = cleanExtractedText(parsed.text);
        resumePages = parsed.pages;
        // First 500 chars as preview
        resumePreview = resumeText.slice(0, 500) + (resumeText.length > 500 ? '...' : '');
      } catch (parseErr) {
        console.warn('[WARN] PDF parse failed:', parseErr.message);
        // Non-fatal: continue without resume text
      } finally {
        cleanupFile(uploadedFilePath);
      }
    }

    // Generate cover letter via Gemini
    const coverLetter = await generateCoverLetter({
      candidateName: candidateName.trim(),
      email: email.trim(),
      jobRole: jobRole.trim(),
      company: company.trim(),
      skills: skills.trim(),
      experienceLevel: experienceLevel.trim(),
      jobDescription: jobDescription.trim(),
      resumeText,
    });

    return res.status(200).json({
      success: true,
      coverLetter,
      metadata: {
        candidateName: candidateName.trim(),
        jobRole: jobRole.trim(),
        company: company.trim(),
        generatedAt: new Date().toISOString(),
        wordCount: coverLetter.split(/\s+/).length,
        hasResume: !!resumeText,
        resumePages,
        resumePreview,
      },
    });
  } catch (err) {
    // Ensure cleanup even on error
    if (uploadedFilePath) cleanupFile(uploadedFilePath);
    next(err);
  }
}

/**
 * POST /api/parse-resume
 * Parses only the resume PDF and returns extracted text
 */
async function parseResume(req, res, next) {
  const uploadedFilePath = req.file?.path;

  if (!uploadedFilePath) {
    return res.status(400).json({ error: 'No PDF file uploaded' });
  }

  try {
    const parsed = await extractTextFromPDF(uploadedFilePath);
    const cleanText = cleanExtractedText(parsed.text);

    return res.status(200).json({
      success: true,
      text: cleanText,
      preview: cleanText.slice(0, 600),
      pages: parsed.pages,
      charCount: cleanText.length,
      wordCount: cleanText.split(/\s+/).length,
    });
  } catch (err) {
    next(err);
  } finally {
    cleanupFile(uploadedFilePath);
  }
}

module.exports = { generate, parseResume };
