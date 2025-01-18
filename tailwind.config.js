import fluid, { extract, screens, fontSize } from "fluid-tailwind";
import animate from "tailwindcss-animate";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: {
    files: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
    extract,
  },
  theme: {
  	extend: {
  		backgroundImage: {},
  		fontFamily: {},
  		colors: {},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [
    animate,
    fluid,
      require("tailwindcss-animate")
],
}

