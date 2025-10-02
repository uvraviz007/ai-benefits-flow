import React, { useState } from 'react';
import BenefitInput from './components/BenefitInput';
import BenefitList from './components/BenefitList';
import BenefitDetails from './components/BenefitDetails';
import type { Benefit } from './types';
import { mockBenefits } from './data/mockBenefits';
import { getClassification, getActionPlan } from './services/aiServices';

function App() {
  const [screen, setScreen] = useState<1 | 2 | 3 | 4>(1);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [benefits, setBenefits] = useState<Benefit[]>([]);
  const [selectedBenefit, setSelectedBenefit] = useState<Benefit | null>(null);
  const [actionPlan, setActionPlan] = useState<string[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Screen 1: Submit query
  const handleQuerySubmit = async (text: string) => {
    setQuery(text);
    setLoading(true);
    setError(null);
    setScreen(2);
    try {
      const classification = await getClassification(text);
      console.log('✅ Classification Result:', classification);
      // Example: parse benefits from response or use mock data
      // You may need to adjust this based on your API response structure
      const benefits = [
        { title: 'Dental Checkup', coverage: 'Covered 80%', description: 'Annual free dental cleaning & cavity check.' },
        { title: 'Emergency Visit', coverage: 'Covered 100%', description: 'Covers urgent care dental visits.' },
        { title: 'Root Canal', coverage: 'Covered 50%', description: 'Subsidized root canal treatments.' }
      ];
      setBenefits(benefits);
      setScreen(3);
    } catch (e) {
      setError('Could not classify your query. Please try again.');
      setScreen(1);
    } finally {
      setLoading(false);
    }
  };

  // Screen 3: Select a benefit
  const handleSelectBenefit = async (benefit: Benefit) => {
    setSelectedBenefit(benefit);
    setLoading(true);
    setError(null);
    setScreen(4);
    try {
      const planResponse = await getActionPlan(benefit.title);
      console.log('📋 Action Plan:', planResponse);
      // Example: parse steps from response or use mock steps
      // You may need to adjust this based on your API response structure
      const steps = [
        'Step 1: Book an appointment with an in-network dentist.',
        'Step 2: Show your employee insurance ID at the clinic.',
        'Step 3: Submit receipts to HR portal for reimbursement.'
      ];
      setActionPlan(steps);
    } catch (e) {
      setError('Could not generate action plan. Please try again.');
      setActionPlan(null);
    } finally {
      setLoading(false);
    }
  };

  // Regenerate plan
  const handleRegeneratePlan = async () => {
    if (!selectedBenefit) return;
    setLoading(true);
    setError(null);
    setActionPlan(null);
    try {
      const planResponse = await getActionPlan(selectedBenefit.title);
      console.log('📋 Action Plan:', planResponse);
      // Example: parse steps from response or use mock steps
      // You may need to adjust this based on your API response structure
      const steps = [
        'Step 1: Book an appointment with an in-network dentist.',
        'Step 2: Show your employee insurance ID at the clinic.',
        'Step 3: Submit receipts to HR portal for reimbursement.'
      ];
      setActionPlan(steps);
    } catch (e) {
      setError('Could not regenerate action plan. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Render screens
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="max-w-xl w-full bg-white shadow-md rounded-xl p-6">
        {error && <div className="mb-4 text-red-600 text-center">{error}</div>}
        {screen === 1 && (
          <BenefitInput onSubmit={handleQuerySubmit} isLoading={loading} />
        )}
        {screen === 2 && (
          <div className="flex flex-col items-center justify-center min-h-[200px]">
            {loading ? (
              <>
                <p className="text-gray-700 font-medium mb-4">Classifying your need...</p>
                <div className="animate-spin h-8 w-8 border-4 border-blue-500 rounded-full border-t-transparent"></div>
              </>
            ) : (
              <p className="text-gray-700">Almost there...</p>
            )}
          </div>
        )}
        {screen === 3 && (
          <BenefitList benefits={benefits} onSelect={handleSelectBenefit} />
        )}
        {screen === 4 && selectedBenefit && (
          <BenefitDetails benefit={selectedBenefit} steps={actionPlan} onRegenerate={handleRegeneratePlan} />
        )}
      </div>
    </div>
  );
}
export default App;