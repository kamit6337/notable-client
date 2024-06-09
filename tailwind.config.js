/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
      },
      colors: {
        my_single_note_title: "#333333",
        my_single_note_body: "#737373",
        my_home_notelist: "#FFFFFF",
        my_home_notelist_border: "#E7E9E7",
        my_home_recent: "#OOA82D",
        my_note_green: "#3FB833",
        my_light_green_dark: "#3CC02E",
        my_sidenavbar: "#100F0F",
        my_sidenavbar_icon: "#CCCCCC",
        my_notelist: "#CDCEC6",
        my_notelist_body: "#B5B5B0",
        my_notelist_title: "#61615F",
        my_notearea_white: "#FDFDFA",
        my_tags: "#E9EDE8",
      },
    },
    screens: {
      "2xl": { max: "1535px" },
      // => @media (max-width: 1535px) { ... }

      laptop: { max: "1280px" },
      // => @media (max-width: 1279px) { ... }

      sm_lap: { max: "1024px" },
      // => @media (max-width: 1023px) { ... }

      tablet: { max: "900px" },
      // => @media (max-width: 767px) { ... }

      mobile: { max: "640px" },
      // => @media (max-width: 639px) { ... }
    },
  },
  plugins: [],
};
