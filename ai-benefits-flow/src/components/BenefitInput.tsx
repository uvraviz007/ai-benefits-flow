import React, { useState } from 'react';

interface Props {
  onSubmit: (text: string) => void;
  isLoading: boolean;
}

const BenefitInput: React.FC<Props> = ({ onSubmit, isLoading }) => {
  const [text, setText] = useState('');

  const handleSubmit = () => {
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
    // 🎨 Key Change 1: Set background to black (bg-black) and ensure it covers the screen (min-h-screen)
    // 🎨 Key Change 2: Use flex utilities to center content (items-center justify-center)
    <div className="flex items-center justify-center min-h-screen bg-black p-4">
      
      {/* Inner card container: Retained the dark theme styling */}
      <div className="w-full max-w-2xl bg-gray-800 rounded-xl shadow-2xl p-8 transform transition duration-500 hover:shadow-blue-900/50">
        
        {/* Header Section */}
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-extrabold text-white mb-2 tracking-wide">
            Health Benefit Assistant 🤖
          </h2>
          <p className="text-gray-400 font-light">
            Tell us about your concern to instantly find coverage and next steps.
          </p>
        </div>
        
        {/* Text Input Area */}
        <textarea
          className="w-full p-4 border border-gray-600 rounded-lg mb-3 resize-none bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 shadow-inner"
          rows={6}
          placeholder="e.g., I have tooth pain, what can I do? Or, I feel stressed and can't sleep."
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isLoading}
        />
        
        {/* Tip Text */}
        <div className="text-sm text-gray-500 mb-6 text-left">
          Tip: Press <b className="text-gray-300">Ctrl/Cmd + Enter</b> to submit your query.
        </div>
        
        {/* Action Buttons */}
        <div className="flex gap-4 justify-end">
          
          {/* Clear Button */}
          <button
            className="px-6 py-3 border border-gray-600 rounded-lg text-gray-300 bg-gray-700 hover:bg-gray-600 transition duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => setText('')}
            disabled={isLoading || !text.trim()}
          >
            Clear Input
          </button>
          
          {/* Submit Button */}
          <button
            className={`px-6 py-3 rounded-lg text-white font-semibold transition duration-200 flex items-center justify-center gap-2 
              ${isLoading || !text.trim() 
                ? 'bg-blue-800 opacity-60 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-500/50'
              }`}
            onClick={handleSubmit}
            disabled={isLoading || !text.trim()}
          >
            {isLoading && (
              <span className="inline-block animate-spin h-5 w-5 border-3 border-t-4 border-white border-solid rounded-full border-r-transparent"></span>
            )}
            {isLoading ? 'Analyzing Concern...' : 'Find My Benefits'}
          </button>
        </div>
        
      </div>
    </div>
  );
};

export default BenefitInput;