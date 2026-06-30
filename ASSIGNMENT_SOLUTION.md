# Survey Campaign Builder - Assignment Solution

## 🚀 Deployment Link
*(Insert your deployment URL here, e.g., Vercel / Netlify / Supabase hosting)*

---

## 🛠️ Tech Stack Used

- **Frontend Framework:** React 19 (with TypeScript)
- **Build Tool:** Vite
- **Styling:** Tailwind CSS (with custom utility classes for dark mode and themes)
- **State Management:** Redux Toolkit + Redux Undo (for robust Undo/Redo functionality)
- **Backend & Database:** Supabase (Auth, PostgreSQL Database, and Storage Buckets)
- **Animations:** Framer Motion & GSAP (for smooth, dynamic UI transitions)
- **Routing:** React Router DOM
- **Icons & UI:** Lucide React
- **File Uploads:** React Dropzone

---

## 📁 Folder Structure

```text
src/
├── components/          # Reusable UI building blocks
│   ├── auth/            # Authentication modals and flows (Sign in/up)
│   ├── builder/         # Builder specific components (Mobile preview modals, etc.)
│   ├── content/         # Survey content editors (Questions, options, logic)
│   ├── dashboard/       # Main dashboard, analytics, and sidebar
│   ├── layout/          # Global layout wrappers (Header, AppLayout, Tabs)
│   ├── preview/         # The MobileFrame and live survey rendering engines
│   ├── styling/         # Theme and style property editors
│   └── survey/          # The standalone interactive survey runner
├── store/               # Redux state architecture
│   ├── store.ts         # Global store config
│   ├── authSlice.ts     # User sessions
│   ├── contentSlice.ts  # Survey data (Questions, flow)
│   ├── stylingSlice.ts  # Appearance data (Colors, fonts)
│   └── uiSlice.ts       # Editor active tabs & view states
├── supabase/            # Backend integration
│   ├── config.ts        # Supabase client initialization
│   ├── database.ts      # Database CRUD operations
│   └── storage.ts       # Bucket file upload handling
├── App.tsx              # Application root and routing
└── main.tsx             # Entry point
```

---

## 💡 How We Solved the Assignment

1. **State Management & Undo/Redo Architecture:**
   We leveraged Redux Toolkit to cleanly separate the application state into `content` (the questions, logic, and structure) and `styling` (colors, fonts, radii). By wrapping these slices with `redux-undo`, we easily achieved global undo/redo functionality via keyboard shortcuts (Ctrl+Z / Ctrl+Y) across the entire builder.

2. **Live Dynamic Preview Engine:**
   We built a custom `MobileFrame` component that mimics a real hardware device. We hooked it directly into the Redux store so that any change in the content or styling tabs reflects instantly on the phone screen. We used dynamic CSS scaling (`scale` with mathematical viewport calculations) so that the preview fits beautifully on any screen size—zoomed in, zoomed out, or on mobile devices—without truncating.

3. **Supabase Integration for Persistence:**
   Instead of just saving to local storage, we connected the application to a Supabase backend. Users can create accounts, log in, and persist their surveys securely to a database. We also utilized Supabase Storage to allow users to directly upload and host media (images/videos) for their welcome/thank-you pages.

4. **Responsive Builder Experience:**
   Building a complex editor for mobile devices is tricky. We solved this by creating a tailored mobile experience: on small screens, the sidebar converts into an animated drawer, and the live preview moves into a dedicated popup modal that can be toggled on and off. This keeps the workspace uncluttered while retaining full desktop functionality.

5. **Advanced Theming & Typography:**
   We implemented a dynamic `<GoogleFontLoader />` that asynchronously injects selected fonts from the styling tab directly into the document. Combined with Tailwind's dark mode capabilities, the entire platform (both the builder UI and the generated surveys) gracefully handles appearance customizations.

---

## 💻 Setup Instructions

To run this project locally, follow these steps:

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd survey-campaign-builder
```

### 2. Install dependencies
```bash
npm install
```

### 3. Setup Environment Variables
Create a `.env.local` file in the root directory and add your Supabase credentials:
```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Start the Development Server
```bash
npm run dev
```

The application will be running at `http://localhost:5173`.
