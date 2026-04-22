# SoulSoup - Smart TCM Wellness Platform

TCM ClinicLink is a B2B2C digital health platform that integrates Traditional Chinese Medicine (TCM) clinic management with personalized wellness services, connecting professional TCM care with daily preventive healthcare.

## Features

### Customer Side (C-side)

- **Constitution Assessment**: An 8-question, questionnaire-based constitution test using the TCM nine-constitution classification standard
- **Constitution Analysis Report**: Radar chart visualization of constitution distribution with personalized trait interpretation
- **Smart Herbal Soup Recommendation**: Recommends suitable medicinal dietary soup packs based on constitution results
- **Online Shopping Cart**: Supports adding/removing items, quantity adjustment, and price calculation
- **Order Confirmation**: Fill in delivery information and choose a delivery method (standard delivery/express delivery/store pickup)
- **Order Completion**: Displays order number and pickup QR Code

### Doctor Side (B-side)

- **Doctor Login**: Secure authentication system (Demo password: 123456)
- **Patient Management**: Patient list browsing, search functionality, and basic information viewing
- **Medical Record Logging**: Add and edit medical records, including symptoms, diagnosis, and prescriptions
- **OCR Recognition**: Simulated handwritten medical record scanning and text recognition
- **Timeline History**: Displays patients' past visit records in a timeline format

## Tech Stack

- **Frontend Framework**: React 18 + TypeScript
- **Build Tool**: Vite 5
- **Routing**: React Router v6
- **State Management**: Zustand (with Persist local storage support)
- **Styling**: Tailwind CSS
- **Icon Library**: Lucide React
- **Chart Component**: ECharts + echarts-for-react
- **Image Source**: Unsplash free image library

## Quick Start

### Requirements

- Node.js 18.0 or higher
- npm or yarn package manager

### Installation and Run

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build production version
npm run build

# Preview production version
npm run preview
```

The development server runs by default at http://localhost:3000/

## Project Structure

```
src/
├── views/                 # Page components
│   ├── patient/          # Customer-side pages
│   │   ├── Welcome.tsx       # Welcome entry page
│   │   ├── ConstitutionTest.tsx    # Constitution test
│   │   ├── ConstitutionResult.tsx  # Test result
│   │   ├── SoupRecommend.tsx       # Soup recommendation
│   │   ├── OrderConfirm.tsx        # Order confirmation
│   │   └── OrderSuccess.tsx        # Order success
│   └── doctor/           # Doctor-side pages
│       ├── Login.tsx           # Login page
│       ├── PatientList.tsx     # Patient list
│       └── MedicalRecord.tsx   # Medical record details
├── stores/               # Zustand state management
│   ├── userStore.ts      # User state (constitution test result)
│   ├── cartStore.ts      # Shopping cart state
│   └── doctorStore.ts    # Doctor state
├── mocks/                # Mock data
│   ├── constitutions.ts  # Definition of nine constitutions
│   ├── soups.ts          # Soup product data
│   └── patients.ts       # Patient data
├── types/                # TypeScript type definitions
├── assets/styles/        # Global styles
└── App.tsx               # App root component
```

## Usage Instructions

### Customer Flow

1. Visit the homepage and click "I am a Customer"
2. Complete the 8-question constitution assessment
3. View the constitution analysis report and radar chart
4. Browse system-recommended personalized soup packs
5. Add items to the shopping cart
6. Fill in delivery information and submit the order

### Doctor Flow

1. Visit the homepage and click "I am a TCM Doctor"
2. Log in with account and password (Demo password: 123456)
3. Browse the patient list, or search for a patient
4. Click a patient to view details and historical medical records
5. Click "Add Medical Record" or use OCR to identify handwritten medical records
6. Fill in symptoms, diagnosis, and prescription, then save

## Constitution Types

The system defines nine basic constitution types based on TCM theory:

- Qi Deficiency Constitution: Easily fatigued, weak voice, prone to sweating
- Yang Deficiency Constitution: Sensitive to cold, cold hands and feet, prefers hot drinks
- Yin Deficiency Constitution: Dry mouth and throat, warm palms and soles, insomnia with vivid dreams
- Phlegm-Damp Constitution: Obesity, chest tightness with excessive phlegm, sticky mouth sensation
- Damp-Heat Constitution: Oily face, bitter breath with bad odor, prone to acne
- Blood Stasis Constitution: Dull complexion, prone to bruising, rough skin
- Qi Stagnation Constitution: Low mood, chest tightness, frequent sighing
- Special Diathesis Constitution: Prone to allergies, hereditary diseases, skin rashes
- Balanced Constitution: Energetic, rosy complexion, good sleep quality

## Data Storage

This project is a pure frontend demo. All data is stored in browser LocalStorage:

- Constitution test results
- Shopping cart contents
- User delivery information
- Doctor login status

Data remains after page refresh. Clearing browser data will reset all information.

## Notes

- This project is for demonstration purposes and does not involve real medical diagnosis
- All medicinal dietary suggestions are for reference only; consult a professional TCM doctor for actual medication use
- Images are sourced from the Unsplash free image library and used for display purposes only
- OCR recognition is a simulated effect, not real image recognition

## Design Highlights

- **TCM Aesthetics**: Uses traditional color schemes such as rice-paper white, ink black, herb green, and medicinal brown
- **Mobile-First**: Optimized for mobile devices with a maximum container width of 480px
- **Smooth Animations**: Interactive effects such as page transitions, card sliding, and loading animations
- **Accessibility Design**: Clear visual hierarchy and touch-friendly button sizes

## License

This project is for demonstration purposes and for learning reference only.
