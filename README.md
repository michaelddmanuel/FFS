# Call Centre FFS - Weekly Sales Report System

A comprehensive sales reporting system built with Next.js and React for processing weekly call center sales data.

## Features

- Management Summary Reports
  - Total weekly business overview
  - Agent performance breakdown
  - Monetary value tracking in ZAR
  
- Individual Agent Reports
  - Personal sales performance
  - Net sales value calculations
  - Policy tracking ("Ons" and "Offs")

- Export Capabilities
  - PDF generation for all reports
  - Customizable filtering options
  
## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Technology Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- XLSX for spreadsheet processing
- React-to-PDF for report generation

## Project Structure

```
/src
  /components     # Reusable UI components
  /pages          # Next.js pages and API routes
  /types          # TypeScript type definitions
  /utils          # Utility functions
  /styles         # Global styles and Tailwind config
```

## Data Processing

The system processes the following data:

- Agent Details (Name, Code)
- Policy Information (Number, Customer Details, Amount)
- Performance Metrics (New Sales, Cancellations)
- Monetary Calculations in ZAR
