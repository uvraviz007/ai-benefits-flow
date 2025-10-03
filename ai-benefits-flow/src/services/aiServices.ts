
const OPENROUTER_API_KEY = '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'; // Replace with your OpenRouter API key

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
  const jsontext = await response.json();
    // console.log('[DEBUG] getClassification API response:', jsontext);
    // if (jsontext && jsontext.choices && jsontext.choices[0]?.message?.content) {
    //   console.log('[DEBUG] LLM message content:', jsontext.choices[0].message.content);
    // }
  return jsontext;
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
  const jsontext = await response.json();
    // console.log('[DEBUG] getActionPlan API response:', jsontext);
    // if (jsontext && jsontext.choices && jsontext.choices[0]?.message?.content) {
    //   console.log('[DEBUG] LLM message content:', jsontext.choices[0].message.content);
    // }
  return jsontext;
}