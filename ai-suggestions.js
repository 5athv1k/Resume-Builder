/* ═══════════════════════════════════════════════════════════════
   Resume Made Easy — AI Content Suggestions (Claude API)
   ═══════════════════════════════════════════════════════════════ */

window.AI_SUGGESTIONS = (function () {
  'use strict';

  const STORAGE_KEY = 'resume_ai_api_key';

  function getApiKey() {
    return localStorage.getItem(STORAGE_KEY) || '';
  }

  function setApiKey(key) {
    localStorage.setItem(STORAGE_KEY, key.trim());
  }

  function clearApiKey() {
    localStorage.removeItem(STORAGE_KEY);
  }

  function hasApiKey() {
    return !!getApiKey();
  }

  /**
   * Call the Claude API with a prompt. Returns the text response.
   * Uses the user's API key stored in localStorage.
   */
  async function callClaude(systemPrompt, userPrompt) {
    const apiKey = getApiKey();
    if (!apiKey) {
      throw new Error('No API key configured. Please add your Claude API key in AI Settings.');
    }

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'anthropic-dangerous-direct-browser-access': 'true',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1024,
        system: systemPrompt,
        messages: [
          { role: 'user', content: userPrompt },
        ],
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      if (response.status === 401) {
        throw new Error('Invalid API key. Please check your Claude API key in AI Settings.');
      }
      if (response.status === 429) {
        throw new Error('Rate limit exceeded. Please wait a moment and try again.');
      }
      throw new Error(errorData.error?.message || `API error (${response.status})`);
    }

    const data = await response.json();
    if (data.content && data.content.length > 0) {
      return data.content[0].text;
    }
    throw new Error('Empty response from AI.');
  }

  /**
   * Generate 2-3 professionally worded bullet points for a work experience entry.
   * @param {string} jobTitle - The job title
   * @param {string} company - The company name
   * @param {string} keywords - Optional keywords/responsibilities from the user
   * @returns {Promise<string[]>} Array of bullet point strings
   */
  async function suggestBulletPoints(jobTitle, company, keywords) {
    const systemPrompt = `You are a professional resume writer. Generate exactly 3 resume bullet points for a job experience entry. Each bullet point should:
- Start with a strong action verb
- Include quantifiable achievements where possible (use realistic but impressive numbers)
- Be concise (1-2 lines each)
- Be professionally worded and ATS-keyword-aware
- NOT use the * or - character at the start (the app will add bullet formatting)

Return ONLY the 3 bullet points, one per line, separated by newlines. No numbering, no extra text, no markdown.`;

    const userPrompt = `Job Title: ${jobTitle || 'Professional'}
Company: ${company || 'Company'}
${keywords ? `Key responsibilities/skills to highlight: ${keywords}` : 'Generate general bullet points appropriate for this role.'}`;

    const response = await callClaude(systemPrompt, userPrompt);
    return response
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line.length > 0)
      .slice(0, 3);
  }

  /**
   * Rewrite the professional summary to be punchier and ATS-keyword-aware.
   * @param {string} currentSummary - The user's current summary text
   * @param {string} jobTitle - The user's job title for context
   * @returns {Promise<string>} The polished summary text
   */
  async function polishSummary(currentSummary, jobTitle) {
    const systemPrompt = `You are a professional resume writer specializing in crafting compelling professional summaries. Rewrite the given summary to be:
- More impactful and concise (2-4 sentences)
- ATS-keyword-aware for the given job title
- Starting with years of experience and key expertise
- Including quantifiable achievements if the original mentions any
- Professionally worded with strong, confident language
- Free of first-person pronouns (no "I", "my", "me")

Return ONLY the rewritten summary text. No quotes, no explanation, no markdown.`;

    const userPrompt = `Job Title: ${jobTitle || 'Professional'}

Current Summary:
${currentSummary}`;

    return await callClaude(systemPrompt, userPrompt);
  }

  /**
   * Suggest skills based on job title and existing skills.
   * @param {string} jobTitle
   * @param {string[]} existingSkills
   * @returns {Promise<string[]>} Array of suggested skill strings
   */
  async function suggestSkills(jobTitle, existingSkills) {
    const systemPrompt = `You are a professional resume consultant. Suggest 5-8 relevant skills for the given job title that are NOT already in the user's skill list. Focus on:
- Technical skills relevant to the role
- Industry-standard tools and technologies
- Soft skills that are highly valued
- ATS-friendly keyword phrasing

Return ONLY the skills, one per line. No numbering, no extra text, no markdown.`;

    const userPrompt = `Job Title: ${jobTitle || 'Professional'}
Existing Skills: ${existingSkills.length > 0 ? existingSkills.join(', ') : 'None yet'}`;

    const response = await callClaude(systemPrompt, userPrompt);
    return response
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line.length > 0)
      .slice(0, 8);
  }

  // Public API
  return {
    getApiKey,
    setApiKey,
    clearApiKey,
    hasApiKey,
    suggestBulletPoints,
    polishSummary,
    suggestSkills,
  };
})();
