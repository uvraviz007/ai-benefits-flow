
const OPENROUTER_API_KEY = 'YOUR_API_KEY'; // Replace with your OpenRouter API key

export async function getClassification(userInput: string) {
  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${'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'}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'openai/gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: [
            { type: 'text', text: 'You are a helpful assistant that classifies user health concerns into categories like Dental, Mental Health, and Vision. You then provide benefit cards with mock data, and generate 3-step action plans.' }
          ]
        },
        {
          role: 'user',
          content: [
            { type: 'text', text: userInput }
          ]
        }
      ]
    })
  });
  return await response.json();
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
          content: [
            { type: 'text', text: 'You are an assistant that creates clear 3-step action plans for availing health benefits.' }
          ]
        },
        {
          role: 'user',
          content: [
            { type: 'text', text: `Generate a 3-step action plan for the benefit: ${selectedBenefit}.` }
          ]
        }
      ]
    })
  });
  return await response.json();
}