/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "example-iframe.html",
    "./entrypoints/**/*.{js,ts,jsx,tsx,vue}",
    "./entrypoints/popup/**/*.{html,js,ts,vue}",
    "./components/**/*.{html,js,ts,vue}",
    "./assets/**/*.{html,js,ts,vue}"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
