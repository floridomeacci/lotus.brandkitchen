/**
 * Lotus Brand Kitchen · LLM Client
 * Calls the local proxy at /api/llm which forwards to Replicate DeepSeek V3.
 */
window.LLM = {
  /**
   * @param {object} opts
   * @param {string} opts.prompt      – User prompt
   * @param {string} [opts.system]    – System instruction
   * @param {number} [opts.max_tokens=1024]
   * @param {number} [opts.temperature=0.6]
   * @returns {Promise<string>}       – Model output text
   */
  async call({ prompt, system, max_tokens, temperature }) {
    const res = await fetch('/api/llm', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt, system, max_tokens, temperature })
    });
    if (!res.ok) {
      const err = await res.text();
      throw new Error('LLM request failed: ' + err);
    }
    const data = await res.json();
    return data.output || '';
  }
};
