import React from 'react';
import type { Benefit } from '../types';


interface Props {
  benefits: Benefit[];
  onSelect: (b: Benefit) => void;
 
  onBack: () => void; 
}

const BenefitList: React.FC<Props> = ({ benefits, onSelect, onBack }) => {
  

  if (!benefits || benefits.length === 0) {
    
    return (
      <div className="w-full bg-white rounded-3xl shadow-xl p-8 text-center">
        <h2 className="text-xl font-bold text-teal-600 mb-2">No Benefits Found</h2>
        <p className="text-gray-500">
          We couldn't match your concern to an active benefit. Please refine your query and try again.
        </p>
        <button
          className="mt-4 text-sm text-teal-600 hover:text-teal-800 transition font-medium"
          onClick={onBack}
        >
          ← Go Back to Input
        </button>
      </div>
    );
  }

  return (
    //  Key Change 1: Main Card Styling - White, highly rounded, large shadow with teal hue
    <div className="w-full bg-white rounded-3xl shadow-xl p-6 sm:p-8">

      {/* --- Header and Back Button --- */}
      <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
        
        {/* Back Button */}
        <button
          className="text-gray-500 hover:text-teal-600 transition duration-200 flex items-center gap-1 font-medium text-sm"
          onClick={onBack}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          New Query
        </button>
        <h2 className="text-3xl font-extrabold text-teal-700 tracking-tight">
          Recommended Benefits
        </h2>
      </div>

      {/* --- Benefits Grid --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {benefits.slice(0, 4).map((b) => (
          <div 
            key={b.id} 
            //  Key Change 2: Individual Card Styling - Lighter shadow, teal side shadow on hover
            className="bg-gray-50 rounded-xl shadow-md flex flex-col h-full border border-gray-100 transition duration-300 hover:shadow-2xl hover:shadow-teal-200/50 hover:border-teal-300"
          >
            <div className="p-5 flex-1">
              {/*  Key Change 3: Title color consistent with theme */}
              <h3 className="text-xl font-bold text-teal-600 mb-2">{b.title}</h3>
              {/* Coverage highlighted with a badge */}
              <span className="inline-block px-3 py-1 text-xs font-semibold text-white bg-green-500 rounded-full mb-3 shadow-sm">
                {b.coverage}
              </span>
              <p className="mt-2 text-gray-700 leading-relaxed text-sm">
                {b.description}
              </p>
            </div>

            <div className="p-4 flex justify-end border-t border-gray-100">
              <button
                //  Key Change 4: Primary Button Style - Full teal, rounded-full
                className="px-6 py-2 bg-teal-500 text-white rounded-full font-semibold shadow-md shadow-teal-300/50 hover:bg-teal-600 transition duration-200"
                onClick={() => onSelect(b)}
              >
                View Action Plan
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BenefitList;