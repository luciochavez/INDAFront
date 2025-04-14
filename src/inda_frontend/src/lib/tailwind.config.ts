export default {
    content: [
      "./pages/**/*.{ts,tsx}",
      "./components/**/*.{ts,tsx}",
      "./app/**/*.{ts,tsx}",
      "./src/**/*.{ts,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          inda: {
            blue: '#2563eb',
            indigo: '#4f46e5',
            purple: '#7c3aed',
            pink: '#ec4899',
            black: '#121212',
            dark: '#1a1a1a',
            light: '#f8f8f8',
          }
        },
        // Animaciones y más configuraciones...
      }
    },
    plugins: [require("tailwindcss-animate")],
  }
  