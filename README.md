# CareerAI — AI-Powered Resume & Portfolio Builder

CareerAI is a premium, full-stack application built with Next.js 14, Tailwind CSS, and Grok AI to help professionals create stunning resumes and instant portfolio websites.

## Features

- **AI Resume Generator**: Generate impact-driven summary and experience bullet points using Grok/OpenAI models.
- **Portfolio Website Generator**: Automatically convert your resume into a live, professional personal website.
- **Real-time Preview**: Edit your resume and see changes instantly with a professional document layout.
- **A4 PDF Download**: Export resumes as high-quality PDF files for job applications.
- **LinkedIn Optimizer**: Craft compelling LinkedIn 'About' sections tailored to your brand.
- **User Dashboard**: Manage multiple resumes and portfolio versions securely.
- **Premium UI**: Glassmorphism design and smooth animations using Framer Motion.

## Tech Stack

- **Frontend**: Next.js 14 (App Router), Tailwind CSS, Framer Motion, Lucide Icons.
- **Backend**: Next.js API Routes, Node.js.
- **Database**: MongoDB (via Mongoose).
- **Authentication**: JWT-based session management with secure cookies.
- **AI Integration**: Grok (xAI) or OpenAI via Axios.
- **PDF Generation**: jsPDF & html2canvas.

## Setup Instructions

1. **Clone the repository**:
   ```bash
   git clone <repo-url>
   cd something
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env.local` file in the root directory based on `.env.example`:
   ```bash
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   AI_API_KEY=your_xai_or_openai_api_key
   AI_MODEL_NAME=grok-beta # or gpt-4o
   ```

4. **Run the development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

5. **Build for production**:
   ```bash
   npm run build
   npm start
   ```

## Contributing
Enjoy building your career! 🚀
