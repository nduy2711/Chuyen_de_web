/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", // Quét tất cả các file trong src
    "./public/index.html", // Nếu có file HTML trong public
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
