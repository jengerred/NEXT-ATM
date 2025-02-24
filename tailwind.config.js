module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      boxShadow: {
        'atm': '1px 10px 5px rgba(16,16,16,0.5), 1px 15px 10px rgba(16,16,16,0.4), 1px 20px 30px rgba(16,16,16,0.3), 1px 25px 50px rgba(16,16,16,0.2)'
      },
      borderWidth: {
        '6': '6px'
      }
    }
  },
  plugins: [],
}

