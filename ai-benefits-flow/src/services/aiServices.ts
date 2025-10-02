import type { Category } from '../types';
// your fetch + API-key logic. In the meantime the module contains a deterministic
// local fallback to allow the app to run without external dependencies.


// === Prompts (designed to return ONLY the category name) ===
export const classificationPrompt = (userInput: string) =>
`Return ONLY the category name from {Dental, OPD, Vision, Mental Health} that best matches the text: "${userInput}". Respond with a single word exactly matching one of those categories. If none match, return Other.`;


// === Prompt for generating step-by-step instructions ===
export const planPrompt = (userInput: string, benefitTitle: string) =>
`You are a benefits assistant. User text: "${userInput}". Selected benefit: "${benefitTitle}".
Return a JSON array of exactly 3 ordered steps (strings). Each step should be short, action-oriented, and explain how to avail the selected benefit (e.g., where to book, what documents to carry, timelines). Return ONLY the JSON array. Example: ["Step 1...","Step 2...","Step 3..."]`;


// === Replace this with a real remote call when you want to use an LLM ===
async function callRemoteAI(prompt: string): Promise<string> {
// placeholder — return empty to indicate remote is not configured.
return '';
}


// Local deterministic classifier fallback using keywords
export async function classifyText(userInput: string): Promise<Category> {
const remote = await callRemoteAI(classificationPrompt(userInput));
if (remote && ['Dental', 'OPD', 'Vision', 'Mental Health'].includes(remote.trim())) {
return remote.trim() as Category;
}


const text = userInput.toLowerCase();
if (/(tooth|teeth|dental|cavity|gum|wisdom)/i.test(text)) return 'Dental';
if (/(eye|vision|glasses|contact|blur|sight)/i.test(text)) return 'Vision';
if (/(depress|stress|anx|therapy|counsel)/i.test(text)) return 'Mental Health';
if (/(fever|cough|doctor|clinic|appointment|opd|consult)/i.test(text)) return 'OPD';
return 'Other';
}


// Generate a 3-step plan. Tries remote first, falls back to templated plan.
export async function generatePlan(userInput: string, benefitTitle: string): Promise<string[]> {
const remote = await callRemoteAI(planPrompt(userInput, benefitTitle));
if (remote) {
// Try to parse JSON array from remote response
try {
const parsed = JSON.parse(remote);
if (Array.isArray(parsed) && parsed.length === 3) return parsed.map(String);
} catch (e) {
// fall through to local fallback
}
}


// Local fallback: deterministic templated plan
return [
`Book an appointment with HR/benefits portal and mention "${benefitTitle}".`,
`Collect basic documents (ID, payslip) and any medical receipts or reports relevant to your request.`,
`Submit the claim via the benefits portal or hand the documents to HR; follow up within 7 days for confirmation.`
];
}