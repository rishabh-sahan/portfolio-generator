# 📋 Portfolio Generator

A modern, interactive web application for creating professional portfolios and resumes in minutes. Built with React, TypeScript, and Vite, this tool provides a real-time preview of your portfolio as you build it.

## ✨ Features

### 🎨 **Dual View Interface**
- **Split-screen design** with editor on the left and live preview on the right
- Real-time updates as you type
- Intuitive tabbed navigation for different sections

### 📝 **Comprehensive Sections**
- **Personal Information**: Name, title, contact details, profile picture, and social media links
- **Education**: Add multiple educational qualifications with institution, degree, dates, and grades
- **Experience**: Document your work history with company, role, location, dates, and descriptions
- **Projects**: Showcase your projects with descriptions, technologies, repo links, and demo links
- **Skills**: Categorize skills by type (Frontend, Backend, Tools, Soft Skills) and proficiency level

### 🎭 **Multiple Templates**
- **Modern Template**: Colorful, engaging design perfect for portfolios
- **Minimal Template**: Clean, professional resume-style layout
- Easy template switching with instant preview

### 💾 **Data Management**
- **Auto-save**: Data automatically saved to browser's local storage
- **Import/Export**: Save your data as JSON and load it later
- **Reset functionality**: Start fresh with a single click

### 📄 **Export Options**
- **Print to PDF**: Generate PDF version of your portfolio
- Direct browser print functionality
- Optimized for printing and PDF generation

## 🚀 Tech Stack

- **Frontend Framework**: React 19.2.0
- **Language**: TypeScript 5.9.3
- **Build Tool**: Vite 7.2.4
- **Styling**: Tailwind CSS (via CDN)
- **State Management**: React Context API
- **Linting**: ESLint with TypeScript support

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher recommended)
- npm or yarn package manager

### Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/rishabh-sahan/portfolio-generator.git
   cd portfolio-generator
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   - Navigate to `http://localhost:5173` (or the port shown in your terminal)

## 🎯 Usage

### Creating Your Portfolio

1. **Personal Information Tab**
   - Fill in your name, professional title, email, phone, and location
   - Add your avatar URL
   - Include links to LinkedIn, GitHub, Twitter, and personal website
   - Write a professional summary

2. **Education Tab**
   - Click "Add Education" to add entries
   - Fill in institution name, degree, dates, and grade
   - Add multiple educational qualifications
   - Remove entries using the delete button

3. **Experience Tab**
   - Add work experiences with company name, role, and location
   - Specify start and end dates (or mark as current position)
   - Write detailed job descriptions
   - Manage multiple experiences

4. **Projects Tab**
   - Showcase your projects with titles and descriptions
   - Add technologies used (comma-separated or tags)
   - Include repository and live demo links
   - Optional: Add project screenshots via image URLs

5. **Skills Tab**
   - Add skills with names and categories
   - Set proficiency levels (Beginner, Intermediate, Advanced)
   - Organize by category for better presentation

### Exporting Your Portfolio

- **Print/PDF**: Click "Download PDF / Print" to generate a PDF version
- **Export Data**: Click "Export JSON" to save your data locally
- **Import Data**: Click "Import JSON" to load previously saved data

### Template Selection

- Use the template switcher at the top of the preview pane
- Choose between **Modern** (portfolio-style) and **Minimal** (resume-style)
- Changes apply instantly

## 📁 Project Structure

```
portfolio-generator/
├── public/                 # Static assets
│   └── vite.svg           # Favicon
├── src/
│   ├── assets/            # Images and static files
│   ├── components/        # React components
│   │   ├── editor/        # Editor components
│   │   │   ├── Editor.tsx           # Main editor container
│   │   │   ├── PersonalInfoForm.tsx # Personal info form
│   │   │   ├── EducationForm.tsx    # Education form
│   │   │   ├── ExperienceForm.tsx   # Experience form
│   │   │   ├── ProjectsForm.tsx     # Projects form
│   │   │   └── SkillsForm.tsx       # Skills form
│   │   ├── preview/       # Preview components
│   │   │   ├── Preview.tsx          # Preview container
│   │   │   └── templates/           # Template designs
│   │   │       ├── ModernTemplate.tsx
│   │   │       └── MinimalTemplate.tsx
│   │   └── ErrorBoundary.tsx # Error handling component
│   ├── context/           # React Context
│   │   └── PortfolioContext.tsx # Global state management
│   ├── types.ts           # TypeScript type definitions
│   ├── App.tsx            # Main App component
│   ├── App.css            # App-specific styles
│   ├── main.tsx           # Application entry point
│   └── index.css          # Global styles
├── index.html             # HTML entry point
├── package.json           # Dependencies and scripts
├── tsconfig.json          # TypeScript configuration
├── vite.config.ts         # Vite configuration
├── eslint.config.js       # ESLint configuration
└── README.md              # This file
```

## 🛠️ Available Scripts

```bash
# Start development server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Run ESLint to check code quality
npm run lint
```

## 🏗️ Development

### Building

The project uses Vite for fast development and optimized production builds:

```bash
npm run build
```

This creates an optimized production build in the `dist/` directory.

### Linting

ESLint is configured with TypeScript support:

```bash
npm run lint
```

### Preview Production Build

Test the production build locally:

```bash
npm run preview
```

## 🎨 Customization

### Adding New Templates

1. Create a new template component in `src/components/preview/templates/`
2. Import and add it to the template switcher in `Preview.tsx`
3. Update the `Theme` type in `types.ts`

### Extending Data Types

Modify `types.ts` to add new fields or sections:
- Update the relevant interface (e.g., `PersonalInfo`, `Project`)
- Create corresponding form components in `src/components/editor/`
- Update templates to display the new data

### Styling

The project uses Tailwind CSS via CDN. To customize:
- Modify inline Tailwind classes in components
- Add custom CSS in `App.css` or `index.css`
- For advanced customization, install Tailwind CSS locally

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Guidelines
- Follow the existing code style
- Write meaningful commit messages
- Update documentation for new features
- Ensure all linting passes before submitting

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Built with [React](https://reactjs.org/)
- Powered by [Vite](https://vitejs.dev/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Icons: Emoji-based for simplicity

## 📞 Support

If you encounter any issues or have questions:
- Open an issue on [GitHub](https://github.com/rishabh-sahan/portfolio-generator/issues)
- Check existing issues for solutions
- Contribute improvements via pull requests

---

**Built with ❤️ for developers who want to showcase their work professionally**
