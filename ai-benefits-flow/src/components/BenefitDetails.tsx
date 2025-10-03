import React, { useState } from 'react';
import type { Benefit } from '../types';

interface Props {
  benefit: Benefit;
  steps: string[] | null;
  onRegenerate: () => void;
  // NOTE: Added onBack prop from App.tsx, which is essential for navigation
  onBack: () => void; 
}

const BenefitDetails: React.FC<Props> = ({ benefit, steps, onRegenerate, onBack }) => {
  const [expanded, setExpanded] = useState(true); // Default to expanded for immediate plan visibility

  return (
    // Outer container for centering (Matches App.tsx bg-gray-50)
    // NOTE: Removed min-h-screen/flex/justify-center as the parent App component handles this
    <div className="w-full"> 
      
      {/*  Key Change 1: Main Card Styling - White, highly rounded, large shadow with teal hue */}
      <div className="w-full bg-white rounded-3xl shadow-xl p-6 sm:p-8 transform transition duration-500 hover:shadow-2xl hover:shadow-teal-200/50">
        
        {/* --- Top Navigation/Action Bar --- */}
        <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
          
          {/* Back Button (Replaces Start Over for better user flow) */}
          <button
            className="text-gray-500 hover:text-teal-600 transition duration-200 flex items-center gap-1 font-medium text-sm"
            onClick={onBack}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Options
          </button>

          {/* Regenerate Plan Button */}
          <button
            //  Key Change 2: Clean, secondary button style
            className="px-4 py-2 border border-teal-300 rounded-full text-teal-600 bg-teal-50 hover:bg-teal-100 transition duration-200 font-medium text-sm shadow-sm"
            onClick={onRegenerate}
          >
            Regenerate Plan
          </button>
        </div>
        
        {/* --- Benefit Information --- */}
        <div className="mb-6">
          {/*  Key Change 3: Main Title with Teal Accent */}
          <h2 className="text-3xl font-extrabold text-teal-700 mb-1 tracking-tight">
            {benefit.title}
          </h2>
          {/*  Key Change 4: Coverage Highlight */}
          <p className="inline-block px-3 py-1 mb-3 text-sm font-semibold text-white bg-green-500 rounded-full shadow-md">
            Coverage: {benefit.coverage}
          </p>
          <p className="text-gray-600 leading-relaxed border-l-4 border-teal-200 pl-3 italic">
            {benefit.description}
          </p>
        </div>

        {/* --- Action Plan Section --- */}
        <div className="mt-8 pt-6 border-t border-gray-100">
          <div className="flex items-center justify-between mb-4">
            {/*  Key Change 5: Section Header */}
            <h3 className="font-extrabold text-xl text-gray-800 flex items-center gap-2">
              <span className="text-teal-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </span>
              Your Personalized Action Plan
            </h3>
            
            {/* Collapse/Expand Button */}
            {steps && (
              <button
                // Key Change 6: Clean, tertiary button style for a less critical action
                className="px-3 py-1 text-sm text-teal-600 hover:text-teal-800 transition font-medium"
                onClick={() => setExpanded((prev) => !prev)}
              >
                {expanded ? 'Collapse' : 'Expand'}
              </button>
            )}
          </div>
          
          {/* Loading State */}
          {!steps && (
            <div className="flex items-center gap-3 mt-4 p-4 bg-teal-50 rounded-lg">
              <span className="inline-block animate-spin h-5 w-5 border-2 border-teal-500 rounded-full border-t-transparent"></span>
              <span className="text-teal-600 font-medium">Generating your step-by-step guidance...</span>
            </div>
          )}
          
          {/* Steps List */}
          {steps && expanded && (
            <ol className="mt-4 space-y-4">
              {steps.map((step, idx) => (
                <li 
                  key={idx} 
                  //  Key Change 7: Step list item style - Soft background, rounded, with a subtle left border highlight
                  className="bg-gray-50 border-l-4 border-teal-400 rounded-lg p-4 text-gray-700 shadow-sm transition duration-300 hover:bg-gray-100"
                >
                  <span className="font-bold text-teal-600 text-lg mr-2">Step {idx + 1}</span>
                  <p className='inline text-base'>{step.replace(`Step ${idx + 1}:`, '').trim()}</p>
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