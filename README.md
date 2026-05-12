# Portfolio - Siddh Tyagi

A modern, responsive personal portfolio website built with Next.js, TypeScript, Tailwind CSS, and Framer Motion.

## Features

- 🎨 **Modern UI/UX**: Beautiful, clean design with smooth animations
- 🌓 **Dark/Light Mode**: Toggle between dark and light themes
- 📱 **Fully Responsive**: Works perfectly on all devices
- ✨ **Smooth Animations**: Powered by Framer Motion
- 📊 **Google Sheets Integration**: Contact form saves submissions directly to Google Sheets
- 📁 **Local Fallback**: Saves contact data to CSV if Google Sheets fails
- 🎯 **Sections**: About, Skills, Projects, Certificates, Contact
- 🔄 **Rotating Titles**: Browser tab and navbar titles rotate dynamically
- 💼 **Projects Showcase**: All projects with GitHub links
- 🎓 **Certificates Vault**: Interactive 3D certificate display

## Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **UI Components**: shadcn/ui
- **Font**: Inter (from Google Fonts)
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn or pnpm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/siddhtyagi18/Portfolio.git
cd Portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
   - Create a `.env` file in the root directory
   - Add your Google Apps Script URL (optional):
     ```
     GOOGLE_SCRIPT_URL="https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec"
     ```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Setting Up Google Sheets Integration

1. **Create a Google Sheet**:
   - Go to https://sheets.google.com
   - Create a new spreadsheet
   - Add these headers in row 1: `timestamp`, `name`, `email`, `message`

2. **Create a Google Apps Script**:
   - In your Google Sheet, go to `Extensions > Apps Script`
   - Replace the code with this:
   ```javascript
   function doPost(e) {
     try {
       var ss = SpreadsheetApp.getActiveSpreadsheet();
       var sheet = ss.getActiveSheet();
       var data = JSON.parse(e.postData.contents);
       sheet.appendRow([data.timestamp, data.name, data.email, data.message]);
       return ContentService.createTextOutput(JSON.stringify({ status: 'success' }))
         .setMimeType(ContentService.MimeType.JSON);
     } catch (error) {
       return ContentService.createTextOutput(JSON.stringify({ status: 'error', error: error.toString() }))
         .setMimeType(ContentService.MimeType.JSON);
     }
   }
   ```

3. **Deploy the Web App**:
   - Click `Deploy > New deployment`
   - Select `Web app` as the type
   - Configure:
     - Execute as: `Me (your email)`
     - Who has access: `Anyone`
   - Click `Deploy` and copy the web app URL
   - Paste that URL into your `.env` file as the `GOOGLE_SCRIPT_URL`

## Project Structure

```
├── app/
│   ├── api/
│   │   └── contact/          # Contact API route with Google Sheets integration
│   ├── globals.css            # Global styles with Tailwind and custom CSS
│   ├── layout.tsx             # Root layout with theme provider
│   └── page.tsx               # Main page with all sections
├── components/
│   ├── ui/                    # shadcn/ui components
│   ├── about-section.tsx      # About section
│   ├── certificates-section.tsx # Certificates vault
│   ├── contact-section.tsx    # Contact form
│   ├── footer.tsx             # Footer
│   ├── hero-section.tsx       # Hero section
│   ├── navbar.tsx             # Navigation bar
│   ├── projects-section.tsx   # Projects showcase
│   ├── skills-section.tsx     # Skills display
│   └── rotating-browser-title.tsx # Rotating title for browser tab
├── data/
│   └── contacts.csv           # Local fallback for contact submissions
├── public/
│   ├── certificates/          # Certificate images
│   ├── projects/              # Project images
│   └── Siddh_Tyagi_Resume.pdf # Resume
└── package.json
```

## Customization

### Updating Personal Information

- **Navbar/Logo**: Edit `components/navbar.tsx`
- **Hero Section**: Edit `components/hero-section.tsx`
- **About Section**: Edit `components/about-section.tsx`
- **Skills**: Edit `components/skills-section.tsx`
- **Projects**: Edit `components/projects-section.tsx`
- **Certificates**: Edit `components/certificates-section.tsx`
- **Contact Info**: Edit `components/contact-section.tsx`

### Rotating Titles

Edit the `titles` array in:
- `components/rotating-browser-title.tsx` (for browser tab)

### Colors and Theme

Edit `app/globals.css` to customize Tailwind theme colors.

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Add your environment variables (GOOGLE_SCRIPT_URL)
5. Deploy!

### Other Platforms

You can deploy to any platform that supports Next.js:
- Netlify
- Cloudflare Pages
- AWS Amplify
- And more...

## License

MIT

## Author

**Siddh Tyagi**
- GitHub: [@siddhtyagi18](https://github.com/siddhtyagi18)
- LinkedIn: [Siddh Tyagi](https://linkedin.com/in/siddhtyagi)
- Email: siddhtyagi1845@gmail.com
