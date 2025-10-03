
import React, { useState } from 'react';
import BenefitInput from './components/BenefitInput';
import BenefitList from './components/BenefitList';
import BenefitDetails from './components/BenefitDetails';
import { getClassification, getActionPlan } from './services/aiServices';
import type { Benefit } from './types';

function App() {
  const [screen, setScreen] = useState<'input' | 'list' | 'details'>('input');
  const [loading, setLoading] = useState(false);
  const [benefits, setBenefits] = useState<Benefit[]>([]);
  const [selectedBenefit, setSelectedBenefit] = useState<Benefit | null>(null);
  const [actionPlan, setActionPlan] = useState<string[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Handle input submit and fetch benefits
  const handleInputSubmit = async (text: string) => {
    setLoading(true);
    setError(null);
    try {
      const result = await getClassification(text);
      // Parse result to get benefits array
      // For demo, fallback to mock data if needed
      let benefitsData: Benefit[] = [];
      if (result && result.choices && result.choices[0]?.message?.content) {
        const content = result.choices[0].message.content;
        console.log("LLM raw content:", content);
        // Try to parse JSON from LLM response
        try {
          benefitsData = JSON.parse(content);
        } catch (err) {
          // Attempt to extract info from markdown/text
          console.log("under catch", err);
          // Extract title
          let titleMatch = content.match(/Plan Type: (.+)/);
          let coverageMatch = content.match(/Coverage Details: (.+)/);
          let descriptionMatch = content.match(/Health Benefit Card\*\*([\s\S]*?)### Action Plan:/);
          let actionPlanMatch = content.match(/### Action Plan:[\s\S]*?(1\..*?)(?:\n2\..*?)(?:\n3\..*?)/);

          let title = titleMatch ? titleMatch[1].trim() : 'General Health';
          let coverage = coverageMatch ? coverageMatch[1].trim() : '';
          let description = descriptionMatch ? descriptionMatch[1].replace(/\n|\*/g, '').trim() : '';

          benefitsData = [{
            id: '1',
            title,
            category: title,
            coverage,
            description: description || content
          }];
        }
      }
      console.log(benefitsData);
      setBenefits(benefitsData);
      setScreen('list');
    } catch (e) {
      setError('Could not classify your query.');
    } finally {
      setLoading(false);
    }
  };

  // Handle benefit selection and fetch action plan
  const handleSelectBenefit = async (benefit: Benefit) => {
    setSelectedBenefit(benefit);
    setLoading(true);
    setError(null);
    try {
      const result = await getActionPlan(benefit.title);
      let steps: string[] = [];
      if (result && result.choices && result.choices[0]?.message?.content) {
        // Parse steps from LLM response
        steps = result.choices[0].message.content.split('\n').filter(s => s.trim().startsWith('Step'));
      }
      setActionPlan(steps.length > 0 ? steps : ['Could not parse plan, please regenerate.']);
      setScreen('details');
    } catch (e) {
      setError('Could not generate action plan.');
    } finally {
      setLoading(false);
    }
  };

  // Regenerate action plan
  const handleRegeneratePlan = async () => {
    if (!selectedBenefit) return;
    await handleSelectBenefit(selectedBenefit);
  };

  // Navigation
  const handleBackToInput = () => {
    setScreen('input');
    setBenefits([]);
    setSelectedBenefit(null);
    setActionPlan(null);
    setError(null);
  };
  const handleBackToList = () => {
    setScreen('list');
    setActionPlan(null);
    setError(null);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 p-6">
      <div className="max-w-xl w-full">
        {error && (
          <div className="mb-6 p-4 bg-red-100 border-l-4 border-red-500 text-red-800 rounded shadow-md font-medium">
            🚨 <span className="font-semibold">Error:</span> {error}
          </div>
        )}
        {screen === 'input' && (
          <BenefitInput onSubmit={handleInputSubmit} isLoading={loading} />
        )}
        {screen === 'list' && !loading && (
          <BenefitList benefits={benefits} onSelect={handleSelectBenefit} onBack={handleBackToInput} />
        )}
        {screen === 'details' && selectedBenefit && !loading && (
          <BenefitDetails benefit={selectedBenefit} steps={actionPlan} onRegenerate={handleRegeneratePlan} onBack={handleBackToList} />
        )}
        {loading && (
          <div className="bg-white rounded-3xl shadow-xl p-8 sm:p-10 flex flex-col items-center justify-center min-h-[280px]">
            <div className="animate-spin h-10 w-10 border-4 border-teal-500 rounded-full border-t-transparent mb-4"></div>
            <p className="text-teal-600 font-bold text-xl mb-1">
              {screen === 'details' ? 'Generating Action Plan...' : 'Analyzing your concern...'}
            </p>
            <p className="text-sm text-gray-500">This takes just a moment using advanced AI.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;