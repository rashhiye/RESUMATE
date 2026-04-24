# RESUMATE

A modern, professional resume builder and analyzer application built with React, TypeScript, and Vite. RESUMATE provides AI-powered resume analysis, multiple template options, and real-time ATS score calculation.

## 🎯 Features

- **Resume Builder**: Create professional resumes with a modern, intuitive interface
- **Multiple Templates**: Choose from 4 unique resume templates (Minimal, Modern, Creative, Corporate)
- **ATS Score Analysis**: Real-time scoring based on ATS (Applicant Tracking System) optimization
- **Resume Parser**: Automatic resume text extraction from PDF and DOCX files
- **Template Customization**: Customize colors, fonts, and layouts per template
- **PDF Export**: Generate high-quality PDF versions of your resume
- **Keyword Optimization**: Get suggestions for improving your resume's keyword matching
- **Email Writer**: Built-in email composition tool for job applications
- **Dashboard**: Track your resume analytics and scoring history
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices

## 🚀 Quick Start

### Prerequisites

- Node.js (18.x or higher)
- Bun package manager (recommended) or npm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/rashhiye/RESUMATE.git
cd RESUMATE
```

2. Install dependencies:
```bash
bun install
# or
npm install
```

3. Start the development server:
```bash
bun run dev
# or
npm run dev
```

The application will be available at `http://localhost:8080` (or the next available port).

### Build for Production

```bash
bun run build
# or
npm run build
```

Output files will be in the `dist/` directory.

## 📁 Project Structure

```
RESUMATE/
├── src/
│   ├── components/
│   │   ├── resumate/          # RESUMATE-specific components
│   │   │   ├── Analyzer.tsx
│   │   │   ├── Builder.tsx
│   │   │   ├── Dashboard.tsx
│   │   │   ├── AtsScoreRing.tsx
│   │   │   ├── ResumePreview.tsx
│   │   │   └── ...
│   │   └── ui/                # Shadcn UI components
│   ├── lib/
│   │   ├── resumate/          # Core business logic
│   │   │   ├── parser.ts      # Resume text extraction
│   │   │   ├── scoring.ts     # ATS scoring algorithm
│   │   │   ├── templates.ts   # Template configurations
│   │   │   ├── storage.ts     # Local storage management
│   │   │   └── pdf.ts         # PDF export functionality
│   │   └── utils.ts           # Utility functions
│   ├── pages/
│   │   ├── Index.tsx          # Home page
│   │   ├── resumate/
│   │   │   ├── Analyzer.tsx
│   │   │   ├── Builder.tsx
│   │   │   ├── Dashboard.tsx
│   │   │   └── ...
│   │   └── ...
│   ├── hooks/                 # Custom React hooks
│   ├── App.tsx
│   └── main.tsx
├── public/                    # Static assets
├── package.json
├── vite.config.ts
├── tsconfig.json
└── README.md
```

## 🛠️ Technology Stack

### Frontend
- **React 18**: UI library
- **TypeScript**: Type-safe development
- **Vite**: Fast build tool and dev server
- **Tailwind CSS**: Utility-first CSS framework
- **Shadcn/ui**: High-quality, accessible UI components

### Libraries & Tools
- **PDF.js**: PDF document parsing
- **html2canvas**: HTML to canvas conversion for PDF export
- **TanStack React Query**: Data fetching and caching
- **React Hook Form**: Form state management
- **Zod**: Schema validation
- **date-fns**: Date utilities
- **cmdk**: Command/search interface

### Development
- **ESLint**: Code linting
- **Vitest**: Unit testing framework
- **PostCSS**: CSS post-processing

## 📝 Available Scripts

```bash
# Development
bun run dev          # Start development server
bun run lint         # Run ESLint
bun run build        # Build for production
bun run build:dev    # Build in development mode
bun run preview      # Preview production build
bun run test         # Run tests
bun run test:watch   # Run tests in watch mode
```

## 🎨 Templates

RESUMATE includes 4 professionally designed templates:

1. **Minimal**: Clean, simple, and ATS-friendly
2. **Modern**: Contemporary design with accent color support
3. **Creative**: Unique two-column layout with sidebar
4. **Corporate**: Professional business resume template

Each template supports:
- Custom color schemes
- Font selection (Grotesk or Inter)
- Responsive styling
- PDF export optimization

## 🔧 Configuration

### Tailwind CSS
Theme customization available in `tailwind.config.ts`

### TypeScript
Configuration in `tsconfig.json` with path aliases for clean imports

### Vite
Build and dev configuration in `vite.config.ts`

## 🧪 Testing

Run the test suite:
```bash
bun run test
```

Run tests in watch mode during development:
```bash
bun run test:watch
```

## 📦 Dependencies

- React and ecosystem packages
- Radix UI primitives (@radix-ui/*)
- Form handling (react-hook-form, @hookform/resolvers)
- UI utilities (class-variance-authority, clsx)
- Document processing (pdf-parse, docx-parser)
- Animations (tailwindcss-animate, embla-carousel)

See `package.json` for complete dependency list and versions.

## 🚀 Deployment

The application can be deployed to any static hosting service:

### Vercel
```bash
vercel deploy
```

### Netlify
```bash
netlify deploy --prod --dir=dist
```

### GitHub Pages
Build the project and push the `dist/` directory to your GitHub Pages branch.

## 📝 Code Quality

- **Zero `any` types**: Full TypeScript strict mode compliance
- **ESLint configured**: Following React and TypeScript best practices
- **Clean imports**: Using Tailwind CSS with proper tree-shaking
- **Responsive design**: Mobile-first approach

## 🐛 Bug Reports & Feature Requests

Found a bug? Have a feature idea? Please open an issue on GitHub.

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

**Rashhiye**
- GitHub: [@rashhiye](https://github.com/rashhiye)

## 🙏 Acknowledgments

- Shadcn for the amazing UI components library
- Radix UI for accessible primitives
- The React and TypeScript communities

## 🔗 Links

- **Live Demo**: [Coming Soon]
- **GitHub Repository**: https://github.com/rashhiye/RESUMATE
- **Bug Reports**: https://github.com/rashhiye/RESUMATE/issues

---

**Made with ❤️ by Rashhiye**
