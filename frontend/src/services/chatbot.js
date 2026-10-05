/**
 * MediVision AI - Chatbot API Service
 * Calls POST /api/chat with the full conversation history.
 */

const RAW_URL = (import.meta.env.VITE_API_URL || '').trim();
// In production (Vercel), uses the Render backend URL from VITE_API_URL.
// In local dev, falls back to '/api' proxied to localhost:8000.
const API_BASE = RAW_URL ? RAW_URL.replace(/\/$/, '') : '/api';

/**
 * Send the full conversation history to the chatbot backend.
 * @param {Array<{role: string, content: string}>} messages
 * @param {Object} [analysisContext] - Optional medical image analysis context
 * @returns {Promise<string>} - The assistant's reply text
 */
export async function sendChatMessage(messages, analysisContext = null) {
  const apiKey = localStorage.getItem('medivision_api_key') || '';
  const headers = { 'Content-Type': 'application/json' };
  if (apiKey) headers['X-API-Key'] = apiKey;

  const payload = { messages };
  if (analysisContext) {
    payload.analysis_context = analysisContext;
  }

  const response = await fetch(`${API_BASE}/chat`, {
    method: 'POST',
    headers,
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const errData = await response.json().catch(() => ({}));
    throw new Error(errData.detail || `Server error: ${response.status}`);
  }

  const data = await response.json();
  return data.reply;
}
