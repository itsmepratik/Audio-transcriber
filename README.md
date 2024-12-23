# Audio Transcription App

This is a [Next.js](https://nextjs.org) project that provides audio transcription functionality using a modern, responsive interface. The application allows users to upload audio files and receive text transcriptions.

## Features

- Audio file upload and transcription
- Real-time transcription status updates
- Modern UI with Tailwind CSS
- TypeScript support
- Responsive design

## Getting Started

First, set up your environment variables by creating a `.env` file in the root directory with the required configuration.

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Project Structure

- `/app` - Next.js 13+ app directory containing the main application code
  - `/api` - API routes including the transcription endpoint
  - `page.tsx` - Main application page
  - `layout.tsx` - Root layout component
- `/components` - Reusable React components
  - `/ui` - UI components (buttons, inputs, labels)
  - `audio-transcriber.tsx` - Main transcription component
- `/lib` - Utility functions and shared code

## Technologies Used

- [Next.js](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript
- [shadcn/ui](https://ui.shadcn.com/) - UI component library

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
