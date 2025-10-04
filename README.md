# AI-Powered Benefits Recommendation App

## Overview
This app uses AI to classify user health queries into allowed categories (Dental, Mental Health, Vision, OPD) and generates mock benefit cards and action plans. It features a modern React/TypeScript frontend with Tailwind CSS, OpenRouter API integration, and robust navigation and state management.

---

## Prompts Used & Refinements
- **Classification Prompt:**
  > "You are a helpful assistant for a healthcare benefits app. Classify the user's health issue into one category: Dental, Mental Health, Vision, OPD only else nothing. Then create 2 to 4 mock benefit cards with fields: title, coverage, description. Finally, provide a 3-step action plan for each benefit. Return the result strictly in this JSON format: { category, benefits, actionPlan }"
- **Action Plan Prompt:**
  > "You are an assistant that creates clear 3-step action plans for availing health benefits. Return the result as JSON array of strings: [Step 1, Step 2, Step 3]"
- **Refinements:**
  - Enforced strict JSON output for easier parsing.
  - Limited categories to allowed set using `categoryGuard`.
  - Added UI feedback for disallowed categories and navigation to re-query.

---

## Architecture & State Management
- **Frontend:** React (TypeScript)
- **Styling:** Tailwind CSS
- **API Integration:** OpenRouter API via `aiServices.ts`, API key managed with Vite `.env`.
- **State Management:**
  - Main state (user input, category, benefits, dark mode) managed in `App.tsx` using React hooks (`useState`).
  - Navigation between steps handled by conditional rendering and state transitions.
  - Category validation via `utils/categoryGuard.ts`.
- **Component Structure:**
  - `BenefitInput`: User query input
  - `CategoryStep`: Shows AI-chosen category, navigation, and re-query option
  - `BenefitList`: Renders benefit cards
  - `BenefitDetails`: Shows action plan for selected benefit

---

## Screenshots

| Query Input Screen | Category Step | Benefit Cards | Steps Card |
|-------------------|--------------|--------------|------------------|
| ![Query Input](images/screen1.png) | ![Category Step](images/screen2.png) | ![Benefit Cards](images/screen3.png) | ![Steps Card](images/screen4.png) |

---

## Known Issues & Potential Improvements
- **Known Issues:**
  - Occasional API response formatting errors (non-JSON output).
  - No persistent storage; all state is in-memory.
  - Limited error handling for network/API failures.
- **Potential Improvements:**
  - Add persistent storage (localStorage or backend).
  - Improve error handling and user feedback.
  - Add more allowed categories and refine prompts.
  - Enhance mobile responsiveness and accessibility.
  - Add unit and integration tests.
  - Support for multiple languages.

---

## Getting Started
1. Clone the repo and install dependencies:
   ```sh
   git clone https://github.com/uvraviz007/AI-Generated-Wellness-Recommendation-Board.git
   cd ai-benefits-flow
   npm install
   ```
2. Add your OpenRouter API key to `.env`:
   ```env
   VITE_OPENROUTER_API_KEY=your_api_key_here
   ```
3. Start the development server:
   ```sh
   npm run dev
   ```

---

Deployed on Netlify: https://ai-w.netlify.app/

