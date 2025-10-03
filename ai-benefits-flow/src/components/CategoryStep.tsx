import React from 'react';

type CategoryStepProps = {
  category: string | null;
  onNext: () => void;
  onBack: () => void;
};

const allowedCategories = ['Dental', 'OPD', 'Vision', 'Mental Health'];

const CategoryStep: React.FC<CategoryStepProps> = ({ category, onNext, onBack }) => {
  const isAllowed = category && allowedCategories.includes(category);

  return (
    <div className="bg-white rounded-xl shadow-md p-6 text-center">
      <h2 className="text-2xl font-bold mb-4"> Classified Category</h2>
      {category ? (
        <>
          <p className="text-lg mb-4">
            Category detected by AI: <span className="font-semibold">{category}</span>
          </p>
          {isAllowed ? (
            <button
              className="px-6 py-3 bg-teal-500 text-white font-bold rounded-lg hover:bg-teal-600 transition"
              onClick={onNext}
            >
              Next
            </button>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <p className="text-red-500 font-medium mb-2">
                This category is not eligible to move forward.
              </p>
              <button
                className="flex items-center gap-2 px-6 py-3 bg-teal-500 text-white font-bold rounded-lg hover:bg-teal-600 transition"
                onClick={onBack}
              >
                <span className="inline-block rotate-180">→</span> Write New Query
              </button>
            </div>
          )}
        </>
      ) : (
        <p className="text-gray-500">Waiting for AI classification...</p>
      )}
    </div>
  );
};

export default CategoryStep;
