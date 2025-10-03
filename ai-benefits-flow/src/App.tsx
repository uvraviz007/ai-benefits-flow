import React, { useState } from 'react';
import BenefitInput from './components/BenefitInput';
import BenefitList from './components/BenefitList';
import BenefitDetails from './components/BenefitDetails';
import type { Benefit } from './types';
// import { mockBenefits } from './data/mockBenefits'; // Not currently used, good for mock data later
import { getClassification, getActionPlan } from './services/aiServices';

// Determine the current AI task based on the current screen
const getLoadingMessage = (currentScreen: 1 | 2 | 3 | 4) => {
    // If the screen is 2, we are either classifying (coming from 1) or generating a plan (coming from 3)
    if (currentScreen === 2) {
        return 'Analyzing your request...';
    }
    // This fallback covers cases where loading is true but screen hasn't changed yet (e.g., initial button press)
    return 'Processing...'; 
}

function App() {
    const [screen, setScreen] = useState<1 | 2 | 3 | 4>(1);
    const [loading, setLoading] = useState(false);
    const [query, setQuery] = useState('');
    const [benefits, setBenefits] = useState<Benefit[]>([]);
    const [selectedBenefit, setSelectedBenefit] = useState<Benefit | null>(null);
    const [actionPlan, setActionPlan] = useState<string[] | null>(null);
    const [error, setError] = useState<string | null>(null);

    // --- Utility for API Calls ---
    const handleApiCall = async (
        apiFunc: (...args: any[]) => Promise<any>, 
        successHandler: (res: any) => void, 
        errorHandler: string, 
        ...args: any[]
    ) => {
        setLoading(true);
        setError(null);
        try {
            const result = await apiFunc(...args);
            successHandler(result);
        } catch (e) {
            console.error('API Error:', e);
            setError(errorHandler);
            if (errorHandler.includes('classify')) setScreen(1); // Revert on fatal error
        } finally {
            setLoading(false);
        }
    };

    // Screen 1: Submit query
    const handleQuerySubmit = (text: string) => {
        setQuery(text);
        setScreen(2); // Go to loading screen (Classification)

        const successHandler = (classification: string) => {
            console.log('✅ Classification Result:', classification);
            
            // Mock benefits data
            const mockBenefitsData = [
                { title: 'Routine Dental Checkup', coverage: 'Covered 80%', description: 'Includes annual free dental cleaning & cavity check.' },
                { title: 'Mental Health Counseling', coverage: 'Covered 100%', description: 'Free sessions with in-network mental health professionals.' },
                { title: 'Advanced Vision Lenses', coverage: 'Covered 70%', description: 'Subsidized cost for specialty progressive or bifocal lenses.' }
            ];
            setBenefits(mockBenefitsData);
            setScreen(3);
        };

        handleApiCall(
            getClassification, 
            successHandler, 
            'Could not classify your query. Please try again or check API key/billing.', 
            text
        );
    };

    // Screen 3: Select a benefit
    const handleSelectBenefit = (benefit: Benefit) => {
        setSelectedBenefit(benefit);
        setScreen(2); // Go to loading screen (Action Plan Generation)

        const successHandler = (planResponse: string) => {
            console.log('📋 Action Plan:', planResponse);
            
            // Basic parsing assuming "Step 1:...", "Step 2:..." structure from AI
            const steps = planResponse.split('\n').filter(s => s.trim().startsWith('Step')).map(s => s.trim());
            setActionPlan(steps.length > 0 ? steps : ['Could not parse plan, please regenerate.']);
            setScreen(4);
        };

        handleApiCall(
            getActionPlan, 
            successHandler, 
            'Could not generate action plan. Please try again.', 
            benefit.title, benefit.description
        );
    };

    // Regenerate plan
    const handleRegeneratePlan = () => {
        if (!selectedBenefit) return;
        handleSelectBenefit(selectedBenefit); // Re-run the generation logic
    };

    // --- Render Screens ---
    return (
        // Full screen height, centered, pure black background (Tailwind is used here)
        <div className="min-h-screen w-full flex items-center justify-center bg-black p-6">
            
            {/* Main content card container: Dark theme for contrast */}
            <div className="max-w-xl w-full bg-gray-800 shadow-2xl rounded-xl p-8 border border-gray-700">
                
                {/* Error Display */}
                {error && (
                    <div className="mb-4 p-3 bg-red-900 border border-red-700 text-red-300 rounded text-center font-medium">
                        🚨 {error}
                    </div>
                )}
                
                {/* Screen 1: Input */}
                {screen === 1 && (
                    <BenefitInput onSubmit={handleQuerySubmit} isLoading={loading} /> 
                )}
                
                {/* Screen 2: Loading/Classification & Generation Indicator */}
                {/* Use 'loading' state directly for the spinner display */}
                {loading && (
                    <div className="flex flex-col items-center justify-center min-h-[200px] text-white">
                        <div className="animate-spin h-10 w-10 border-4 border-blue-500 rounded-full border-t-transparent mb-4"></div>
                        <p className="text-gray-300 font-semibold text-lg">
                            {/* Improved message based on the *intent* of the current state */}
                            {selectedBenefit ? 'Generating Action Plan...' : 'Analyzing your request...'}
                        </p>
                        <p className="text-sm text-gray-500 mt-1">This takes just a moment using AI.</p>
                    </div>
                )}
                
                {/* Screen 3: Benefit List (Only show if not loading) */}
                {screen === 3 && !loading && (
                    <BenefitList 
                        benefits={benefits} 
                        onSelect={handleSelectBenefit}
                        onBack={() => setScreen(1)} 
                    />
                )}
                
                {/* Screen 4: Benefit Details (Only show if not loading) */}
                {screen === 4 && selectedBenefit && !loading && (
                    <BenefitDetails 
                        benefit={selectedBenefit} 
                        steps={actionPlan} 
                        onRegenerate={handleRegeneratePlan}
                        onBack={() => setScreen(3)} 
                    />
                )}
                
            </div>
        </div>
    );
}

export default App;