import React from 'react';
import type { Benefit } from '../types';


interface Props {
benefit: Benefit;
steps: string[] | null;
onRegenerate: () => void;
}


export default function BenefitDetails({ benefit, steps, onRegenerate }: Props) {
return (
<div className="p-6 max-w-2xl mx-auto">
<button onClick={() => window.location.reload()} className="text-sm underline mb-4">Start over</button>
<h2 className="text-2xl font-bold">{benefit.title}</h2>
<p className="text-sm text-gray-600">Category: {benefit.category}</p>
<p className="mt-2">{benefit.description}</p>
<p className="mt-1 text-sm">Coverage: {benefit.coverage}</p>


<div className="mt-6">
<h3 className="font-semibold">Step-by-step plan</h3>
{!steps && <p className="mt-2">Generating plan... (shows loading animation)</p>}
{steps && (
<ol className="mt-2 list-decimal list-inside">
{steps.map((s, i) => (
<li key={i} className="mt-2">{s}</li>
))}
</ol>
)}


<div className="mt-4 flex gap-2">
<button className="px-3 py-1 border rounded" onClick={onRegenerate}>Regenerate plan</button>
</div>
</div>
</div>
);
}