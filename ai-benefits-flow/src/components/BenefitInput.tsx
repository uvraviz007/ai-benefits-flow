import React, { useState } from 'react';


interface Props {
onSubmit: (text: string) => void;
isLoading: boolean;
}


export default function BenefitInput({ onSubmit, isLoading }: Props) {
const [text, setText] = useState('');


return (
<div className="p-6 max-w-2xl mx-auto">
<h1 className="text-2xl font-bold mb-4">What's your health need?</h1>
<textarea
placeholder={`I have tooth pain, what can I do?`}
value={text}
onChange={(e) => setText(e.target.value)}
rows={4}
className="w-full p-3 border rounded mb-3"
/>
<div className="flex gap-2">
<button
className="px-4 py-2 bg-blue-600 text-white rounded"
onClick={() => onSubmit(text)}
disabled={isLoading || !text.trim()}
>
{isLoading ? 'Classifying...' : 'Find benefits'}
</button>
<button
className="px-4 py-2 border rounded"
onClick={() => setText('')}
>
Clear
</button>
</div>
</div>
);
}