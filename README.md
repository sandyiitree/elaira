# Elaira Residences - Luxury Real Estate Website

A modern, responsive luxury real estate website for Elaira Residences with integrated lead management system via Anarock API.

## Features

- **Dark Theme Design**: Elegant dark theme with orange/brown accent colors
- **Responsive Layout**: Optimized for all devices
- **Lead Management**: Integrated with Anarock CRM system
- **Contact Form**: Real-time form validation and submission
- **Gallery**: Beautiful image showcase
- **Location & Amenities**: Detailed property information

## Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS, Vite
- **API Integration**: Anarock Lead Webhook API (direct frontend integration)
- **Styling**: Tailwind CSS with custom gradients

## Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Anarock API credentials

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd amor-final
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Anarock API**
   
   Update the API configuration in `src/utils/anarockApi.ts`:
   ```typescript
   const ANAROCK_API_URL = 'https://lead-webhook.staging.anarock.com/api/v0/Google/sync-lead';
   const ANAROCK_KEY = 'YOUR_ANAROCK_SECRET_KEY_HERE';
   const CAMPAIGN_ID = 'AMOR_VILLAS_CAMPAIGN';
   ```

### Development

1. **Start the development server**
   ```bash
   npm run dev
   ```

   The application will run on `http://localhost:5173`

### Production Build

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy the `dist` folder to your hosting platform**

## API Integration

### Lead Submission Process

The contact form integrates with Anarock's lead management system:

1. **Form Validation**: Client-side validation for required fields
2. **Hash Generation**: Server generates HMAC-SHA256 hash using timestamp and secret key
3. **Phone Parsing**: Automatic parsing of Indian phone numbers (+91 format)
4. **API Submission**: POST request to Anarock webhook with all required parameters
5. **Response Handling**: Success/error feedback to user

### API Integration

The contact form directly integrates with Anarock's lead management system using the webhook API.

### Required Parameters

- `name` - Lead's full name
- `email` - Lead's email address
- `phone` - Phone number (automatically parsed for country code)
- `message` - Optional message
- `interested` - Interest type (sales, site-visit, brochure, other)

### Anarock API Parameters

The system automatically sends these parameters to Anarock:
- `name`, `email`, `phone`, `country_code`
- `source=website`, `sub_source=contact_form`
- `purpose=buy`, `placement` (from interested field)
- `current_time`, `hash` (generated server-side)
- `campaign_id` (from environment variable)

## Project Structure

```
amor-final/
├── src/
│   ├── components/          # React components
│   │   ├── Contact.tsx     # Contact form with API integration
│   │   ├── Header.tsx      # Navigation header
│   │   ├── Hero.tsx        # Hero section
│   │   └── ...             # Other components
│   ├── utils/              # Utility functions
│   │   ├── anarockApi.ts   # Anarock API integration
│   │   └── phoneUtils.ts   # Phone number utilities
│   ├── assets/             # Images and static files
│   ├── hooks/              # Custom React hooks
│   └── styles/             # CSS styles
├── package.json            # Dependencies and scripts
├── env.example             # Configuration template
└── README.md               # This file
```

## Configuration

| Variable | Description | Location |
|----------|-------------|----------|
| `ANAROCK_API_URL` | Anarock webhook URL | `src/utils/anarockApi.ts` |
| `ANAROCK_KEY` | Anarock secret key | `src/utils/anarockApi.ts` |
| `CAMPAIGN_ID` | Campaign identifier | `src/utils/anarockApi.ts` |

## Deployment

### Static Hosting (Vercel/Netlify/GitHub Pages)

1. Build the project: `npm run build`
2. Deploy the `dist` folder to your hosting platform
3. Update the Anarock API configuration in `src/utils/anarockApi.ts` for production

### Server Deployment

1. Deploy the project to your server
2. Update the Anarock API configuration for production
3. Serve the `dist` folder using your web server

## Troubleshooting

### Common Issues

1. **CORS Errors**: The Anarock API should allow cross-origin requests from your domain
2. **API Key Issues**: Verify your Anarock API key is correct in `src/utils/anarockApi.ts`
3. **Phone Number Parsing**: Check that phone numbers are in the correct format
4. **Hash Generation**: Ensure client time is synchronized

### Debug Mode

Check the browser console for detailed error messages during form submission.

## Support

For technical support or questions about the Anarock API integration, please contact the development team.

## License

This project is proprietary and confidential. 