import { useState } from 'react';
import BenefitInput from './components/BenefitInput';
import BenefitList from './components/BenefitList';
import BenefitDetails from './components/BenefitDetails';
import { getClassification, getActionPlan } from './services/aiServices';
import type { Benefit } from './types';
import CategoryStep from './components/CategoryStep';

function App() {
  const [screen, setScreen] = useState<'input' | 'category' | 'list' | 'details'>('input');
  const [loading, setLoading] = useState(false);
  const [benefits, setBenefits] = useState<Benefit[]>([]);
  const [selectedBenefit, setSelectedBenefit] = useState<Benefit | null>(null);
  const [actionPlan, setActionPlan] = useState<string[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [aiCategory, setAiCategory] = useState<string | null>(null);

  // Handle input submit and fetch AI classification
  const handleInputSubmit = async (text: string) => {
    setLoading(true);
    setError(null);
    try {
      const result = await getClassification(text);
      if (!result || !result.benefits) {
        throw new Error('Invalid response from AI.');
      }

      setAiCategory(result.category);

      setBenefits(result.benefits.map((b: any, idx: number) => ({
        id: `${idx + 1}`,
        title: b.title,
        category: result.category,
        coverage: b.coverage,
        description: b.description,
      })));

      // Move to category check screen first
      setScreen('category');
    } catch (err) {
      console.error(err);
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
      if (!result || !Array.isArray(result)) {
        throw new Error('Invalid action plan response.');
      }
      setActionPlan(result);
      setScreen('details');
    } catch (err) {
      console.error(err);
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
    setAiCategory(null);
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
            <span className="font-semibold">Error:</span> {error}
          </div>
        )}

        {screen === 'input' && (
          <BenefitInput onSubmit={handleInputSubmit} isLoading={loading} />
        )}

        {screen === 'category' && !loading && (
          <CategoryStep
            category={aiCategory}
            onNext={() => setScreen('list')}
            onBack={handleBackToInput}
          />
        )}

        {screen === 'list' && !loading && (
          <BenefitList
            benefits={benefits}
            onSelect={handleSelectBenefit}
            onBack={handleBackToInput}
          />
        )}

        {screen === 'details' && selectedBenefit && !loading && (
          <BenefitDetails
            benefit={selectedBenefit}
            steps={actionPlan}
            onRegenerate={handleRegeneratePlan}
            onBack={handleBackToList}
          />
        )}

        {loading && (
          <div className="bg-white rounded-3xl shadow-xl p-8 sm:p-10 flex flex-col items-center justify-center min-h-[280px]">
            <div className="animate-spin h-10 w-10 border-4 border-teal-500 rounded-full border-t-transparent mb-4"></div>
            <p className="text-teal-600 font-bold text-xl mb-1">
              {screen === 'details' ? 'Generating Action Plan...' : 'Analyzing your concern...'}
            </p>
            <p className="text-sm text-gray-500">
              This takes just a moment using advanced AI.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
