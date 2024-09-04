/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts,scss}"],
  theme: {
    extend: {
      colors: {
        primary: "#f5295a",
        "primary-dark": "#f63e6b",
        "segundary-dark": "#F0F2F5",
      },
    },
  },
  plugins: [],
};
