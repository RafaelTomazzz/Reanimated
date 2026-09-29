module.exports = {
  darkMode: 'class',
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "rgb(var(--color-primary) / <alpha-value>)",
        background: "rgb(var(--color-background) / <alpha-value>)",
      },
      fontFamily: {
        poppins: ["Poppins_400Regular"],
        "poppins-semibold": ["Poppins_600SemiBold"],
        "jet-brains": ["JetBrainsMono_400Regular"]
      },
    },
  },
  plugins: [],
}