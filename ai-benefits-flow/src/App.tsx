import React, { useState } from "react";
import BenefitInput from "./components/BenefitInput";
import BenefitList from "./components/BenefitList";
import BenefitDetails from "./components/BenefitDetails";
import { mockBenefits } from "./data/mockBenefits";
import { mockActionPlans } from "./data/mockActionPlans";

export default function App() {
  const [screen, setScreen] = useState<1 | 2 | 3 | 4>(1);

  const [query, setQuery] = useState("");
  const [benefits, setBenefits] = useState<string[]>([]);
  const [selectedBenefit, setSelectedBenefit] = useState<string | null>(null);
  const [actionPlan, setActionPlan] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  // Screen 1 → Employee enters query
  const handleQuerySubmit = (q: string) => {
    setQuery(q);
    setLoading(true);
    setScreen(2);

    // Simulated AI call with delay
    setTimeout(() => {
      const result = mockBenefits[q] || ["General Health Support"];
      setBenefits(result);
      setLoading(false);
      setScreen(3);
    }, 1200);
  };

  // Screen 3 → Selecting a benefit
  const handleSelectBenefit = (benefit: string) => {
    setSelectedBenefit(benefit);

    const plan =
      mockActionPlans.find(
        (item) =>
          item.userInput.toLowerCase() === query.toLowerCase() &&
          item.selectedBenefit === benefit
      )?.steps || [
        "Step 1: Contact HR",
        "Step 2: Submit claim form",
        "Step 3: Avail benefit",
      ];

    setActionPlan(plan);
    setScreen(4);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="max-w-xl w-full bg-white shadow-md rounded-xl p-6">
        {screen === 1 && <BenefitInput onSubmit={handleQuerySubmit} />}

        {screen === 2 && (
          <div className="text-center">
            {loading ? (
              <>
                <p className="text-gray-700 font-medium">
                  Classifying your need...
                </p>
                <div className="animate-spin h-8 w-8 border-4 border-blue-500 rounded-full border-t-transparent mx-auto mt-4"></div>
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
          <BenefitDetails benefit={selectedBenefit} steps={actionPlan} />
        )}
      </div>
    </div>
  );
}
