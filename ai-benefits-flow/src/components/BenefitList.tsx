import React from 'react';
import type { Benefit } from '../types';


interface Props {
  benefits: Benefit[];
  onSelect: (b: Benefit) => void;
}

const BenefitList: React.FC<Props> = ({ benefits, onSelect }) => {
  if (!benefits || benefits.length === 0) {
    return (
      <div className="p-6 text-center">
        <p className="text-gray-500">No matching benefits found.</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Recommended Benefits</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {benefits.slice(0, 4).map((b) => (
          <div key={b.id} className="bg-white rounded-xl shadow-md flex flex-col h-full">
            <div className="p-6 flex-1">
              <h3 className="text-lg font-semibold mb-2">{b.title}</h3>
              <p className="text-sm text-gray-600">{b.coverage}</p>
              <p className="mt-2 text-gray-700">{b.description}</p>
            </div>
            <div className="p-4 flex justify-end">
              <button
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
                onClick={() => onSelect(b)}
              >
                View Steps
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BenefitList;
