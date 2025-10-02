import { useState } from 'react';
import BenefitInput from './components/BenefitInput';
import BenefitList from './components/BenefitList';
import BenefitDetails from './components/BenefitDetails';
import type { Benefit } from './types';
import { mockBenefits } from './data/mockBenefits'; // assume mockBenefits has Benefit[]
import { mockActionPlans } from './data/mockActionPlans'; // assume mockBenefits has Benefit[]

function App() {
  const [screen, setScreen] = useState<1 | 2 | 3>(1);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [benefits, setBenefits] = useState<Benefit[]>([]);
  const [selectedBenefit, setSelectedBenefit] = useState<Benefit | null>(null);
  const [actionPlan, setActionPlan] = useState<string[] | null>(null);

  // Screen 1: Submit query
  const handleQuerySubmit = (text: string) => {
    setQuery(text);
    setLoading(true);
    setScreen(2);

    // Mock AI classification + benefit fetching
    setTimeout(() => {
      // Filter mockBenefits by query match in title/description
      const matchedBenefits = mockBenefits.filter(
        (b) =>
          b.title.toLowerCase().includes(text.toLowerCase()) ||
          b.description.toLowerCase().includes(text.toLowerCase())
      );
      setBenefits(
        matchedBenefits.length > 0
          ? matchedBenefits
          : [
              {
                id: 'general-1',
                title: 'General Health Support',
                category: 'Other',
                description: 'Standard coverage for health needs.',
                coverage: 'Up to $500/year',
              },
            ]
      );
      setLoading(false);
    }, 1200);
  };

  // Screen 2: Select a benefit
  const handleSelectBenefit = (benefit: Benefit) => {
    setSelectedBenefit(benefit);
    setLoading(true);

    // Mock AI action plan
    setTimeout(() => {
      const plan =
        mockActionPlans.find(
          (item) => item.userInput === query && item.selectedBenefit === benefit.title
        )?.steps || ['Step 1: Contact HR', 'Step 2: Submit claim', 'Step 3: Avail benefit'];

      setActionPlan(plan);
      setLoading(false);
      setScreen(3);
    }, 1200);
  };

  // Regenerate plan
  const handleRegeneratePlan = () => {
    if (!selectedBenefit) return;
    setLoading(true);
    setActionPlan(null);

    setTimeout(() => {
      // Just mock a slightly different plan for demo
      setActionPlan([
        'Step 1: Verify eligibility',
        'Step 2: Fill claim form',
        'Step 3: Submit to HR',
      ]);
      setLoading(false);
    }, 1000);
  };

  // Render screens
  return (
    <>
      {screen === 1 && <BenefitInput onSubmit={handleQuerySubmit} isLoading={loading} />}
      {screen === 2 && (
        <BenefitList
          benefits={benefits}
          onSelect={handleSelectBenefit}
        />
      )}
      {screen === 3 && selectedBenefit && (
        <BenefitDetails
          benefit={selectedBenefit}
          steps={actionPlan}
          onRegenerate={handleRegeneratePlan}
        />
      )}
    </>
  );
}

export default App;
