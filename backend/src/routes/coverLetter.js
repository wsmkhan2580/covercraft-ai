const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const { generate, parseResume } = require('../controllers/coverLetterController');

// POST /api/generate - Generate cover letter (with optional PDF)
router.post('/generate', upload.single('resume'), generate);

// POST /api/parse-resume - Parse resume only
router.post('/parse-resume', upload.single('resume'), parseResume);

// GET /api/status - API status
router.get('/status', (req, res) => {
  res.json({
    status: 'operational',
    geminiConfigured: !!process.env.GEMINI_API_KEY,
    timestamp: new Date().toISOString(),
  });
});

module.exports = router;
