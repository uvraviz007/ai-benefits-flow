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
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[400px] bg-gray-50 p-4">
      <div className="w-full max-w-xl bg-white rounded-xl shadow-md p-6">
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold mb-2">Benefit Inquiry Tool</h2>
          <p className="text-gray-600">Describe your health concern to instantly find relevant benefits.</p>
        </div>
        <textarea
          className="w-full p-3 border rounded mb-3 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={5}
          placeholder="e.g., I have tooth pain, what can I do?"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isLoading}
        />
        <div className="text-xs text-gray-400 mb-4">Tip: Press <b>Ctrl/Cmd + Enter</b> to submit quickly</div>
        <div className="flex gap-2 justify-end">
          <button
            className="px-4 py-2 border rounded text-gray-700 bg-gray-100 hover:bg-gray-200 transition"
            onClick={() => setText('')}
            disabled={isLoading || !text.trim()}
          >
            Clear
          </button>
          <button
            className={`px-4 py-2 rounded text-white bg-blue-600 hover:bg-blue-700 transition flex items-center gap-2 ${isLoading || !text.trim() ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={handleSubmit}
            disabled={isLoading || !text.trim()}
          >
            {isLoading && (
              <span className="inline-block animate-spin h-4 w-4 border-2 border-white rounded-full border-t-transparent"></span>
            )}
            {isLoading ? 'Searching...' : 'Find My Benefits'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BenefitInput;

