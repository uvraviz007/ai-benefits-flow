import React, { useState } from 'react';

interface Props {
  onSubmit: (text: string) => void;
  isLoading: boolean;
}

const BenefitInput: React.FC<Props> = ({ onSubmit, isLoading }) => {
  const [text, setText] = useState('');

  const handleSubmit = () => {
    // Only submit if text is not empty and not loading
    if (text.trim() && !isLoading) {
      onSubmit(text);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Submit on Ctrl/Cmd + Enter
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    // 🌸 Key Change 1: Softer background with a very subtle light blue/green gradient
    // This evokes a feeling of 'sky' or 'nature' for well-being.
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
      
      {/* 🌸 Key Change 2: Inner card container is white/light and softly rounded. 
          Added a more gentle shadow for a 'floating' feel. */}
      <div className="w-full max-w-xl bg-white rounded-3xl shadow-xl p-8 sm:p-10 transform transition duration-500 hover:shadow-2xl hover:shadow-green-200/50">
        
        {/* Header Section */}
        <div className="mb-8 text-center">
          {/* 🌸 Key Change 3: Used a calming, professional shade of green/teal for the main title */}
          <h2 className="text-3xl font-extrabold text-teal-600 mb-2 tracking-tight sm:text-4xl">
            Well-being Navigator 🌿
          </h2>
          <p className="text-gray-500 font-light text-lg">
            Tell us your concern to instantly find your coverage and next steps.
          </p>
        </div>
        
        {/* Text Input Area */}
        <textarea
          // 🌸 Key Change 4: Lighter, cleaner input style with a subtle focus ring.
          className="w-full p-5 border border-gray-200 rounded-xl mb-4 resize-none bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-teal-100 focus:border-teal-400 transition duration-300 shadow-sm text-base"
          rows={6}
          placeholder="e.g., I have tooth pain, what can I do? Or, I feel stressed and can't sleep."
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isLoading}
        />
        
        {/* Tip Text */}
        <div className="text-sm text-gray-400 mb-6 text-left">
          Tip: Press <b className="text-gray-600">Ctrl/Cmd + Enter</b> to submit your query.
        </div>
        
        {/* Action Buttons */}
        <div className="flex gap-4 justify-end">
          
          {/* Clear Button */}
          {/* 🌸 Key Change 5: Clean, secondary button style */}
          <button
            className="px-6 py-3 border border-gray-300 rounded-full text-gray-600 bg-white hover:bg-gray-100 transition duration-200 font-medium shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => setText('')}
            disabled={isLoading || !text.trim()}
          >
            Clear Input
          </button>
          
          {/* Submit Button */}
          <button
            // 🌸 Key Change 6: Vibrant, health-focused primary button with a deeper shadow effect
            className={`px-8 py-3 rounded-full text-white font-semibold transition duration-300 flex items-center justify-center gap-2 
              ${isLoading || !text.trim() 
                ? 'bg-teal-400 opacity-60 cursor-not-allowed' 
                : 'bg-teal-500 hover:bg-teal-600 shadow-lg shadow-teal-300/60 hover:shadow-teal-400/70'
              }`}
            onClick={handleSubmit}
            disabled={isLoading || !text.trim()}
          >
            {isLoading && (
              // 🌸 Key Change 7: Adjusted spinner color to match the new teal theme
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            )}
            {isLoading ? 'Analyzing Concern...' : 'Find My Benefits'}
          </button>
        </div>
        
      </div>
    </div>
  );
};

export default BenefitInput;