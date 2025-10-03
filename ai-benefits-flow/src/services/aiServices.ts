const OPENROUTER_API_KEY = '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';

export async function getClassification(userInput: string) {
  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'openai/gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: `You are a helpful assistant for a healthcare benefits app. 
Classify the user's health issue into one category: Dental, Mental Health, Vision, OPD only else nothing . 
Then create 2 to 4 mock benefit cards with fields: title, coverage, description. 
Finally, provide a 3-step action plan for each benefit. 
Return the result strictly in this JSON format:
{
  "category": "<category>",
  "benefits": [
    {
      "title": "...",
      "coverage": "...",
      "description": "..."
    }
  ],
  "actionPlan": [
    "Step 1: ...",
    "Step 2: ...",
    "Step 3: ..."
  ]
}`
        },
        {
          role: 'user',
          content: userInput
        }
      ]
    })
  });

  const json = await response.json();
  const content = json?.choices?.[0]?.message?.content;
  try {
    // Try parsing JSON directly from model output
    return JSON.parse(content);
  } catch {
    console.warn('Failed to parse JSON from model, returning raw content.');
    return content;
  }
}

export async function getActionPlan(selectedBenefit: string) {
  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'openai/gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: `You are an assistant that creates clear 3-step action plans for availing health benefits. 
Return the result as JSON array of strings:
["Step 1: ...", "Step 2: ...", "Step 3: ..."]`
        },
        {
          role: 'user',
          content: `Generate a 3-step action plan for the benefit: ${selectedBenefit}.`
        }
      ]
    })
  });

  const json = await response.json();
  const content = json?.choices?.[0]?.message?.content;
  try {
    return JSON.parse(content);
  } catch {
    console.warn('Failed to parse JSON from model, returning raw content.');
    return content;
  }
}
