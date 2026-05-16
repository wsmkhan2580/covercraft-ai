const pdfParse = require('pdf-parse');
const fs = require('fs');

/**
 * Extracts text content from a PDF file
 * @param {string} filePath - Absolute path to PDF file
 * @returns {Promise<{text: string, pages: number, info: object}>}
 */
async function extractTextFromPDF(filePath) {
  try {
    const dataBuffer = fs.readFileSync(filePath);
    const data = await pdfParse(dataBuffer);

    return {
      text: data.text.trim(),
      pages: data.numpages,
      info: data.info || {},
    };
  } catch (err) {
    throw new Error(`Failed to parse PDF: ${err.message}`);
  }
}

/**
 * Cleans and normalizes extracted PDF text
 * @param {string} text - Raw extracted text
 * @returns {string} Cleaned text
 */
function cleanExtractedText(text) {
  return text
    .replace(/\s{3,}/g, '\n') // collapse excessive whitespace
    .replace(/\n{4,}/g, '\n\n') // collapse excessive newlines
    .replace(/[^\x20-\x7E\n]/g, '') // remove non-printable chars
    .trim();
}

/**
 * Cleans up uploaded file after processing
 * @param {string} filePath
 */
function cleanupFile(filePath) {
  try {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  } catch (err) {
    console.warn(`[WARN] Could not delete temp file: ${filePath}`);
  }
}

module.exports = { extractTextFromPDF, cleanExtractedText, cleanupFile };
