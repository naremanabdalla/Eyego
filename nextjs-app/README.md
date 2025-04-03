# Next.js Application with TypeScript, Tailwind CSS, and Redux Toolkit

This project is a Next.js application that utilizes TypeScript, Tailwind CSS, and Redux Toolkit for state management. It includes Firebase authentication and a responsive dashboard layout.

## Features

- **Firebase Authentication**: User login and logout functionality.
- **Responsive Dashboard**: A collapsible sidebar, header with user info, and a main content area.
- **Reusable Components**: Includes a data table with sorting, filtering, and pagination, as well as a chart component using Recharts.
- **State Management**: Utilizes Redux Toolkit for managing authentication, table data, and chart data.

## Project Structure

```
nextjs-app
├── public
│   └── favicon.ico
├── src
│   ├── components
│   │   ├── auth
│   │   │   ├── Login.tsx
│   │   │   └── Logout.tsx
│   │   ├── dashboard
│   │   │   ├── Sidebar.tsx
│   │   │   ├── Header.tsx
│   │   │   └── MainContent.tsx
│   │   └── ui
│   │       ├── DataTable.tsx
│   │       └── Chart.tsx
│   ├── hooks
│   │   └── useAuth.ts
│   ├── pages
│   │   ├── _app.tsx
│   │   ├── index.tsx
│   │   └── dashboard.tsx
│   ├── store
│   │   ├── slices
│   │   │   ├── authSlice.ts
│   │   │   ├── tableSlice.ts
│   │   │   └── chartSlice.ts
│   │   └── index.ts
│   └── styles
│       ├── globals.css
│       └── tailwind.css
├── .eslintrc.json
├── .gitignore
├── firebaseConfig.ts
├── next-env.d.ts
├── next.config.js
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── tsconfig.json
└── README.md
```

## Getting Started

1. Clone the repository:
   ```
   git clone <repository-url>
   cd nextjs-app
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up Firebase:
   - Create a Firebase project and configure authentication.
   - Replace the `firebaseConfig` in `firebaseConfig.ts` with your Firebase project credentials.

4. Run the development server:
   ```
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:3000`.

## Contributing

Feel free to submit issues or pull requests for any improvements or features you would like to see!

## License

This project is licensed under the MIT License.