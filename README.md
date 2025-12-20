# Honor Role Website

A modern, elegant website for Honor Role, a production company from Camila Mendes and Rachel Matthews.

## Features

- Built with Next.js 16 and React 19
- TypeScript for type safety
- Tailwind CSS for styling
- Responsive design
- Optimized images with Next.js Image component
- Ready for Vercel deployment

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

This project is configured for deployment on Vercel.

### Deploy to Vercel

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)
2. Import your repository in [Vercel](https://vercel.com)
3. Vercel will automatically detect Next.js and configure the build settings
4. Click "Deploy"

The site will be live at a URL like `your-project.vercel.app`

### Manual Deployment

You can also deploy using the Vercel CLI:

```bash
npm i -g vercel
vercel
```

## Project Structure

```
├── app/
│   ├── globals.css      # Global styles
│   ├── layout.tsx        # Root layout
│   └── page.tsx         # Homepage
├── components/          # React components
├── public/              # Static assets
│   ├── logo.svg
│   ├── wordmark-animation.gif
│   ├── image1.jpg
│   └── image2.jpg
├── references/          # Design references
└── package.json
```

## Design Philosophy

The website design is inspired by the Little Troop design for Honor Role, featuring:
- Clean, minimal aesthetic
- Academic and scholastic influences
- Large typography with generous white space
- Focus on the brand identity and wordmark animation
- Elegant presentation of the company's story

## License

© 2025 Honor Role. All rights reserved.
