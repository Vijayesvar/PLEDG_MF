# PLEDG - P2P Lending Platform

A modern, responsive frontend application for a Peer-to-Peer lending platform that connects borrowers and lenders through mutual fund collateralization.

## Features

- **Interactive Landing Page**: Modern design with smooth animations and responsive layout
- **User Toggle**: Switch between borrower and lender modes
- **Loan Calculator**: Interactive calculator with real-time EMI updates
- **Waitlist Form**: Comprehensive form for early access registration
- **FAQ Section**: Expandable accordion with common questions
- **Responsive Design**: Works perfectly on all devices

## Tech Stack

- **React 19** with modern hooks
- **Tailwind CSS** for styling
- **Radix UI** components for accessibility
- **React Router** for navigation
- **Lucide React** for icons

## Getting Started

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   yarn install
   ```

3. Start the development server:
   ```bash
   yarn start
   ```

4. Open your browser and visit `http://localhost:3000`

## Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── LandingPage.jsx      # Main landing page
│   │   ├── WaitlistForm.jsx     # Waitlist registration form
│   │   └── ui/                  # Reusable UI components
│   ├── App.js                   # Main app component with routing
│   └── index.js                 # Entry point
├── public/                      # Static assets
└── package.json                 # Dependencies and scripts
```

## Available Routes

- `/` - Main landing page
- `/waitlist` - Waitlist registration form

## Features in Detail

### Landing Page
- Hero section with user type toggle
- Feature cards with hover animations
- Interactive loan calculator
- Statistics with animated counters
- How it works section
- FAQ accordion
- Footer with links

### Waitlist Form
- Comprehensive user information collection
- Interest type selection (borrower/lender/both)
- Amount range selection
- Terms and conditions agreement
- Local storage for demo purposes
- Success confirmation page

## Development

The application uses:
- **CRACO** for build configuration
- **Tailwind CSS** with custom animations
- **React Router** for client-side routing
- **Local Storage** for data persistence (demo mode)

## License

This project is for demonstration purposes.
