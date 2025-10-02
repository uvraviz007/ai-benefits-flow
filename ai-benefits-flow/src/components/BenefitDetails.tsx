import React, { useState } from 'react';
import type { Benefit } from '../types';

interface Props {
  benefit: Benefit;
  steps: string[] | null;
  onRegenerate: () => void;
}

const BenefitDetails: React.FC<Props> = ({ benefit, steps, onRegenerate }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-xl w-full bg-white rounded-xl shadow-lg p-6">
        <div className="flex justify-between items-center mb-2">
          <button
            className="text-sm text-blue-600 hover:underline"
            onClick={() => window.location.reload()}
          >
            Start Over
          </button>
          <button
            className="text-sm text-gray-500 border px-2 py-1 rounded hover:bg-gray-100"
            onClick={onRegenerate}
          >
            Regenerate Plan
          </button>
        </div>
        <h2 className="text-2xl font-bold mb-1">{benefit.title}</h2>
        <div className="text-gray-500 text-sm mb-2">Category: {benefit.category}</div>
        <div className="mb-2 text-gray-700">{benefit.description}</div>
        <div className="text-gray-400 text-xs mb-4">Coverage: {benefit.coverage}</div>

        <div className="mt-4">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-lg">Step-by-step plan</span>
            {steps && (
              <button
                className="ml-2 px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700 transition"
                onClick={() => setExpanded((prev) => !prev)}
              >
                {expanded ? 'Hide Steps' : 'View Steps'}
              </button>
            )}
          </div>
          {!steps && (
            <div className="flex items-center gap-2 mt-4">
              <span className="inline-block animate-spin h-5 w-5 border-2 border-blue-500 rounded-full border-t-transparent"></span>
              <span className="text-gray-500 text-sm">Generating plan...</span>
            </div>
          )}
          {steps && expanded && (
            <ol className="mt-4 space-y-3 list-decimal list-inside">
              {steps.map((step, idx) => (
                <li key={idx} className="bg-gray-100 rounded p-3 text-gray-800">
                  <span className="font-semibold">Step {idx + 1}:</span> {step}
                </li>
              ))}
            </ol>
          )}
        </div>
      </div>
    </div>
  );
};

export default BenefitDetails;
